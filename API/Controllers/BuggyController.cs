using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        /* This code is defining a controller class named `BuggyController` that inherits from
        `BaseApiController`. The controller has four action methods that return different types of
        HTTP responses. */
        private readonly DataContext context;
        public BuggyController(DataContext _context)
        {
            this.context = _context;
        }
        /// <summary>
        /// This C# function returns a string of "very SecReat Text" and requires authorization to
        /// access.
        /// </summary>
        /// <returns>
        /// The method is returning a string "very SecReat Text".
        /// </returns>
        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> getSecreat()
        {
            return "very SecReat Text";
        }
        /// <summary>
        /// This function returns a "Not Found" response if a user with ID -1 is not found, otherwise it
        /// returns the user.
        /// </summary>
        /// <returns>
        /// If the `thing` variable is null, then a `NotFound` result is returned. Otherwise, the
        /// `thing` variable is returned as an `ActionResult<AppUser>`.
        /// </returns>
        [HttpGet("not-found")]
        public ActionResult<AppUser> getNotFound()
        {
            var thing = context.Users.Find(-1);
            if (thing == null) return NotFound();
            return thing;
        }
        /// <summary>
        /// This function returns a server error message by attempting to find a user with an invalid ID
        /// in the context.
        /// </summary>
        /// <returns>
        /// The code is attempting to find a user with an ID of -1 in the context's Users table, which
        /// will likely result in a null value being returned. The null value will then be converted to
        /// a string using the ToString() method and returned as the response body of the HTTP GET
        /// request to the "server-error" endpoint. Therefore, the response will be a string
        /// representation of a null value.
        /// </returns>
        [HttpGet("server-error")]
        public ActionResult<string> getserverError()
        {
            var thing = context.Users.Find(-1);

            var thingToReturn = thing.ToString();

            return thingToReturn;
            
        }
        /// <summary>
        /// This function returns a BadRequest response with the message "Just A Bad Request" for an
        /// HTTP GET request to the "bad-request" endpoint.
        /// </summary>
        /// <returns>
        /// A BadRequest response with the message "Just A Bad Request".
        /// </returns>
        [HttpGet("bad-request")]
        public ActionResult<string> getBadRequest()
        {
            return BadRequest("Just A Bad Request");
        }
        
    }
}