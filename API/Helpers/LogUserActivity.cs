using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();

        if (resultContext.HttpContext.User.Identity is { IsAuthenticated: false }) return;

        var id = resultContext.HttpContext.User.GetId();

        var unitOfWork = resultContext.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
            
        var user = await unitOfWork.UserRepository.GetUserByIdAsync(id);

        user.LastActive = DateTime.UtcNow;

        await unitOfWork.Complete();
    }
}