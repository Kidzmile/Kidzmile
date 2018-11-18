using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Web.Repository.DTO.Product
{
    public class ProductDTO
    {
        public int? ID { get; set; }
        public string Name { get; set; }
        public string SKUCode { get; set; }
        public int? Units { get; set; }
        public bool IsActive { get; set; }
        public Decimal? PricePerUnit { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public string Description { get; set; }
        public string Material { get; set; }
        public string ImagePath { get; set; }
        public string Category { get; set; }

    }
}
