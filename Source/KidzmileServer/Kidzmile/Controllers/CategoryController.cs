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
    [RoutePrefix("api/category")]
    public class CategoryController : BaseApiController
    {
        private ICategoryDataService _categoryDataService;

        public CategoryController(ICategoryDataService categoryDataService)
        {
            _categoryDataService=categoryDataService;
        }
        [HttpGet]
        [Route("GetAsync")]
        public async Task<IHttpActionResult>  GetAsync()
        {
           var categories= await _categoryDataService.GetAll();
            return Ok(categories);
        }
    }
}
