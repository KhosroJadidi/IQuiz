using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IQuiz.Models.Non_Database_Models
{
    public class UserWithToken:User
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
    }
}
