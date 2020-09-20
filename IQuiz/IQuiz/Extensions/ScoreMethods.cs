using IQuiz.Data.Context;
using IQuiz.Models.Database_Models;

namespace IQuiz.Extensions
{
    public static class ScoreMethods
    {
        public static void SubmitScore(this ApplicationDbContext applicationDbContext,
            Score score)
        {
            applicationDbContext.Scores.Add(score);
            applicationDbContext.SaveChanges();
        }
    }
}