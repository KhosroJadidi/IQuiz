using IQuiz.Data.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using IQuiz.Models.Database_Models;
using Microsoft.AspNetCore.Authorization;

namespace IQuiz.Controllers
{
    [ApiController]
    public class QuestionAndAnswerController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public QuestionAndAnswerController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        #region API Calls

        [Route("getQuestions")]
        [Authorize]
        public IActionResult GetQuestionsAndAnswers(int quantity = 1)
        {            
            return new JsonResult(GetRandomQuestionsAndAnswers(quantity));
        }

        #endregion API Calls

        #region Helper Methods

        private List<QuestionAndAnswer> GetRandomQuestionsAndAnswers(int quantity = 1)
        {
            var ids = GetRandomIds(quantity);

            return ids.Select(id => _applicationDbContext.QuestionsAndAnswers.Single(q => q.Id == id)).ToList();
        }

        private IEnumerable<int> GetRandomIds(int quantity = 1)
        {
            var allIds = GetAllQuestionsAndAnswersIds();
            var maxLimit = allIds.Count;

            var approvedQuantity = PositiveOrLessThanEqualMaxLimit(quantity, maxLimit);

            var uniqueRandomNumbers = GetUniqueRandomNumbers(approvedQuantity, maxLimit);

            return uniqueRandomNumbers.Select(item => allIds[item]).ToList();
            
        }

        private List<int> GetAllQuestionsAndAnswersIds()
        {
            var listOfAllIds = _applicationDbContext.QuestionsAndAnswers.Select(q => q.Id);
            return listOfAllIds.ToList();
        }

        private static int PositiveOrLessThanEqualMaxLimit(int numberToCheck, int maxLimit)
        {
            if (numberToCheck <= 0)
                numberToCheck = 1;
            else if (numberToCheck > maxLimit)
                numberToCheck = maxLimit;

            return numberToCheck;
        }

        private static IEnumerable<int> GetUniqueRandomNumbers(int quantity, int maxValue)
        {
            var numbers = new List<int>();
            var rng = new Random();

            while (numbers.Count < quantity)
            {
                int num = rng.Next(0, maxValue);
                if (!numbers.Contains(num))
                    numbers.Add(num);
            }

            return numbers;
        }

        #endregion Helper Methods
    }
}