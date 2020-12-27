using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpotifyAPI.Web;

namespace server.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class PersonalController : Controller
    {
        [HttpGet]
        [Route("[controller]/top_artists")]
        public async Task<IActionResult> GetTopArtist()
        {
            var spotifyAccessToken = HttpContext.Request.Cookies["spotifyToken"];
            if (spotifyAccessToken != null)
            {
                var spotify = new SpotifyClient(spotifyAccessToken);
                var topArtists = await spotify.Personalization.GetTopArtists(new PersonalizationTopRequest { 
                    Limit = 50
                });
                return Ok(topArtists.Items);
            } else
            {
                return Forbid();
            }
        }
    }
}
