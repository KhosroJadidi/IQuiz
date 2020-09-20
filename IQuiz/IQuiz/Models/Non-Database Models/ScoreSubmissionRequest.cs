using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.VisualBasic;

namespace IQuiz.Models
{
    public class ScoreSubmissionRequest
    {
        [Required]
        [JsonPropertyName("email")]
        public string Email { get; set; }
        
        [Required]
        [JsonPropertyName("score")]
        public int Score { get; set; }

        [Required]
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }
    }
}