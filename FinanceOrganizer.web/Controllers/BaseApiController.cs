using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceOrganizer.web.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceOrganizer.web.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        protected ApplicationDbContext _context;
        protected JsonSerializerSettings _settings = new Newtonsoft.Json.JsonSerializerSettings
        {
            Formatting = Newtonsoft.Json.Formatting.Indented
        };
        public BaseApiController(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
