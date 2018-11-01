using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Web;
using System.Web.Http;

namespace Kidzmile.Controllers
{
    public class BaseApiController : ApiController
    {
        public IIdentity  UserIdentity { get; set; }

        public BaseApiController()
        {
            UserIdentity = HttpContext.Current.User.Identity;
        }

        protected HttpContent GetJSONString<T>(T obj) where T : class
        {
            return new StringContent(JsonConvert.SerializeObject(obj),Encoding.UTF8,"application/json");
        }
    }
}
