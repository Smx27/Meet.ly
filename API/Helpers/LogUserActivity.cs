using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (! resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            int id = resultContext.HttpContext.User.getID();

            var repo = resultContext.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
            
            var user = await repo.GetUserByIdAsync(id);

            user.LastActive = DateTime.UtcNow;

            await repo.SaveAllAsync();
        }
    }
}