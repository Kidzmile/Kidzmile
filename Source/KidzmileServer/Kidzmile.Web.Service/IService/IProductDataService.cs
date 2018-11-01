using Kidzmile.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Web.Service.IService
{
   public interface IProductDataService
    {
        Task<IList<Product>> GetAllProduct();

        Task<Product> GetProductBySKUCode(string code);
    }
}
