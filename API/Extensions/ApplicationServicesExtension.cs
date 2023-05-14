using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        /// <summary>
        /// Extenstion to Build All Appservices In Program.cs
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns>Services</returns>
        public static IServiceCollection ApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //Replacing builder vith services to extend the services
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DBCS"));
            });

            //ADDED Cors Policy Created A New Policy NAME CORS and Call in APP context  
            services.AddCors(o=>o.AddPolicy(name: "CORS",builder=>{
                builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
            }));


            //Added JWT
            services.AddScoped<ITokenService,TokenService>();
            
            //Returning all the services to extend this and calling in program.cs
            return services;
        }
    }
}