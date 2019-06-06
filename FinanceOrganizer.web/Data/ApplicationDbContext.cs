using FinanceOrganizer.web.Data.Models;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data
{
    public class ApplicationDbContext : DbContext
    {

        #region constructor
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { } 
        #endregion

        #region properties
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<MonthLimit> Limits { get; set; }
        #endregion

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().HasMany(p => p.Expenses).WithOne(p => p.ApplicationUser);
            modelBuilder.Entity<ApplicationUser>().HasMany(p => p.MonthLimits).WithOne(p => p.ApplicationUser);

            modelBuilder.Entity<ExpensePosition>().ToTable("ExpensePosition");
            modelBuilder.Entity<ExpensePosition>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ExpensePosition>().HasOne(p => p.Expense).WithMany(p => p.ExpensePositions);

            modelBuilder.Entity<Expense>().ToTable("Expense");
            modelBuilder.Entity<Expense>().HasMany(p => p.ExpensePositions).WithOne(p => p.Expense);
            modelBuilder.Entity<Expense>().HasOne(p => p.ApplicationUser).WithMany(p => p.Expenses);

        }
        #endregion
    }
}
