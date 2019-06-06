using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class MonthLimitViewModel
    {

        public int id { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public double Limit { get; set; }

        public string UserId { get; set; }
    }
}
