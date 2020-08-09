using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IQuiz.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IQuiz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public TokenController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [Route("get")]
        public ActionResult GetToken()
        {
            return new JsonResult(new { token = "token value here" });
        }
    }
}
