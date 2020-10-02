using IQuiz.Models.Database_Models;
using Microsoft.EntityFrameworkCore;

namespace IQuiz.Data.Context
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions)
            :base(contextOptions)
        {
            
        }

        public DbSet<QuestionAndAnswer> QuestionsAndAnswers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Score> Scores { get; set; }
    }
}
