using Kidzmile.Web.Models;
using Kidzmile.Web.Service;
using Kidzmile.Web.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Kidzmile.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : BaseApiController
    {
        private IProductDataService productDataService;

        public ProductController()
        {
            productDataService = new ProductDataService();
        }
     
        [Route("GetAsync")]   
        public async Task<IList<Product>> GetAllProduct()
        {
           return await productDataService.GetAllProduct();
        }

        [Route("GetAsync/code")]
        public async Task<Product> GetProductByCode(string code)
        {
            var product= await productDataService.GetProductBySKUCode(code);
            return product;
        }
    }
}
