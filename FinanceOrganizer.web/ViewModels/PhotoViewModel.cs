using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.ViewModels
{
    public class PhotoViewModel
    {
        public string ExpenseId { get; set; }
        public IFormFile PhotoFile { get; set; }
    }
}
