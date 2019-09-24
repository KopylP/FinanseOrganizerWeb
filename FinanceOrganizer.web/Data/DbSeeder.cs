using FinanceOrganizer.web.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userMenager, RoleManager<IdentityRole> roleManager)
        {
            if (!context.Users.Any()) await CreateUsersAsync(context, userMenager, roleManager);
            if (!context.Expenses.Any()) CreateExpenses(context);
        }
        private static async Task CreateUsersAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            string role_Administrator = "Admin";
            string role_RegisteredUser = "User";

            async Task createdRolesAsync()
            {
                if (!await roleManager.RoleExistsAsync(role_Administrator))
                {
                    await roleManager.CreateAsync(new IdentityRole(role_Administrator));
                }

                if (!await roleManager.RoleExistsAsync(role_RegisteredUser))
                {
                    await roleManager.CreateAsync(new IdentityRole(role_RegisteredUser));
                }
            }

            createdRolesAsync().GetAwaiter().GetResult();
            context.SaveChanges();
            ApplicationUser user = new ApplicationUser
            {
                UserName = "Admin",
                Email = "email@admin.com",
                SecurityStamp = Guid.NewGuid().ToString(),
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            };
            user.EmailConfirmed = true;
            user.LockoutEnabled = false;
            if (await userManager.FindByNameAsync(user.UserName) == null)
            {
                await userManager.CreateAsync(user, "Pass4Admin");
                await userManager.AddToRoleAsync(user, role_RegisteredUser);
                await userManager.AddToRoleAsync(user, role_Administrator);
            }
            context.SaveChanges();
        }
        private static void CreateExpenses(ApplicationDbContext context)
        {
            var user = context.Users.Where(p => p.UserName == "Admin").FirstOrDefault();
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
