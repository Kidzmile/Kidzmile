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
     
         [HttpGet]
        [Route("GetAsync")]   
        public async Task<IHttpActionResult> GetAllProduct()
        {
            var lstPrdoucts = await productDataService.GetAllProduct();
            if (lstPrdoucts.Count > 0)
            {
                return Ok(lstPrdoucts);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NoContent, "Product List isEmpty"));
            }
            
        }

        [HttpGet]
        [Route("GetAsync/code")]
        public async Task<IHttpActionResult> GetProductByCode(string code)
        {
            var product= await productDataService.GetProductBySKUCode(code);
            if (product!=null)
            {
                return Ok(product);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NoContent, "Product with code " + code + " doesnt exist"));
            }
        }
    }
}
