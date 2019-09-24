using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data.Models
{
    public class TokenRequestViewModel
    {
        #region constructor
        public TokenRequestViewModel() { }
        #endregion

        #region properties
        public string grant_type { get; set; }
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        #endregion
    }
}
