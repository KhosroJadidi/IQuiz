using IQuiz.Data.Context;
using IQuiz.Helper_Classes;
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

            var userWithToken = GetUserWithToken(decryptedUser);
            return new JsonResult(userWithToken);
        }
        #endregion

        #region Helper Methods
        private UserWithToken GetUserWithToken(User decryptedUser)
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
                    new Claim(ClaimTypes.Email,decryptedUser.Email),
                    new Claim(ClaimTypes.Role,ClaimRoles.User)
                }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = signinCreditentials
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(securityToken);

            return new UserWithToken
            {
                Email = decryptedUser.Email,
                Success = true,
                Message = "Token was successfully generated.",
                Token = tokenString
            };
        }
        #endregion
    }
}