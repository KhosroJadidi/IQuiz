using IQuiz.Data.Context;
using IQuiz.Helper_Classes;
using IQuiz.HelperClasses;
using IQuiz.Models;
using IQuiz.Models.Non_Database_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace IQuiz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IOptions<JWTSettings> options;

        public TokenController(ApplicationDbContext dbContext, IOptions<JWTSettings> options)
        {
            this.dbContext = dbContext;
            this.options = options;
        }

        #region API Calls

        [Route("get")]
        [HttpPost]
        public ActionResult GetToken([FromBody] User user)
        {
            var decryptedUser = DecryptionMethods.DeccryptUserModel(user);

            if (!dbContext.Users.Any(u => u.Email == decryptedUser.Email))
                return new JsonResult(new NonExistingUser { Success = false, Message = "Wrong Username." });

            if (!dbContext.Users.Any(u => u.Email == decryptedUser.Email && u.Password == decryptedUser.Password))
                return new JsonResult(new NonExistingUser { Success = false, Message = "Wrong Password" });

            var validUser = dbContext.Users.Single(u => u.Email == decryptedUser.Email && u.Password == decryptedUser.Password);
            var userWithToken = GetUserWithToken(validUser);

            var json = new JsonResult(userWithToken);

            Response.Cookies.Append(CoockieNames.Email, userWithToken.Userinfo.Email);
            Response.Cookies.Append(CoockieNames.Token, userWithToken.Token);

            return json;
        }

        #endregion API Calls

        #region Helper Methods

        private UserWithToken GetUserWithToken(User validUser)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var secretKey = Encoding.ASCII.GetBytes(options.Value.SecretKey);
            var symmetricSecurityKey = new SymmetricSecurityKey(secretKey);
            var signinCreditentials = new SigningCredentials(symmetricSecurityKey,
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Email,validUser.Email),
                    new Claim(ClaimTypes.Role,ClaimRoles.User)
                }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = signinCreditentials
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(securityToken);

            var userWithToken = new UserWithToken()
            {
                Success = true,
                Message = "Token was successfully generated.",
                Token = tokenString,
                Userinfo = new User
                {
                    Id = validUser.Id,
                    Email = validUser.Email,
                    Password = null
                }
            };
            Console.WriteLine();
            return userWithToken;
        }

        #endregion Helper Methods
    }
}