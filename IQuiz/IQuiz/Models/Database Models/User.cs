using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace IQuiz.Models
{
    public class User
    {
        [Key]
        [Required, JsonProperty("id")]
        public int Id { get; set; }

        [Required, JsonProperty("user")]
        public string Email { get; set; }

        [Required, JsonProperty("password")]
        public string Password { get; set; }
    }
}
