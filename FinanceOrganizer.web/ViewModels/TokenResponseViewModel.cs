using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Data.Models
{
    public class TokenResponseViewModel
    {
        #region props
        public string token { get; set; }
        public int expiration { get; set; }
        #endregion
    }
}
