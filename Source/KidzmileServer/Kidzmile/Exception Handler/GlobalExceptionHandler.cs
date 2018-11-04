using System.Net;
using System.Security;
using System.Web.Http.ExceptionHandling;

namespace Kidzmile.Exception_Handler
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            //add logger here
            // Trace.WriteLine(context.Exception.Message);

            context.Result = new ExceptionResponse
            {
                statusCode = context.Exception is SecurityException ? HttpStatusCode.Unauthorized : HttpStatusCode.InternalServerError,
                message = "An internal exception occurred.",
                request = context.Request
            };
        }

        public override bool ShouldHandle(ExceptionHandlerContext context)
        {
            return true;
        }

    }
}