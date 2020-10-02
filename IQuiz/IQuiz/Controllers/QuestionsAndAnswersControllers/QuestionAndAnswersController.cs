using System.Linq;
using IQuiz.Data.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IQuiz.Extensions;

namespace IQuiz.Controllers.QuestionsAndAnswersControllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionAndAnswersController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public QuestionAndAnswersController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        #region API Calls
        [HttpGet]
        [Authorize]
        [Route("getQuestionsAndAnswers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult GetQuestionsAndAnswers(int quantity=1)
        {
            if (!_applicationDbContext.QuestionsAndAnswers.Any())
                return NotFound();
            var questionsAndAnswers = quantity.GetRandomQuestionsAndAnswers(_applicationDbContext);
            return Ok(questionsAndAnswers);
        }
        #endregion
    }
}