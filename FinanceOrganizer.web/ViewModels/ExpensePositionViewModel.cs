using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ExpensePositionViewModel
    {
        public int Id { get; set; }

        public int Name { get; set; }

        public int Cost { get; set; }

        public string ExpenseId { get; set; }
    }
}
