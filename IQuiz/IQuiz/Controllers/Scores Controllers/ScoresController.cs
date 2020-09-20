using System.Linq;
using IQuiz.Data.Context;
using IQuiz.Extensions;
using IQuiz.Models;
using IQuiz.Models.Database_Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace IQuiz.Controllers.Scores_Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScoresController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IConfiguration _configuration;

        public ScoresController(ApplicationDbContext applicationDbContext,
            IConfiguration configuration)
        {
            _applicationDbContext = applicationDbContext;
            _configuration = configuration;
        }
        
        [HttpPost]
        [Authorize]
        [Route("submit")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
            public ActionResult SubmitScore([FromBody] Score score)
            {
                if (_applicationDbContext.Scores.Any(s => s.User.Email==score.User.Email &&s.Date==score.Date))
                    return NoContent();
                    
                _applicationDbContext.SubmitScore(score);
                var uri = _configuration.RetrieveSubmitScoreUrl();
                var json = new JsonResult(score);
                return Created(uri,json);
            }
    }
}