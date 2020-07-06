using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using IQuiz.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace IQuiz.Controllers
{
    [ApiController]
    public class QuestionAndAnswerController : ControllerBase
    {
        private readonly ApplicationDbContext applicationDbContext;
        public QuestionAndAnswerController(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        #region API Calls
        
        [Route("question")]
        public IActionResult GetQuestionAndAnswer()
        {
            if (applicationDbContext.QuestionsAndAnswers.Any())
            {
                var questionAndAnswer = applicationDbContext.QuestionsAndAnswers
                    .Single(q => q.Id == GetRandomId());
                return new JsonResult
                    (
                        new
                        {
                            ok = true,
                            question = questionAndAnswer.Question,
                            answer = questionAndAnswer.Answer,
                            message = "Fetch OK"
                        }
                    );
            }
            return new JsonResult
                (
                    new 
                    {
                        ok = false,
                        question = "No question found",
                        answer = "No answer found",
                        message = "Fetch OK"
                    }
                );
        }
        #endregion

        #region Helper Methods
        private Dictionary<string, int> GetMinAndMaxValues()
        {
            var min = applicationDbContext.QuestionsAndAnswers.Min(q => q.Id);
            var max = applicationDbContext.QuestionsAndAnswers.Max(q => q.Id);
            var bounderies = new Dictionary<string, int>
            {
                { "min",min},
                { "max",max}
            };
            
            return bounderies;
        }

        private int GetRandomId()
        {
            var bounderies =GetMinAndMaxValues();
            int min, max;
            bounderies.TryGetValue("min", out min);
            bounderies.TryGetValue("max", out max);
            var randomNumberInTHeRange = new Random().Next(min,max);
            return randomNumberInTHeRange;
        }
        #endregion 
    }
}
