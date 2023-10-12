using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /* The BaseApiController class is a basic controller configuration for all controllers in a C# API
    project. */
    // This is a Basic controller config to use in ALL Controllers
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")] //Url : api/Users
    public class BaseApiController : ControllerBase
    {
        
    }
}