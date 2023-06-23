using JwtBackend.Data;
using JwtBackend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JwtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public readonly IConfiguration _configuration;
        
        public UserController(
            IConfiguration configuration,
            MyDbContext dbContext
            )
        {
            this._dbContext = dbContext; //connection string for intracting with Database
            this._configuration = configuration;//For Jwt
        }

        [HttpPost("register")]
        [AllowAnonymous]//jab koi api ko authentication ki jarurt nahi dene ho.
        public async Task<IActionResult> insertUser([FromBody] User user)
        {
            if (_dbContext.User.Where(u => u.Email == user.Email).FirstOrDefault() != null)
            {
                return Ok();
            }
            user.UserId = Guid.NewGuid();
            user.MemberSince = DateTime.Now;
            await _dbContext.User.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult loginUser([FromBody] Login user)
        {
            var isValidUser = _dbContext.User.Where(u => u.Email == user.Email && u.Passsword == user.Password).FirstOrDefault();
            if (isValidUser != null)
            {
                //generating and passing token as a string
                return Ok(
                    new JwtService(_configuration)
                    .GenerateToken(
                    isValidUser.UserId,
                    isValidUser.Firstname,
                    isValidUser.Lastname,
                    isValidUser.Email,
                    isValidUser.Mobilenumber,
                    isValidUser.Gender
                    ));
            }
            return Ok("Failed to LoginIn");
        }
    }
}