using Kidzmile.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Kidzmile.Web.Service
{
   public interface ICategoryDataService
    {
        Task<IList<Category>> GetAll();
    }
}
