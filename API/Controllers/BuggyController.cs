using System.Reflection.Metadata.Ecma335;
using System.Net;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext context;
        public BuggyController(DataContext _context)
        {
            this.context = _context;
        }
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> getSecreat()
        {
            return "very SecReat Text";
        }
        [HttpGet("not-found")]
        public ActionResult<AppUser> getNotFound()
        {
            var thing = context.Users.Find(-1);
            if (thing == null) return NotFound();
            return thing;
        }
        [HttpGet("server-error")]
        public ActionResult<string> getserverError()
        {
            var thing = context.Users.Find(-1);

            var thingToReturn = thing.ToString();

            return thingToReturn;
            
        }
        [HttpGet("bad-request")]
        public ActionResult<string> getBadRequest()
        {
            return BadRequest("Just A Bad Request");
        }
        
    }
}