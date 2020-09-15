// using IQuiz.Data.Context;
// using IQuiz.Helper_Classes;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Options;
// using Microsoft.IdentityModel.Tokens;
// using System;
// using System.Collections.Generic;
// using System.IdentityModel.Tokens.Jwt;
// using System.Linq;
// using System.Security.Claims;
// using System.Text;
// using IQuiz.Models;
// using IQuiz.Models.Database_Models;
// using IQuiz.Services;
//
//
// namespace IQuiz.Controllers
// {
//     [Route("[controller]")]
//     [ApiController]
//     public class TokenController : ControllerBase
//     {
//         private readonly ApplicationDbContext _dbContext;
//         private readonly IOptions<JwtSettings> _options;
//
//         public TokenController(ApplicationDbContext dbContext, IOptions<JwtSettings> options)
//         {
//             _dbContext = dbContext;
//             _options = options;
//         }
//
//         #region API Calls
//         //Login takes places on the front end, which is why this method isn't called "Login".
//         [Route("getToken")]
//         [HttpPost]
//         public ActionResult GetToken([FromBody] User user)
//         {
//             var decryptedUser = DecryptionMethods.DecrypteUser(user);
//
//             if (!_dbContext.Users.Any(u => u.Email == decryptedUser.Email))
//                 return new JsonResult(new NonExistingUser { Success = false, Message = "Wrong Username." });
//
//             if (!_dbContext.Users.Any(u => u.Email == decryptedUser.Email && u.Password == decryptedUser.Password))
//                 return new JsonResult(new NonExistingUser { Success = false, Message = "Wrong Password" });
//
//             var validUser = _dbContext.Users.Single(u => u.Email == decryptedUser.Email && u.Password == decryptedUser.Password);
//             var userWithToken = GetUserWithToken(validUser);
//
//             var json = new JsonResult(userWithToken);
//
//             Response.Cookies.Append(CoockiesNames.Email, userWithToken.User.Email);
//             Response.Cookies.Append(CoockiesNames.Token, userWithToken.Token);
//
//             return json;
//         }
//
//         #endregion API Calls
//
//         #region Helper Methods
//
//         private UserWithToken GetUserWithToken(User validUser)
//         {
//             var tokenHandler = new JwtSecurityTokenHandler();
//             var secretKey = Encoding.ASCII.GetBytes(_options.Value.SecretKey);
//             var symmetricSecurityKey = new SymmetricSecurityKey(secretKey);
//             var signinCredentials = new SigningCredentials(symmetricSecurityKey,
//                 SecurityAlgorithms.HmacSha256Signature);
//
//             var tokenDescriptor = new SecurityTokenDescriptor
//             {
//                 Subject = new ClaimsIdentity(new List<Claim>
//                 {
//                     new Claim(ClaimTypes.Email,validUser.Email),
//                     new Claim(ClaimTypes.Role,ClaimRoles.User)
//                 }),
//                 Expires = DateTime.Now.AddHours(1),
//                 SigningCredentials = signinCredentials
//             };
//
//             var securityToken = tokenHandler.CreateToken(tokenDescriptor);
//             var tokenString = tokenHandler.WriteToken(securityToken);
//
//             var userWithToken = new UserWithToken()
//             {
//                 Success = true,
//                 Token = tokenString,
//                 User = new User
//                 {
//                     Id = validUser.Id,
//                     Email = validUser.Email,
//                     Password = null
//                 }
//             };
//             return userWithToken;
//         }
//
//         #endregion Helper Methods
//     }
// }