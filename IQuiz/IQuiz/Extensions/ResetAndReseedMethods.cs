using System.Linq;
using IQuiz.Data.Context;
using Microsoft.IdentityModel.Protocols;

namespace IQuiz.Extensions
{
    public static  class ResetAndReseedMethods
    {
        public static void ResetDataBase(this ApplicationDbContext applicationDbContext)
        {
            if (applicationDbContext.Scores.Any())
                applicationDbContext.Scores.RemoveRange(applicationDbContext.Scores);
            
            if(applicationDbContext.Users.Any())
                applicationDbContext.Users.RemoveRange(applicationDbContext.Users);
            
            if(applicationDbContext.QuestionsAndAnswers.Any())
                applicationDbContext.QuestionsAndAnswers.RemoveRange(applicationDbContext.QuestionsAndAnswers);

            applicationDbContext.SaveChanges();
        }
    }
}