using System.Net;
using API.Error;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        
        public ILogger<ExceptionMiddleware> _logger { get; }
        public IHostEnvironment _env { get; set; }
        /* This is the constructor of the `ExceptionMiddleware` class. It takes three parameters:
        `next`, `logger`, and `env`. */
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env)
        {
            this._env = env;
            this._logger = logger;
            this._next = next;
        }

        /// <summary>
        /// This is an async function that catches exceptions, logs them, and returns a JSON response
        /// with the error message and status code.
        /// </summary>
        /// <param name="HttpContext">HttpContext is an object that encapsulates all information about
        /// an individual HTTP request/response. It contains properties such as Request, Response, User,
        /// Session, and more. It is used to access and manipulate the incoming request and outgoing
        /// response in ASP.NET Core applications.</param>
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType="application/json";
                context.Response.StatusCode= (int)HttpStatusCode.InternalServerError;

                var response= _env.IsDevelopment()?
                    new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString()):
                    new ApiException(context.Response.StatusCode,ex.Message,"Internal Server Error");

                var option = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; 

                var json = JsonSerializer.Serialize(response,option);   

                await context.Response.WriteAsync(json);

            }
        }
    }
}