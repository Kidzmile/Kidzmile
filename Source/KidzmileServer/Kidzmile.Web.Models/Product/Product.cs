using Kidzmile.Common.AutoMapper;
using Kidzmile.Web.Repository.DTO.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Web.Models
{
    [AutoMapFrom(typeof(ProductDTO))]
    public class Product
    {

        public int? ID { get; set; }
        public string Name { get; set; }
        public string SKUCode { get; set; }
        public int? Units { get; set; }
        public bool IsActive { get; set; }
        public Decimal? PricePerUnit { get; set; }
        public string Color { get; set; }
        public string size { get; set; }
        public string Description { get; set; }
        public string Material { get; set; }

    }
}
