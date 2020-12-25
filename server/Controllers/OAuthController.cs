using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;
using SpotifyAPI.Web.Auth;
using static SpotifyAPI.Web.Scopes;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [ApiController]
    public class OAuthController : Controller
    {
        private CredentialSingleton credential;
        public OAuthController()
        {
            credential = CredentialSingleton.getInstance();
            Console.WriteLine(credential.spotifyClientSecret);
        }

        [HttpGet]
        [Route("[controller]")]
        public bool CheckAuthRoute()
        {
            return true;
        }

        [HttpGet]
        [Route("[controller]/callback")]
        public bool OauthCallBack(HttpContext context)
        {
            string accessToken = context.Request.Query["access_code"];
            
            // TODO: set cookies and redirect to authenticated page
            return true;
        }


        [HttpGet]
        [Route("[controller]/spotify")]
        public IActionResult AuthenticateWithSpotify()
        {
            var request = new LoginRequest(new Uri("https://localhost:5001/oauth/callback"), credential.spotifyClientId, LoginRequest.ResponseType.Token)
            {
                Scope = new List<string> { UserReadEmail, UserTopRead }
            };
            return Redirect(request.ToUri().ToString());
        }
    }
}
