using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Api.ApiErrors
{
    public class InternalServerError : ApiError
    {
        public InternalServerError() : base(500, HttpStatusCode.InternalServerError.ToString())
        {
        }

        public InternalServerError(string Message) : base(500, HttpStatusCode.InternalServerError.ToString(), Message)
        {
        }
    }
}
