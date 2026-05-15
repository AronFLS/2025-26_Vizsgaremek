using Backend.Middlewares;
using Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

namespace Backend
{
  public class Program
  {
    public static async Task Main(string[] args)
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

        app.UseSwagger();
        app.UseSwaggerUI();
      

      app.UseDefaultFiles();
      string currentDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
      app.UseStaticFiles(new StaticFileOptions
      {
        FileProvider = new PhysicalFileProvider(currentDir),
        RequestPath = ""
      });

      app.UseHttpsRedirection();

      app.UseCors(builder =>
      {
        builder.AllowCredentials()
                     .WithOrigins("http://localhost:3000")
                     .AllowAnyMethod()
                     .AllowAnyHeader();
      });

      app.UseMiddleware<AuthorizationHeaderSetterMiddleware>();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseStaticFiles();


      app.MapControllers();

      using (var scope = app.Services.CreateScope())
      {
        var db = scope.ServiceProvider.GetRequiredService<CoreDbContext>();
        await db.Database.MigrateAsync();
        SeedData.Initialize(db);
      }
      app.Run();
    }
  }
}
