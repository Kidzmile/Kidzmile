using Kidzmile.Common.AutoMapper;
using Kidzmile.Web.Repository.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Kidzmile.Web.Models
{
    [AutoMapFrom(typeof(CategoryDTO))]
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public List<Product> product { get; set; }
    }
}
