using IQuiz.Data.Context;
using IQuiz.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IQuiz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ResetController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ResetController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region API Calls

        [Route("reset")]
        public ActionResult ResetAnsSeed()
        {
            Reset();

            Seed();

            dbContext.SaveChanges();

            return Ok("Db has been reset and seeded. If the database contains no questions, run the corresponding SQL script in order to seed them as well.");
        }

        #endregion API Calls

        #region Helper Methods

        private void Reset()
        {
            ResetScores();

            ResetUsers();

            //uncomment this method to reset the questions as well.
            //ResetQuestions();

            dbContext.SaveChanges();
        }

        private void ResetQuestions()
        {
            dbContext.QuestionsAndAnswers.RemoveRange();
        }

        private void ResetScores()
        {
            if (dbContext.Scores.Any())
            {
                var scores = dbContext.Scores.ToList();
                dbContext.Scores.RemoveRange(scores);
            }
        }

        private void ResetUsers()
        {
            if (dbContext.Users.Any())
            {
                var users = dbContext.Users.ToList();
                dbContext.Users.RemoveRange(users);
            }
        }

        private void Seed()
        {
            SeedUsers();

            SeedScores();

            dbContext.SaveChanges();
        }

        private void SeedScores()
        {
            var users = dbContext.Users;
            foreach (User user in users)
            {
                dbContext.Scores.Add(new Score
                {
                    User = user,
                    GainedPoints = 5,
                    Date = DateTime.Now
                });
            }
        }

        private void SeedUsers()
        {
            dbContext.Users.AddRange(new List<User>
            {
                new User{Email="Admin@Mail.com",Password="1234" },

                new User{Email="Khosro@Mail.com",Password="1234" }
            });

            dbContext.SaveChanges();
        }

        #endregion Helper Methods
    }
}