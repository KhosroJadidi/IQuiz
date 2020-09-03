using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace IQuiz.Models.Database_Models
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
