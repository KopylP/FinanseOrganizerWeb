using FinanceOrganizer.web.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.ApplicationUsers.Any()) CreateUsers(context);
            if (!context.Expenses.Any()) CreateExpenses(context);
        }
        private static void CreateUsers(ApplicationDbContext context)
        {
            ApplicationUser user = new ApplicationUser
            {
                UserName = "Admin",
                Email = "email@admin.com",
                Id = Guid.NewGuid().ToString(),
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            };
            context.ApplicationUsers.Add(user);
            context.SaveChanges();
        }
        private static void CreateExpenses(ApplicationDbContext context)
        {
            var user = context.ApplicationUsers.Where(p => p.UserName == "Admin").FirstOrDefault();
            Expense expense = new Expense
            {
                Cost = 2.5,
                IsComing = false,
                Id = Guid.NewGuid().ToString(),
                Name = "Lidl",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now,
                UserId = user.Id
            };
            for(int i = 1; i < 20; i++)
            {
                for(int j = 1; j < 5; j++)
                {
                    var exp = new Expense
                    {
                        Cost = 2.5*i/j,
                        IsComing = j%2==0,
                        Id = Guid.NewGuid().ToString(),
                        Name = "Simple Name " + i + "" + j,
                        CreatedDate = DateTime.Now.AddDays(-i),
                        LastModifiedDate = DateTime.Now.AddDays(-i),
                        UserId = user.Id
                    };
                    context.Expenses.Add(exp);
                }
            }
            context.Add(expense);
            context.SaveChanges();
        }
    }
}
