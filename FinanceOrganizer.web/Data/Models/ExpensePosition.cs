using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data.Models
{
    public class ExpensePosition
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int Name { get; set; }
        [Required]
        public int Cost { get; set; }
        [Required]
        public string ExpenseId { get; set; }
        [ForeignKey("ExpenseId")]
        public virtual Expense Expense { get; set; }
    }
}
