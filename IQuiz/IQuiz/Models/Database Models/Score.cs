using Microsoft.VisualBasic;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace IQuiz.Models
{
    public class Score
    {
        private int gainedPoints;
        public Score()
        {
            Date = DateTime.Now;
        }

        [Key]
        [Required, JsonProperty("id")]
        public int Id { get; set; }

        [Required, JsonProperty("user")]
        public User User { get; set; }

        [Required, JsonProperty("date")]
        public DateTime Date { get; set; }

        [Required, JsonProperty("score")]
        public int GainedPoints
        {
            get => gainedPoints;
            set { if (value < 0) gainedPoints = 0; }
        }
    }
}