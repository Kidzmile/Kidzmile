using Kidzmile.Web.Models;
using Kidzmile.Web.Service;
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

        public ProductController(IProductDataService productDataService)
        {
            this.productDataService = productDataService;
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
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NotFound, "Product with code " + code + " doesnt exist"));
            }
        }

        [HttpPost]
        [Route("InsertAsync")]
        public async Task<IHttpActionResult> InsertProduct([FromBody]Product product)
        {
             int insertedId=await  productDataService.InsertProduct(product);
            if (insertedId!=-1)
            {
                //var message = Request.CreateResponse(HttpStatusCode.Created,product);
               // message.Headers.Location = new Uri(Request.RequestUri+product.ID.ToString());
                return Content(HttpStatusCode.Created,insertedId);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "Product with code " + product.SKUCode + " already exist"));
            }
        }


    }
}
