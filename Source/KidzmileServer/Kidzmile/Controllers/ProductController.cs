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
        public async Task<IHttpActionResult> GetAll()
        {
            var lstPrdoucts = await productDataService.GetAll();
            return Ok(lstPrdoucts);
            //had to comment because no content is not sending any response.
            /* if (lstPrdoucts.Count > 0)
             {
            return Ok(lstPrdoucts);
             }
             else
             {
                 return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.NoContent, "Product List isEmpty"));
             }*/

        }

        [HttpGet]
        [Route("GetAsync/code")]
        public async Task<IHttpActionResult> GetBySKUCode(string code)
        {
            var product = await productDataService.GetBySKUCode(code);
            if (product != null)
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
        public async Task<IHttpActionResult> Insert([FromBody]Product product)
        {
            int insertedId = await productDataService.Insert(product);
            if (insertedId != -1)
            {
                //var message = Request.CreateResponse(HttpStatusCode.Created,product);
                // message.Headers.Location = new Uri(Request.RequestUri+product.ID.ToString());
                return Content(HttpStatusCode.Created, insertedId);
            }
            else
            {
                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.Conflict, "Product with code " + product.SKUCode + " already exist"));
            }
        }

        [HttpPut]
        [Route("UpdateAsync")]
        public async Task<IHttpActionResult> Update([FromBody]Product product)
        {
            bool isUpdate = await productDataService.Update(product);
            if (isUpdate)
            {
                return Ok(HttpStatusCode.Created);
            }
            else
            {

                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Product with code " + product.SKUCode + " doesnt exist"));
            }
        }

        [HttpDelete]
        [Route("DeleteAsync")]
        public async Task<IHttpActionResult> Delete(string code)
        {
            bool isDeleted = await productDataService.Delete(code);
            if (isDeleted)
            {
                return Ok(HttpStatusCode.OK);
            }
            else
            {

                return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Product with code " + code + " didnt get deleted"));
            }
        }


    }
}
