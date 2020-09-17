using IQuiz.Data.Context;
using IQuiz.Models;
using IQuiz.Models.Database_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices.WindowsRuntime;
using IQuiz.Extensions;
using Microsoft.Extensions.Configuration;

namespace IQuiz.Controllers.Users_Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext applicationDbContext, IConfiguration configuration)
        {
            _applicationDbContext = applicationDbContext;
            _configuration = configuration;
        }

        #region API Calls
        [HttpPut]
        [Route("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public ActionResult Register([FromBody] User user)
        {
            var decryptedUser = user.DecryptFromBase64();

            if (_applicationDbContext.Users.Any(u => u.Email==decryptedUser.Email))
                return NoContent();
            
            _applicationDbContext.Users.Add(decryptedUser);
            _applicationDbContext.SaveChanges();

            var uri = _configuration.RetrieveRegisterUserUrl();
            var json = new JsonResult(decryptedUser);
            return Created(uri,json);
        }
        #endregion

        
    }
}