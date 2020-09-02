﻿using IQuiz.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IQuiz.Helper_Classes
{
    public static class DecryptionMethods
    {
        public static User DeccryptUserModel(User user)
        {
            var emailInBytes = Convert.FromBase64String(user.Email);
            var passwordInBytes = Convert.FromBase64String(user.Password);
            var email = Encoding.UTF8.GetString(emailInBytes);
            var password = Encoding.UTF8.GetString(passwordInBytes);
            return new User { Email = email, Password = password };
        }
    }
}