using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IQuiz.Extensions
{
    public static  class SymmetricSecurityKeyMethods
    {
        public static SymmetricSecurityKey GetSymmetricSecurityKey( IConfiguration collection)
        {
            var secretKeyString = collection.GetSection("JWTSettings")["SecretKey"];
            var secretKeyByte = Encoding.ASCII.GetBytes(secretKeyString);
            return new SymmetricSecurityKey(secretKeyByte);
        }
    }
}