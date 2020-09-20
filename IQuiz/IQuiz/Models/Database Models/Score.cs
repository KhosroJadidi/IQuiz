using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace IQuiz.Models.Database_Models
{
    public class Score
    {
        private int _gainedPoints;
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

        [Required, JsonProperty("gainedPoints")]
        public int GainedPoints
        {
            get => _gainedPoints;
            set
            {
                if (value < 0)
                    _gainedPoints = 0;
                _gainedPoints = value;
            }
        }
    }
}