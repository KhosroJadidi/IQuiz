﻿using IQuiz.Data.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using IQuiz.Models.Database_Models;

namespace IQuiz.Controllers
{
    [ApiController]
    public class QuestionAndAnswerController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public QuestionAndAnswerController(ApplicationDbContext applicationDbContext)
        {
            this._applicationDbContext = applicationDbContext;
        }

        #region API Calls

        [Route("questions")]
        public IActionResult GetQuestionsAndAnswers(int quantity = 1)
        {            
            return new JsonResult(GetRandomQuestionsAndAnswers(quantity));
        }

        #endregion API Calls

        #region Helper Methods

        private List<QuestionAndAnswer> GetRandomQuestionsAndAnswers(int quantity = 1)
        {
            var ids = GetRandomIds(quantity);
            var questionsAndAnswers = new List<QuestionAndAnswer>();

            foreach (var id in ids)
            {
                var questionAndAnswer = _applicationDbContext.QuestionsAndAnswers
                    .Single(q => q.Id == id);
                questionsAndAnswers.Add(questionAndAnswer);
            }

            return questionsAndAnswers;
        }

        private List<int> GetRandomIds(int quantity = 1)
        {
            var allIds = GetAllQuestionsAndAnswersIds();
            int maxLimit = allIds.Count;

            int approvedQuantity = PositiveOrLessThanEqualMaxLimit(quantity, maxLimit);

            var uniqueRandomNumbers = GetUniqueRandomNumbers(approvedQuantity, maxLimit);
            var randomIds = new List<int>();

            foreach (var item in uniqueRandomNumbers)
            {
                randomIds.Add(allIds[item]);
            }

            return randomIds;
        }

        private List<int> GetAllQuestionsAndAnswersIds()
        {
            var listOfAllIds = _applicationDbContext.QuestionsAndAnswers.Select(q => q.Id);
            return listOfAllIds.ToList();
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