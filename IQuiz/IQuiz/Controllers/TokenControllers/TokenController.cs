using IQuiz.Data.Context;
using Microsoft.AspNetCore.Mvc;
using IQuiz.Extensions;
using IQuiz.Models.Database_Models;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace IQuiz.Controllers.TokenControllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;

        public TokenController(ApplicationDbContext applicationDbContext,IConfiguration configuration)
        {
            _applicationDbContext = applicationDbContext;
            _configuration = configuration;
        }
        
        #region API Calls
        
        [HttpPost]
        [Route("getToken")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult GetToken([FromBody] User user)
        {

            var decryptedUser = user.DecryptFromBase64();

            if (!_applicationDbContext.Users.Any(u =>
                u.Email == decryptedUser.Email))
                return NoContent();

            if (!_applicationDbContext.Users.Any(u =>
                u.Email == decryptedUser.Email && u.Password == decryptedUser.Password))
                return NoContent();
            
            var validUser = _applicationDbContext.Users.Single(u =>
                u.Email == decryptedUser.Email && u.Password == decryptedUser.Password);

            var userWithToken = validUser.GetUserWithToken(_configuration);
            
            var uri = _configuration.RetrieveGetTokenUrl();
            var json= new JsonResult(userWithToken);
            
            return Created(uri, json);

        }
        #endregion
    }
}