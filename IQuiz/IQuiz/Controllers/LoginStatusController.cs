using IQuiz.Helper_Classes;
using Microsoft.AspNetCore.Mvc;

namespace IQuiz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginStatusController : ControllerBase
    {
        [HttpGet, Route("checkLogin")]
        public ActionResult GetAuthTokenIfAvailable()
        {
#nullable enable
            string? authCookie= HttpContext.Request.Cookies[CoockiesNames.Token];
#nullable disable
            if (authCookie == null) 
                return Unauthorized("No Authentication Cookies Were Found.");
            string userEmail = HttpContext.Request.Cookies[CoockiesNames.Email];
            return Ok(new JsonResult(new 
            {
                user=userEmail,
                token=authCookie
            }));
        }

        [HttpPost]
        [Route("remove")]
        public ActionResult RemoveCoockies()
        {
            #nullable enable
            string? authCookie = HttpContext.Request.Cookies[CoockiesNames.Token];
            #nullable disable

            if (authCookie == null)
                return Unauthorized("No Authentication Cookies Were Found.");
            HttpContext.Response.Cookies.Delete(CoockiesNames.Email);
            HttpContext.Response.Cookies.Delete(CoockiesNames.Token);
            return Ok("Cookies were deleted.");
        }
    }
}