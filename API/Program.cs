using API.Extensions;
using API.Middleware;

/* This code is setting up and configuring a web application in C#. */
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Calling Application services from our extension class
builder.Services.ApplicationServices(builder.Configuration);

//Calling Identity services from our extension class
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
//app.UseCors(c=> c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseCors("CORS");
//Add Redirection from HTTP to HTTPS
app.UseHttpsRedirection();

//Jwt Authetication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
