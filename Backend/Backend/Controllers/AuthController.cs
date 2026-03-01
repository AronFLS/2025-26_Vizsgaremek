using Backend.Dtos;
using Database;
using Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController(CoreDbContext coreDbContext) : ControllerBase
  {
    private readonly CoreDbContext coreDbContext = coreDbContext;

    [HttpPost("register")]
    [AllowAnonymous]
    public ActionResult Register(UserDto userDto)
    {
      var hasher = new PasswordHasher<object>();
      var passwordHash = hasher.HashPassword(null!, userDto.Password);
      var now = DateTime.Now;

      var user = new User
      {
        FirstName = userDto.FirstName,
        LastName = userDto.LastName,
        Email = userDto.Email,
        PasswordHash = passwordHash,
        PhoneNumber = userDto.PhoneNumber,
        Active = true,
        RoleId = 1,
        CreatedAt = now,
        ModifiedAt = now
      };

      coreDbContext.Add(user);
      coreDbContext.SaveChanges();

      return NoContent();
    }
  }
}