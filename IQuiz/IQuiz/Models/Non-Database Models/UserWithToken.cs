using System.Text.Json.Serialization;
using IQuiz.Models.Database_Models;

namespace IQuiz.Models
{
    public class UserWithToken
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
        
        [JsonPropertyName("token")]
        public string Token { get; set; }
        
        [JsonPropertyName("user")]
        public User User { get; set; }
    }
}
