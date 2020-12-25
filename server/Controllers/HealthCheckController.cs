using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [ApiController]
    [Route("/ping")]
    [Produces("application/json")]
    public class HealthCheckController : Controller
    {
        [HttpGet]
        public ActionResult healthCheck()
        {
            return Ok(new HealthCheckResponse { success = true });
        }
    }
}
