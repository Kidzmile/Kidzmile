using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kidzmile.Models
{
    public class UserInfo
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool isUserAuthenticated { get; set; }
        public DateTime LastLoggedInTS { get; set; }
        
    }
}