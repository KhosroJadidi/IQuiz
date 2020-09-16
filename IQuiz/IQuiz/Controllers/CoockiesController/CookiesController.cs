using IQuiz.Helper_Classes;
using IQuiz.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IQuiz.Controllers.CoockiesController
{
    [ApiController]
    [Route("[controller]")]
    public class CookiesController : ControllerBase
    {
        #region API Calls
        
        [HttpPut]
        [Route("saveAuthCookies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult SaveAuthenticationCookies(UserWithToken userWithToken)
        {
            Response.Cookies.Append(CoockieNames.Email, userWithToken.User.Email);
            Response.Cookies.Append(CoockieNames.Token, userWithToken.Token);
            return Ok();
        }
        
        [HttpDelete]
        [Route("deleteAuthCookies")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult RemoveAuthenticationCookies()
        {
#nullable enable
            var tokenCookie = HttpContext.Request.Cookies[CoockieNames.Token];
            var emailCookie = HttpContext.Request.Cookies[CoockieNames.Email];
#nullable disable
            var tokenCookieDeleted = false;
            var emailCookieDeleted = false;

            if (tokenCookie != null)
            {
                HttpContext.Response.Cookies.Delete(tokenCookie);
                tokenCookieDeleted = true;
            }

            if (emailCookie != null)
            {
                HttpContext.Response.Cookies.Delete(emailCookie);
                emailCookieDeleted = true;
            }

            if (tokenCookieDeleted && emailCookieDeleted)
                return NoContent();
            
            var error= new JsonResult(new
            {
                tokenCookieDeleted,
                emailCookieDeleted
            });
            return NotFound(error.Value);
        }
        #endregion
    }
}