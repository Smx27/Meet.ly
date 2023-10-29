using API.Entities;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

/* This code is setting up and configuring a web application in C#. */
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Calling Application services from our extension class
builder.Services.ApplicationServices(builder.Configuration);

//Calling Identity services from our extension class
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();
//http middleware pipelines
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

//This is to migrate the database and seed the data in the database. with the userDataseed json file
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<API.Data.DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await API.Data.Seed.SeedUsers(userManager,roleManager);
}
catch(Exception ex)
{
    var logger  = services.GetService<ILogger<Program>>();
    logger.LogError(ex,"An error occur while seeding data/ Migration");
}

app.Run();
