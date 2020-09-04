using IQuiz.Models.Database_Models;

namespace IQuiz.Models
{
    public class UserWithToken
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
        public User Userinfo { get; set; }
    }
}
