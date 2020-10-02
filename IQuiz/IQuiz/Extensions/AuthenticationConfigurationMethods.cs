using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace IQuiz.Extensions
{
    public static  class AuthenticationConfigurationMethods
    {
        public static void ConfigureAuthenticationOptions(this AuthenticationOptions authenticationOptions)
        {
            authenticationOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            authenticationOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        public static void ConfigureJwtBearerOptions(this JwtBearerOptions jwtBearerOptions,IConfiguration configuration)
        {
            jwtBearerOptions.RequireHttpsMetadata = true;
            jwtBearerOptions.SaveToken = true;
            jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey=true,
                IssuerSigningKey = configuration.GetSymmetricSecurityKey(),
                ValidateIssuer=false,
                ValidateAudience=false
            };
        }
    }
}