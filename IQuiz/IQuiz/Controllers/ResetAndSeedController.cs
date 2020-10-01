using IQuiz.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using IQuiz.Extensions;

namespace IQuiz.Controllers
{
    //ATTENTION: This controller and its endpoints are meant to be used for testing purposes only.
    //These don't follow the conventions of API design and response codes.
    [Route("[controller]")]
    [ApiController]
    public class ResetAndReseedController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ResetAndReseedController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        //The method type is set to GET, so it can be invoked directly in the URL field of the browser.
        #region API Calls
        [HttpGet]
        [Route("reset")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult ResetEverything()
        {
            _applicationDbContext.ResetDataBase();
            _applicationDbContext.ReseedDatabase();

            return Ok("Everything that could have been reset has now been reset.");
        }
        #endregion API Calls
    }
}