﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data.Models
{
    public class ApplicationUser
    {
        public ApplicationUser() 
        {
            Expenses = new List<Expense>();
            MonthLimits = new List<MonthLimit>();
        }
        [Required]
        public string Id { get; set; }
        [Required]
        [MaxLength(190)]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }

        public virtual IEnumerable<Expense> Expenses { get; set; }
        public virtual IEnumerable<MonthLimit> MonthLimits { get; set; }
    }
}
