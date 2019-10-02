using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceOrganizer.web.Api.ApiErrors
{
    public class ApiError
    {
        public int StatusCode { get; private set; }

        public string StatusDescription { get; set; }

        [JsonProperty(DefaultValueHandling = DefaultValueHandling.Ignore)]
        public string Message { get; private set; }

        public ApiError(int StatusCode, string StatusDescription)
        {
            this.StatusCode = StatusCode;
            this.StatusDescription = StatusDescription;
        }

        public ApiError(int StatusCode, string StatusDescription, string Message): this(StatusCode, StatusDescription)
        {
            this.Message = Message;
        }
    }
}
