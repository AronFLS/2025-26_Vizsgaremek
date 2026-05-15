using Backend.Dtos.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddAuthenticationService (this IServiceCollection services, IConfiguration configuration)
        {
            var jwtConfigSection = configuration.GetSection(nameof(JwtOptions));

            services.Configure<JwtOptions>(jwtConfigSection);

            var jwtConfig = jwtConfigSection.Get<JwtOptions>() ?? new JwtOptions();

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtConfig.Issuer,
                        ValidAudience = jwtConfig.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Key)),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization();    
            return services;
        }
    }
}
