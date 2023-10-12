using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtension
    {
        public static string getUserName(this ClaimsPrincipal user){
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }
        public static string getID(this ClaimsPrincipal user){
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}