using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IQuiz.Extensions
{
    public static  class SymmetricSecurityKeyMethods
    {
        // public static SymmetricSecurityKey GetSymmetricSecurityKey( IConfiguration configuration)
        // {
        //     var secretKeyString = configuration.GetSection("JWTSettings")["SecretKey"];
        //     var secretKeyByte = Encoding.ASCII.GetBytes(secretKeyString);
        //     return new SymmetricSecurityKey(secretKeyByte);
        // }
        
        public static SymmetricSecurityKey GetSymmetricSecurityKey( this IConfiguration configuration)
        {
            var secretKeyString = configuration.GetSection("JWTSettings")["SecretKey"];
            var secretKeyByte = Encoding.ASCII.GetBytes(secretKeyString);
            return new SymmetricSecurityKey(secretKeyByte);
        }
    }
}