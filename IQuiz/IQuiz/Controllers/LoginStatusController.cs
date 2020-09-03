using IQuiz.Helper_Classes;
using Microsoft.AspNetCore.Mvc;

namespace IQuiz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginStatusController : ControllerBase
    {
        [HttpGet, Route("checkLogin")]
        public ActionResult UserIsLoggedIn()
        {
#nullable enable
            string? authCookie= HttpContext.Request.Cookies[CoockieNames.Token];
#nullable disable

            if (authCookie == null) 
                return Unauthorized();
            string userEmail = HttpContext.Request.Cookies[CoockieNames.Email];
            return Ok(new JsonResult(new 
            {
                user=userEmail,
                token=authCookie
            }));
        }
    }
}