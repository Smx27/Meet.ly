using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        public AdminController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await userManager.Users
                .OrderBy(u=> u.UserName)
                .Select(u=> new {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r=> r.Role.Name).ToList()
                }).ToListAsync();

            return Ok(users);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery]string roles){
            
            if(string.IsNullOrEmpty(roles)) return BadRequest("You must select atleas one role");

            var selectedRoles = roles.Split(',');

            var user = await userManager.FindByNameAsync(username);

            if(user == null) return NotFound();

            var userRoles = await userManager.GetRolesAsync(user);

            var results = await userManager.AddToRolesAsync(user,selectedRoles.Except(userRoles));

            if(!results.Succeeded) return BadRequest("Failed to assign role");

            results = await userManager.RemoveFromRolesAsync(user,userRoles.Except(selectedRoles));

            if(!results.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModerators()
        {
            return Ok("Only admins and Modaretors can see this");
        }
    }
}