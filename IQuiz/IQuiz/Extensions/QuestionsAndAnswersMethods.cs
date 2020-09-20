using System;
using System.Collections.Generic;
using System.Linq;
using IQuiz.Data.Context;
using Microsoft.AspNetCore.Mvc;

namespace IQuiz.Extensions
{
    public static class QuestionsAndAnswersMethods
    {
        public static JsonResult GetRandomQuestionsAndAnswers(this int quantity,
            ApplicationDbContext applicationDbContext)
        {
            //get the count of available questions in the DB.
            var availableCount =applicationDbContext.QuestionsAndAnswers.Count();
                
            //input sanitization
            if (quantity < 0)
                quantity = 1;
            if (quantity > availableCount)
                quantity = availableCount;

            var randomIndices= new List<int>();
            var random= new Random();
            
            //get a list of random indices.(Note: Indices is the plural form of index)
            //The size of this list is equal to the requested quantity of questions.
            //The list won't contain duplicate indices.
            while (randomIndices.Count()<quantity)
            {
                var randomIndex = random.Next(0, availableCount-1);
                if(randomIndices.All(index => index != randomIndex))
                    randomIndices.Add(randomIndex);
            }
            
            //select questions based on randomly generated indices.
            var randomQuestions = randomIndices.Select(index =>
                applicationDbContext.QuestionsAndAnswers.ToArray()[index]);
            
            return new JsonResult(randomQuestions);
        }
    }
}