﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IQuiz.Models;
using Microsoft.EntityFrameworkCore;

namespace IQuiz.Data.Context
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> contextOptions)
            :base(contextOptions)
        {
            
        }

        public DbSet<QuestionAndAnswer> QuestionsAndAnswers { get; set; }
    }
}