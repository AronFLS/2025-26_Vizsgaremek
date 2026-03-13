using Backend.Dtos;
using Backend.Dtos.Options;
using Database;
using Database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Backend.Dtos.UserDtos;

namespace Backend.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AuthController(IOptions<JwtOptions> options, CoreDbContext coreDbContext) : ControllerBase
  {
    private readonly IOptions<JwtOptions> options = options;
    private readonly CoreDbContext coreDbContext = coreDbContext;


    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult> Register(UserRegister userDto)
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

      var createdUser = coreDbContext.Users.SingleOrDefault(u => u.Email == user.Email);
      var cart = new Cart
      {
        Active = true,
        UserId = createdUser.Id,
        CreatedAt = now,
        ModifiedAt = now
      };

      coreDbContext.Add(cart);
      coreDbContext.SaveChanges();

      return NoContent();
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public ActionResult Login(LoginRequest request)
    {
      var user = coreDbContext.Users
          .Include(u => u.Role)
          .SingleOrDefault(u => u.Email == request.Email);

      if (user == null)
      {
        return Unauthorized("Invalid email or password.");
      }
      var hasher = new PasswordHasher<object>();
      var result = hasher.VerifyHashedPassword(null!, user.PasswordHash, request.Password);

      if (result == PasswordVerificationResult.Failed)
      {
        return Unauthorized("Invalid email or password.");
      }

      var accessToken = GenerateJwtToken(user);

      var cookieOptions = new CookieOptions
      {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.Lax,
        Expires = DateTime.UtcNow.AddMinutes(options.Value.ExpiryMinutes)
      };

      HttpContext.Response.Cookies.Append(Constants.AccessTokenCookieKey, accessToken, cookieOptions);

      return Ok(accessToken);
    }

    [Authorize]
    [HttpGet("cookietoken")]
    public ActionResult<string> GetTokenFromCookie()
    {
      Request.Cookies.TryGetValue(Constants.AccessTokenCookieKey, out string? token);

      if (string.IsNullOrEmpty(token))
      {
        return Unauthorized();
      }
      return Ok(token);
    }

    [Authorize]
    [HttpPost("logout")]
    public ActionResult Logout()
    {
      HttpContext.Response.Cookies.Delete(Constants.AccessTokenCookieKey);

      return Ok();
    }

    [HttpPut("changeRole")]
    public async Task<ActionResult> ChangeRole(RoleChangeDto roleChangeDto)
    {

      var now = DateTime.Now;

      var user = coreDbContext.Users
      .Include(u => u.Role)
      .SingleOrDefault(u => u.Email == roleChangeDto.Email);

      var roles = await coreDbContext.Roles
      .Select(r => r.Id).ToListAsync();

      if (user == null)
      {
        return NotFound("User not found.");
      }


      if (!roles.Contains(roleChangeDto.RoleId))
      {
        return NotFound("Nincs ilyen role cigany");
      }

      user.RoleId = roleChangeDto.RoleId;
      user.ModifiedAt = now;
      coreDbContext.SaveChanges();

      return NoContent();
    }

    [HttpGet("users")]
    public async Task<ActionResult<User>> GetUsers()
    {
      var users = await coreDbContext.Users
      .ToListAsync();

      return Ok(users);
    }

    private string GenerateJwtToken(User user)
    {
      var jwt = options.Value;

      var claims = new List<Claim>
            {
                new ("userId", user.Id.ToString()),
                new (ClaimTypes.Name, user.Email),
                new (ClaimTypes.Email, user.Email),
                new ("firstName", user.FirstName),
                new ("lastName", user.LastName),
                new (ClaimTypes.Role, user.Role.Name)
            };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
          issuer: jwt.Issuer,
          audience: jwt.Audience,
          claims: claims,
          expires: DateTime.Now.AddMinutes(jwt.ExpiryMinutes),
          signingCredentials: creds
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }


  }
}