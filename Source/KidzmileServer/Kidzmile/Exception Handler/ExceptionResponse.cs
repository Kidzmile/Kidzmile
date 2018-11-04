using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Kidzmile.Exception_Handler
{
    public class ExceptionResponse : IHttpActionResult
    {
        public HttpStatusCode statusCode { get; set; }
        public string message { get; set; }
        public HttpRequestMessage request { get; set; }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage(statusCode);
            response.RequestMessage = request;
            response.Content = new StringContent(message);
            return Task.FromResult(response);
        }
    }
}