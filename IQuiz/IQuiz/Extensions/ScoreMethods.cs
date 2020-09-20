using System.Linq;
using IQuiz.Data.Context;
using IQuiz.Models.Database_Models;

namespace IQuiz.Extensions
{
    public static class ScoreMethods
    {
        public static void SubmitScore(this ApplicationDbContext applicationDbContext,
            Score score)
        {
            var user = applicationDbContext.Users.Single(u => u.Id == score.User.Id);
            
            var scoreToSubmit = new Score
            {
                Date = score.Date,
                GainedPoints = score.GainedPoints,
                User = user
            };
            
            applicationDbContext.Scores.Add(scoreToSubmit);
            applicationDbContext.SaveChanges();
        }
    }
}