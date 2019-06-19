using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data.Models
{
    public class Expense
    {
        
        public Expense()
        {
            ExpensePositions = new List<ExpensePosition>();
        }
        [Key]
        [Required]
        public string Id { get; set; }
        [Required]
        [DefaultValue(0.0)]
        public double Cost { get; set; }
        [Required]
        [MaxLength(120)]
        public string Name { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        [Required]
        public DateTime LastModifiedDate { get; set; }
        [Required]
        [DefaultValue(false)]
        public bool IsComing { get; set; }

        public string UserId { get; set; }

        [NotMapped]
        public string Path => "/Files/" + Id + ".jpg"; 

        public virtual IEnumerable<ExpensePosition> ExpensePositions { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
