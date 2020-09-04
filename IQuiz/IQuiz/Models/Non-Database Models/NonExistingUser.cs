using IQuiz.Models.Database_Models;

namespace IQuiz.Models
{
    public class NonExistingUser:User
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
