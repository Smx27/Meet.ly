using API.Entities;
using API.Extensions;
using API.Middleware;
using API.SignalR;
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
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(builder =>
{
    builder.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .WithOrigins("https://localhost:4200","http://localhost:4300");
});
//http middleware pipelines
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
//app.UseCors(c=> c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
//app.UseCors("CORS");
//Add Redirection from HTTP to HTTPS
app.UseHttpsRedirection();

//Jwt Authetication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Adding hub in application
app.MapHub<PresenceHub>("hubs/presence");
app.MapHub<MessageHub>("hubs/message");

//This is to migrate the database and seed the data in the database. with the userDataseed json file
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<API.Data.DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await context.Database.ExecuteSqlRawAsync("DELETE FROM [Connections]");
    await API.Data.Seed.SeedUsers(userManager,roleManager);
}
catch(Exception ex)
{
    var logger  = services.GetService<ILogger<Program>>();
    logger.LogError(ex,"An error occur while seeding data/ Migration");
}

app.Run();
