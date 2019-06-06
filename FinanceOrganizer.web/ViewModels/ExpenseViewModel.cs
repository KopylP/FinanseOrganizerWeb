using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ExpenseViewModel
    {
        public string Id { get; set;}

        public double Cost { get; set; }

        public string Name { get; set; }

        public DateTime CreatedDate { get; set; }
        [JsonIgnore]
        public DateTime LastModifiedDate { get; set; }

        [DefaultValue(false)]
        public bool IsComing { get; set; }

        public string UserId { get; set; }
    }
}
