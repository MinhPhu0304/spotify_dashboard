using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SpotifyAPI.Web;
using static SpotifyAPI.Web.Scopes;

namespace server.Controllers
{
    [ApiController]
    public class OAuthController : Controller
    {
        private readonly CredentialSingleton credential;
        public OAuthController()
        {
            credential = CredentialSingleton.getInstance();
        }

        [HttpGet]
        [Route("[controller]")]
        public bool CheckAuthRoute()
        {
            
            if (Request.Cookies["Test"] == null)
            {
                CookieOptions option = new CookieOptions();
                option.Expires = DateTime.Now.AddMilliseconds(100);
                Response.Cookies.Append("Test", "Bar", option);
            }
            return true;
        }

        [HttpGet]
        [Route("[controller]/callback")]
        public async Task<IActionResult> OauthCallBack()
        {
            string oauthCode = HttpContext.Request.Query["code"].ToString();
            if (oauthCode != null)
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri("https://accounts.spotify.com");
                var content = new FormUrlEncodedContent(new[]
                 {
                        new KeyValuePair<string, string>("code", oauthCode),
                        new KeyValuePair<string, string>("client_secret", credential.spotifyClientSecret),
                        new KeyValuePair<string, string>("client_id", credential.spotifyClientId),
                        new KeyValuePair<string, string>("grant_type", "authorization_code"),
                        new KeyValuePair<string, string>("redirect_uri", credential.redirectURI),
                     });
                var result = await client.PostAsync("/api/token", content);
                string resultContent = await result.Content.ReadAsStringAsync();
                var responseJSON = JsonConvert.DeserializeObject<SpotifyTokenResponse>(resultContent);
                SetSpotifyAccessTokenCookie(responseJSON.access_token, responseJSON.expires_in);
            }
            return Redirect(new Uri(credential.dashboardURI).ToString());
        }

        private void SetSpotifyAccessTokenCookie(string spotifyAccessToken, int expireInSeconds)
        {
            var options = new CookieOptions
            {
                Secure = true,
                Expires = DateTime.Now.AddSeconds(expireInSeconds),
                IsEssential = true,
                SameSite = SameSiteMode.None,
        };
            Response.Cookies.Append("spotifyToken", spotifyAccessToken, options);
        }

        [HttpGet]
        [Route("[controller]/spotify")]
        public IActionResult AuthenticateWithSpotify()
        {
            var spotifyAccessToken = HttpContext.Request.Cookies["spotifyToken"];
            if (spotifyAccessToken == null)
            {
                var request = new LoginRequest(new Uri(credential.redirectURI), credential.spotifyClientId, LoginRequest.ResponseType.Code)
                {
                    Scope = new[] { UserReadEmail, UserTopRead }
                };
                return Redirect(request.ToUri().ToString());
            }

            return Redirect(new Uri(credential.dashboardURI).ToString());
        }
    }
}
    