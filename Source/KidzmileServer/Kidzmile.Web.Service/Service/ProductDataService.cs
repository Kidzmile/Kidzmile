using System.Collections.Generic;
using System.Threading.Tasks;
using Kidzmile.Web.Models;
using Kidzmile.Web.Repository;
using Kidzmile.Common.AutoMapper;
using Kidzmile.Web.Repository.DTO.Product;
using System;

namespace Kidzmile.Web.Service
{
    public class ProductDataService : IProductDataService
    {
        private IProductRepository productRepository;
        public ProductDataService(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }
        public async Task<IList<Product>> GetAll()
        {
            List<Product> product = new List<Product>();
            var allProduct = await productRepository.GetAll();
            return allProduct.MapTo(product);
        }

        public async Task<Product> GetBySKUCode(string code)
        {
            Product productdto = new Product();
            var product = await productRepository.GetBySKUCode(code);
            return product.MapTo(productdto);
        }

        public async Task<int> Insert(Product product)
        {
            ProductDTO productDTO = new ProductDTO();
            int productid = await productRepository.Insert(product.MapTo(productDTO));
            return productid;
        }

        public async Task<bool> Update(Product product)
        {
            ProductDTO productDTO = new ProductDTO();
           bool isUpdated= await productRepository.Update(product.MapTo(productDTO));
            return isUpdated;
        }
    }
}
