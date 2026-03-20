using Backend.Middlewares;
using Database;
using Microsoft.EntityFrameworkCore;

namespace Backend
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      // Add services to the container.
      builder.Services.AddAuthenticationService(builder.Configuration);

      builder.Services.AddDbContext<CoreDbContext>(options =>
          options.UseSqlite(builder.Configuration.GetConnectionString(nameof(CoreDbContext)))
      );

      builder.Services.AddControllers();
      // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();

      var app = builder.Build();

      // Configure the HTTP request pipeline.
      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();

      app.UseCors(builder =>
      {
        builder.AllowCredentials()
                     .WithOrigins("http://localhost:5173")
                     .AllowAnyMethod()
                     .AllowAnyHeader();
      });

      app.UseMiddleware<AuthorizationHeaderSetterMiddleware>();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseStaticFiles();


      app.MapControllers();

      app.Run();
    }
  }
}
