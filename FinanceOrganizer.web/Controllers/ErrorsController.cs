using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using FinanceOrganizer.web.Api.ApiErrors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceOrganizer.web.Controllers
{
    [Route("/error")]
    public class ErrorsController : Controller
    {
        [Route("{code}")]
        public IActionResult Error(int code)
        {
            HttpStatusCode parsedCode = (HttpStatusCode)code;
            ApiError error = new ApiError(code, parsedCode.ToString());

            return new JsonResult(error);
        }
    }
}
