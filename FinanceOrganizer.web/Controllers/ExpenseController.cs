using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceOrganizer.web.Data;
using FinanceOrganizer.web.Data.Models;
using FinanceOrganizer.web.ViewModels;
using Mapster;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinanceOrganizer.web.Controllers
{
    // GET: api/<controller>
    public class ExpenseController : BaseApiController
    {
        #region constructor
        public ExpenseController(ApplicationDbContext context) :base(context) {}
        #endregion

        #region methods
        [HttpGet("all/{userName}")]
        public IActionResult All(string userName)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(p => p.UserName == userName);
            if (user == null) return NotFound(); 
            var expenses = _context.Expenses.Where(p => p.UserId == user.Id).ToArray();
            return new JsonResult(expenses.Adapt<ExpenseViewModel[]>(), _settings);
        }

        [HttpGet("{userName}/dates")]
        public IActionResult Dates(string userName)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(p => p.UserName == userName);
            if (user == null) return NotFound();
            var expDates = _context.Expenses
                .Where(p => p.UserId == user.Id)
                .Select(p => p.CreatedDate.Date)
                .Distinct()
                .ToArray();
            return new JsonResult(expDates, _settings);
        }

        [HttpGet("{userName}/dates/{date}")]
        public IActionResult Date(string userName, string date)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(p => p.UserName == userName);
            if (user == null) return NotFound();
            var time = DateTime.ParseExact(date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            var expenses = _context
                .Expenses
                .Where(p => p.UserId == user.Id)
                .Where(p =>
                    p.CreatedDate.Date.Equals(time.Date))
                .ToArray();
            return new JsonResult(expenses.Adapt<ExpenseViewModel[]>(), _settings);
        }
        #endregion

        #region REST methods
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var expense = _context.Expenses.Where(p => p.Id == id).FirstOrDefault();
            if (expense == null) return NotFound(new {
                Error = $"Has no Expense which has id {id}"
            });

            return new JsonResult(expense.Adapt<ExpenseViewModel>(), _settings);
        }

        [HttpPut]
        public IActionResult Put([FromBody]ExpenseViewModel model)
        {
            //Якщо model = null поверни помилку сервера
            if (model == null) return StatusCode(500);

            Expense expense = new Expense();
            expense.Cost = model.Cost;
            expense.Id = Guid.NewGuid().ToString();
            expense.Name = model.Name;
            expense.IsComing = model.IsComing;
            expense.UserId = _context.ApplicationUsers.Where(p => p.UserName == "Admin").FirstOrDefault().Id;
            expense.CreatedDate = DateTime.Now;
            expense.LastModifiedDate = expense.CreatedDate;
            _context.Add(expense);
            _context.SaveChanges();
            return new JsonResult(expense.Adapt<ExpenseViewModel>(), _settings);
        }

        [HttpPost]
        public IActionResult Post([FromBody]ExpenseViewModel model)
        {
            if (model == null) return StatusCode(500);

            var expense = _context.Expenses.Where(p => p.Id == model.Id).FirstOrDefault();
            if (expense == null) return NotFound();
            expense.IsComing = model.IsComing;
            expense.Cost = model.Cost;
            expense.Name = model.Name;
            expense.LastModifiedDate = DateTime.Now;
            _context.Expenses.Update(expense);
            _context.SaveChanges();

            return new JsonResult(model, _settings); 
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var expense = _context.Expenses.Where(p => p.Id == id).FirstOrDefault();
            if (expense == null) return NotFound();
            _context.Expenses.Remove(expense);
            return new NoContentResult();
        }
        #endregion
    }
}
