using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceOrganizer.web.Data;
using Microsoft.AspNetCore.Mvc;

namespace FinanceOrganizer.web.Controllers
{
    public class ChartsController : BaseApiController
    {
        public ChartsController(ApplicationDbContext context) : base(context) {}

        [HttpGet("[action]/{from}/{to}")]
        public IActionResult ExpenseBar(string from, string to)
        {
            DateTime toDate = DateTime
                .ParseExact(to, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
            DateTime fromDate = DateTime
                .ParseExact(from, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
            var expenses = this._context.Expenses
                .Where(p => p.CreatedDate >= fromDate && p.CreatedDate <= toDate)
                .Where(p => !p.IsComing);
            return new JsonResult(expenses
                .Select(p => new { CreatedDate = p.CreatedDate, p.Cost }), _settings);
        }
    }
}
