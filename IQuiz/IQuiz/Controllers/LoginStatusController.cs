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
            string? authCookie= HttpContext.Request.Cookies[CoockieNames.Token];
#nullable disable
            if (authCookie == null) 
                return Unauthorized("No Authentication CookiesController Were Found.");
            string userEmail = HttpContext.Request.Cookies[CoockieNames.Email];
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
            string? authCookie = HttpContext.Request.Cookies[CoockieNames.Token];
            #nullable disable

            if (authCookie == null)
                return Unauthorized("No Authentication CookiesController Were Found.");
            HttpContext.Response.Cookies.Delete(CoockieNames.Email);
            HttpContext.Response.Cookies.Delete(CoockieNames.Token);
            return Ok("CookiesController were deleted.");
        }
    }
}