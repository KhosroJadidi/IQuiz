using IQuiz.HelperClasses;
using IQuiz.Models.Non_Database_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

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

            if (authCookie != null)
            {
                string userEmail = HttpContext.Request.Cookies[CoockieNames.Email];
                return Ok(new JsonResult(new 
                {
                    user=userEmail,
                    token=authCookie
                }));
            }
            return Unauthorized();
        }
    }
}