﻿using Kidzmile.Common.AutoMapper;
using Kidzmile.Web.Repository.DTO;
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

        public int ID { get; set; }
        public string Name { get; set; }
        public string SKUCode { get; set; }
        public int? Units { get; set; }
        public bool IsActive { get; set; }
        public decimal? PricePerUnit { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public decimal? Discount { get; set; }
        public string Description { get; set; }
        public string Material { get; set; }
        public string ImagePath { get; set; }
        public string Category { get; set; }

    }
}
