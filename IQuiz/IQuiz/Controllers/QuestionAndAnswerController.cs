using IQuiz.Data.Context;
using IQuiz.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

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

        [Route("test")]
        public IActionResult Test(int quantity = 1)
        {
            return new JsonResult(GetRandomQuestionsAndAnswers(quantity));
        }

        #endregion API Calls

        #region Helper Methods

        private List<int> GetAllQuestionsAndAnswersIds()
        {
            var listOfAllIds = new List<int>();
            var allQA = applicationDbContext.QuestionsAndAnswers;
            foreach (var item in allQA)
            {
                listOfAllIds.Add(item.Id);
            }
            return listOfAllIds;
        }

        private List<int> GetRandomIds(int quantity = 1)
        {
            var AllIds = GetAllQuestionsAndAnswersIds();
            int maxLimit = AllIds.Count();

            int approvedQuantity = PositiveOrLessThanEqualMaxLimit(quantity, maxLimit);

            var UniqueRandomNumbers = GetUniqueRandomNumbers(approvedQuantity, maxLimit);
            var randomIds = new List<int>();

            foreach (var item in UniqueRandomNumbers)
            {
                randomIds.Add(AllIds[item]);
            }

            return randomIds;
        }

        private List<QuestionAndAnswer> GetRandomQuestionsAndAnswers(int quantity = 1)
        {
            var Ids = GetRandomIds(quantity);
            var questionsAndAnswers = new List<QuestionAndAnswer>();

            foreach (var id in Ids)
            {
                var questionAndAnswer = applicationDbContext.QuestionsAndAnswers
                    .Single(q => q.Id == id);
                questionsAndAnswers.Add(questionAndAnswer);
            }

            return questionsAndAnswers;
        }

        private int PositiveOrLessThanEqualMaxLimit(int numberToCheck, int maxLimit)
        {
            if (numberToCheck <= 0)
                numberToCheck = 1;
            else if (numberToCheck > maxLimit)
                numberToCheck = maxLimit;

            return numberToCheck;
        }

        private List<int> GetUniqueRandomNumbers(int quantity, int maxValue)
        {
            var numbers = new List<int>();
            var rng = new Random();

            while (numbers.Count() < quantity)
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