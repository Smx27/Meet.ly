using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class Seed
{
    private static readonly string[] AdminRoles = new[] {"Admin","Moderator"};

    public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager){
        if(await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserDataSeed.json");

        var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData,options);

        var roles = new List<AppRole>{
            new() { Name = "Member" },
            new() { Name = "Admin" },
            new() { Name = "Moderator" },
        };
        foreach(var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach(var user in users)
        {
            if (user.UserName != null) user.UserName = user.UserName.ToLower();
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user,"Member");
        }

        var admin = new AppUser {
            UserName = "admin"
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, AdminRoles);
    }
}