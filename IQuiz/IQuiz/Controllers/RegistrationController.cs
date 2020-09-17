// using System.Linq;
// using IQuiz.Data.Context;
// using IQuiz.Helper_Classes;
// using IQuiz.Models;
// using IQuiz.Models.Database_Models;
// using Microsoft.AspNetCore.Mvc;
//
// namespace IQuiz.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class RegistrationController : ControllerBase
//     {
//         private readonly ApplicationDbContext _applicationDbContext;
//
//         public RegistrationController(ApplicationDbContext applicationDbContext)
//         {
//             _applicationDbContext = applicationDbContext;
//         }
//         
//         [HttpPost]
//         [Route("register")]
//         public IActionResult Register([FromBody] User user)
//         {
//             var decryptedUser = DecryptionMethods.DecrypteUser(user);
//             
//             if(_applicationDbContext.Users.Any(u=>u.Email==decryptedUser.Email))
//                 return new JsonResult(new DuplicateUser{Success = false,Message = "This username is already taken."});
//             _applicationDbContext.Users.Add(decryptedUser);
//             _applicationDbContext.SaveChanges();
//             return new JsonResult(new NewUser{Success = true,Message = "Registration completed!",Email = decryptedUser.Email});
//         }
//     }
// }