using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        /// <summary>
        /// Security To create Token
        /// </summary>
        private readonly SymmetricSecurityKey _key;

        /// <summary>
        /// Constructor Init Key
        /// </summary>
        /// <param name="config"></param>
        public TokenService(IConfiguration config)
        {
            _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }
        /// <summary>
        /// This function creates a JWT token for authentication in an API using a user's username as a
        /// claim.
        /// </summary>
        /// <param name="AppUser">AppUser is a custom class representing a user in the application. It
        /// contains properties such as UserName, Email, Password, etc.</param>
        /// <returns>
        /// The method is returning a JWT token as a string.
        /// </returns>
        /// <summary>
        /// Create a Jwt Token To Auth The api
        /// </summary>
        /// <param name="user"></param>
        /// <returns>JWT token</returns>
        public string CreateToken(AppUser user)
        {
            var claim= new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
             
            var creds= new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor= new SecurityTokenDescriptor{
                Subject=new ClaimsIdentity(claim),
                Expires=DateTime.Now.AddDays(7),
                SigningCredentials= creds
            };

            var tokenHandlar = new JwtSecurityTokenHandler();
            var token=tokenHandlar.CreateToken(tokenDescriptor);
            return tokenHandlar.WriteToken(token);
        }
    }
}