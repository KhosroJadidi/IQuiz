using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace IQuiz.Models
{
    public class QuestionAndAnswer
    {
        private int points;

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
            get => points;
            set { if (value < 1) points = 1; }            
        }

        [Required, JsonProperty("image")]
        public string ImageUrl { get; set; }
    }
}
