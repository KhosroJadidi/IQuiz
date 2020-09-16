using Microsoft.Extensions.Configuration;

namespace IQuiz.Extensions
{
    public static  class UriMethods
    {
        public static string RetrieveGetTokenUrl(this IConfiguration configuration)
        {
            var applicationUrl = configuration.GetSection("iisSettings")["applicationUrl"];
            var getTokenRoute=configuration.GetSection("iisSettings")["getTokenRoute"];
            return  applicationUrl + getTokenRoute;
        }
    }
}