using IQuiz.Data.Context;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using IQuiz.Models.Database_Models;

namespace IQuiz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ResetController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ResetController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        #region API Calls

        [Route("reset")]
        public ActionResult ResetAnsSeed()
        {
            Reset();

            Seed();

            _dbContext.SaveChanges();

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

            _dbContext.SaveChanges();
        }

        private void ResetScores()
        {
            if (_dbContext.Scores.Any())
            {
                var scores = _dbContext.Scores.ToList();
                _dbContext.Scores.RemoveRange(scores);
            }
        }

        private void ResetUsers()
        {
            if (_dbContext.Users.Any())
            {
                var users = _dbContext.Users.ToList();
                _dbContext.Users.RemoveRange(users);
            }
        }

        private void Seed()
        {
            SeedUsers();

            SeedScores();

            _dbContext.SaveChanges();
        }

        private void SeedScores()
        {
            var users = _dbContext.Users;
            foreach (User user in users)
            {
                _dbContext.Scores.Add(new Score
                {
                    User = user,
                    GainedPoints = 5,
                    Date = DateTime.Now
                });
            }
        }

        private void SeedUsers()
        {
            _dbContext.Users.AddRange(new List<User>
            {
                new User{Email="Admin@Mail.com",Password="1234" },

                new User{Email="Khosro@Mail.com",Password="1234" }
            });

            _dbContext.SaveChanges();
        }

        #endregion Helper Methods
    }
}