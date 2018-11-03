using Kidzmile.Web.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kidzmile.Web.Models;
using Kidzmile.Web.Repository;
using Kidzmile.Common.AutoMapper;
using Kidzmile.Web.Repository.DTO.Product;

namespace Kidzmile.Web.Service
{
    public class ProductDataService : IProductDataService
    {
        private IProductRepository productRepository;
        public ProductDataService()
        {
            productRepository = new ProductRepository();
        }
        public async Task<IList<Product>> GetAllProduct()
        {
            List<Product> product = new List<Product>();
            var allProduct = await productRepository.GetAll();
            return allProduct.MapTo(product);
        }

        public async Task<Product> GetProductBySKUCode(string code)
        {
            Product productdto = new Product();
            var product=await productRepository.GetBySKUCode(code);
            return product.MapTo(productdto);
        }

        public async Task<int> InsertProduct(Product product)
        {
            ProductDTO productDTO = new ProductDTO();
           var productid=await productRepository.InsertAsync(product.MapTo(productDTO));
            return productid;
        }
    }
}
