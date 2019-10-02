using System;
using System.Net;

namespace FinanceOrganizer.web.Api.ApiErrors
{
    public class NotFoundError: ApiError
    {
        public NotFoundError(): base(404, HttpStatusCode.NotFound.ToString())
        {

        }

        public NotFoundError(string Message) : base(404, HttpStatusCode.NotFound.ToString(), Message)
        {

        }
    }
}
