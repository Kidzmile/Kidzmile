using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Web.Repository.DTO
{
   public class CategoryDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public List<ProductDTO> products { get; set; }
    }
}
