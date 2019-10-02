using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FinanceOrganizer.web.Api.ApiErrors;
using FinanceOrganizer.web.Data;
using FinanceOrganizer.web.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceOrganizer.web.Controllers
{
    public class TokenController : BaseApiController
    {
        #region fields
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private IConfiguration _configuration; 
        #endregion

        #region constructor
        public TokenController(ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration): base(context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        #endregion

        [HttpPost("Auth")]
        public async Task<IActionResult> Auth([FromBody]TokenRequestViewModel model)
        {
            if (model == null) return StatusCode(500, new InternalServerError("Model is null"));
            switch(model.grant_type)
            {
                case "password":
                    return await GetToken(model);
                default:
                    return new UnauthorizedResult();
            }
        }

        private async Task<IActionResult> GetToken(TokenRequestViewModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.username);
                if (user == null && !model.username.Contains("@"))
                {
                    user = await _userManager.FindByEmailAsync(model.username);
                    if (user == null || !await _userManager.CheckPasswordAsync(user, model.password))
                    {
                        return new UnauthorizedResult();
                    }
                }
                    DateTime now = DateTime.Now;

                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString())
                    };
                    var tokenExpirationMins =
                        _configuration.GetValue<int>("Auth:Jwt:TokenExpirationInMinutes");
                    var issuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"])
                        );
                    var token = new JwtSecurityToken(
                            issuer: _configuration["Auth:Jwt:Issuer"],
                            audience: _configuration["Auth:Jwt:Audience"],
                            claims: claims,
                            notBefore: now,
                            expires: now.Add(TimeSpan.FromMinutes(tokenExpirationMins)),
                            signingCredentials: new SigningCredentials(issuerSigningKey, SecurityAlgorithms.HmacSha256));
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                    var response = new TokenResponseViewModel()
                    {
                        token = encodedToken,
                        expiration = tokenExpirationMins
                    };
                    return Json(response);
            }
            catch(Exception ex)
            {
                return new UnauthorizedResult();
            }
        }
    }
}
