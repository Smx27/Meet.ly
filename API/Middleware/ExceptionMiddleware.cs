using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Error;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        
        public ILogger<ExceptionMiddleware> _logger { get; }
        public IHostEnvironment _env { get; set; }
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env)
        {
            this._env = env;
            this._logger = logger;
            this._next = next;
        }

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