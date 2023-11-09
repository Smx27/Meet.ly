using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        /// <summary>
        /// This is an extension method for IServiceCollection that adds various services to the
        /// application, including database context, CORS policy, and JWT token service.
        /// </summary>
        /// <param name="IServiceCollection">IServiceCollection is an interface that defines a contract
        /// for a collection of service descriptors. It is used to register and resolve services in the
        /// dependency injection container. The IServiceCollection interface is implemented by the
        /// ServiceCollection class, which is used to build the service container.</param>
        /// <param name="IConfiguration">IConfiguration is an interface in ASP.NET Core that provides
        /// access to configuration settings. It allows you to read configuration values from various
        /// sources such as appsettings.json, environment variables, command line arguments, and more.
        /// In this code, it is used to get the connection string for the database.</param>
        /// <returns>
        /// The method is returning the IServiceCollection after adding various services to it, such as
        /// configuring a DbContext, adding a CORS policy, and registering a JWT service.
        /// </returns>
        /// <summary>
        /// Extenstion to Build All Appservices In Program.cs
        /// </summary>
        /// <param name="services"></param>
        /// <param name="config"></param>
        /// <returns>Services</returns>
        public static IServiceCollection ApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            //Replacing builder vith services to extend the services
            /* This code is an extension method for IServiceCollection that adds various services to
            the application. */
            services.AddDbContext<DataContext>(opt => 
            {
                opt.UseSqlite(config.GetConnectionString("DBCS"));
            });

            //ADDED Cors Policy Created A New Policy NAME CORS and Call in APP context  
            // services.AddCors(o=> o.AddPolicy(name: "CORS",builder=>{
            //     builder.AllowAnyHeader()
            //     .AllowAnyMethod()
            //     .AllowCredentials()
            //     .AllowAnyOrigin();
            // }));
            // services.AddCors(o=> o.AddPolicy(name: "CORS",builder=>{
            //     builder.AllowAnyHeader()
            //     .AllowAnyMethod()
            //     .AllowCredentials()
            //     .WithOrigins("https://localhost:4200");
            // }));
            // services.AddCors()
            
            services.AddHttpsRedirection(options =>
                {
                    options.HttpsPort = 5001;
                });

            //Added JWT
            services.AddScoped<ITokenService,TokenService>();

            //Adding User Repository
            services.AddScoped<IUserRepository,UserRepository>();

            //adding automapper service into the application
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            //Adding Photo Service
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IPhotoService,PhotoService>();
            services.AddScoped<ILikeRepository,LikesRepository>();
            services.AddScoped<IMessageRepository,MessageRepository>();
            services.AddScoped<LogUserActivity>();
            //Adding SignalR
            services.AddSignalR();
            //Adding PresenceTracker
            services.AddSingleton<PresenceTracker>();
            
            //Returning all the services to extend this and calling in program.cs
            return services;
        }
    }
}