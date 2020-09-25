using IQuiz.Data.Context;
using IQuiz.Models;
using IQuiz.Models.Database_Models;

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
    }
}