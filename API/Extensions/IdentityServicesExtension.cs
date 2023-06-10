using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServicesExtension
    {
        /// <summary>
        /// This function adds authentication services using JWT bearer authentication scheme and token
        /// validation parameters to the provided IServiceCollection.
        /// </summary>
        /// <param name="IServiceCollection">IServiceCollection is an interface that defines a contract
        /// for a collection of service descriptors. It is used to register and resolve dependencies in
        /// an application's service container.</param>
        /// <param name="IConfiguration">IConfiguration is an interface in ASP.NET Core that provides
        /// access to configuration settings from various sources such as appsettings.json, environment
        /// variables, command line arguments, and more. It allows developers to easily retrieve
        /// configuration values in their application code without hardcoding them. In the code snippet
        /// above, IConfiguration is used</param>
        /// <returns>
        /// The `services` object is being returned after adding the authentication services for
        /// Identity using JWT bearer authentication.
        /// </returns>
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