using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace IQuiz.Models.Database_Models
{
    public class QuestionAndAnswer
    {
        private int _points;

        [Key]
        [Required, JsonProperty("id")]
        public int Id { get; set; }

        [Required, JsonProperty("question")]
        public string Question { get; set; }

        [Required, JsonProperty("answer_1")]
        public string Answer_1 { get; set; }

        [Required, JsonProperty("answer_2")]
        public string Answer_2 { get; set; }

        [Required, JsonProperty("answer_3")]
        public string Answer_3 { get; set; }

        [Required, JsonProperty("answer_4")]
        public string Answer_4 { get; set; }

        [Required, JsonProperty("correct_answer")]
        public string CorrectAnswer { get; set; }

        [Required, JsonProperty("points")]
        public int Points 
        { 
            get => _points;
            set { if (value < 1) _points = 1; }            
        }

        [Required, JsonProperty("image")]
        public string ImageUrl { get; set; }
    }
}
