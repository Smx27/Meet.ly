using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Calling Application services from our extension class
builder.Services.ApplicationServices(builder.Configuration);

//Calling Identity services from our extension class
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(c=> c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

//Jwt Authetication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
