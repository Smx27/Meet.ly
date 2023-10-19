using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtension
    {
        public static string getUserName(this ClaimsPrincipal user){
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }
        public static int getID(this ClaimsPrincipal user){
            return int.Parse( user.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}