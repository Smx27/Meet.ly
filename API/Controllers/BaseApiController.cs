using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // This is a Basic controller config to use in ALL Controllers
    [ApiController]
    [Route("api/[controller]")] //Url : api/Users
    public class BaseApiController : ControllerBase
    {
        
    }
}