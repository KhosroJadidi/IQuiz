using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace IQuiz.Models
{
    public class QuestionAndAnswer
    {
        [Required,JsonProperty("id")]
        public int Id { get; set; }

        [Required,JsonProperty("question")]
        public string Question { get; set; }

        [Required,JsonProperty("answer")]
        public string Answer { get; set; }
    }
}
