﻿using System;
using System.Text;
using IQuiz.Models.Database_Models;

namespace IQuiz.Extensions
{
    public static class DecryptionMethods
    {
        public static User DecryptFromBase64(this User user)
        {
            var emailInBytes = Convert.FromBase64String(user.Email);
            var passwordInBytes = Convert.FromBase64String(user.Password);
            var email = Encoding.UTF8.GetString(emailInBytes);
            var password = Encoding.UTF8.GetString(passwordInBytes);
            return new User { Email = email, Password = password };
        }
    }
}