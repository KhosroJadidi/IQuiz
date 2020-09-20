using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using IQuiz.Helper_Classes;
using IQuiz.Models;
using IQuiz.Models.Database_Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace IQuiz.Extensions
{
    public static class TokenCreationMethods
    {
        public static UserWithToken GetUserWithToken(this User validUser, IConfiguration collection)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var symmetricSecurityKey = SymmetricSecurityKeyMethods.GetSymmetricSecurityKey(collection);
            var signinCredentials = new SigningCredentials(symmetricSecurityKey,
                SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Email, validUser.Email),
                    new Claim(ClaimTypes.Role, ClaimRoles.User)
                }),
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = signinCredentials
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(securityToken);

            var userWithToken = new UserWithToken()
            {
                Success = true,
                Token = tokenString,
                User = new User
                {
                    Id = validUser.Id,
                    Email = validUser.Email,
                    Password = null
                }
            };
            return userWithToken;
        }
    }
}