using IQuiz.Models.Database_Models;
using Microsoft.AspNetCore.Mvc;

namespace IQuiz.Extensions
{
    public static class RegistrationMethods
    {
        public static  JsonResult GetSuccessfullyRegisteredUserJson(this User user)
        {
            var successfullyRegisteredUser = new User
            {
                Email = user.Email,
                Password = null
            };
            
            var json= new JsonResult(successfullyRegisteredUser);
            return json;
        }
    }
}