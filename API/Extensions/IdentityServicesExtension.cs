using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServicesExtension
    {
        /// <summary>
        /// Extension to Add IdentityServices In Program.cs 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns>Services</returns>
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration config)
        {
            //Barrier config
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                }
            );

            //Returning Services and call this in program.cs to build our Identity 
            return services;
        }
    }
}