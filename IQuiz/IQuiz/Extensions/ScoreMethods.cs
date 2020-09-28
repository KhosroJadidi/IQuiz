using System.Linq;
using IQuiz.Data.Context;
using IQuiz.Models;
using IQuiz.Models.Database_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IQuiz.Extensions
{
    public static class ScoreMethods
    {
        public static void SubmitScore(this ApplicationDbContext applicationDbContext,
            User user,ScoreSubmissionRequest request)
        {
            
            
            var scoreToSubmit = new Score
            {
                Date = request.Date,
                GainedPoints = request.Score,
                User = user
            };
            
            applicationDbContext.Scores.Add(scoreToSubmit);
            applicationDbContext.SaveChanges();
        }

        public static JsonResult GetTopScores(this ApplicationDbContext applicationDbContext, int quantity)
        {
            var topScores = applicationDbContext.Scores
                .Where(s => true)
                .Include(s => s.User)
                .OrderByDescending(s => s.GainedPoints)
                .Take(quantity);

            return new JsonResult(topScores);
        }
    }
}