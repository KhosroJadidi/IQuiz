using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IQuiz.HelperClasses
{
    public static class CoockieNames
    {
        public static string Token { get; } = "authorization-cookie-token";
        public static string Email { get; } = "authorization-cookie-userInfo-email";
    }
}
