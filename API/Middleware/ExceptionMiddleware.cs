using System.Net;
using API.Error;
using System.Text.Json;

namespace API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;
    private readonly JsonSerializerOptions _serializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };

    /* This is the constructor of the `ExceptionMiddleware` class. It takes three parameters:
    `next`, `logger`, and `env`. */
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
        IHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    /// <summary>
    /// This is an async function that catches exceptions, logs them, and returns a JSON response
    /// with the error message and status code.
    /// </summary>
    /// <param name="context">HttpContext is an object that encapsulates all information about
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
            
            var json = JsonSerializer.Serialize(response,_serializerOptions);   

            await context.Response.WriteAsync(json);

        }
    }
}