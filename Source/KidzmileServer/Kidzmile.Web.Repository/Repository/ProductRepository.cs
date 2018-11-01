using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kidzmile.Web.Repository.DTO.Product;
using Dapper;
using System.Data;

namespace Kidzmile.Web.Repository
{
   public class ProductRepository :BaseAppRepository, IProductRepository
    {
        public async Task<IList<ProductDTO>> GetAll()
        {
            var lstProducts = await base.GetMasterDbConnection().QueryAsync<ProductDTO>("dbo.spProductDetails_Get",
                 commandType: CommandType.StoredProcedure);
            return lstProducts.ToList();
        }

        public async Task<ProductDTO> GetBySKUCode(string code)
        {
            var queryParameters = new DynamicParameters();
            queryParameters.Add("@skucode", code);

            var productDTO= await base.GetMasterDbConnection().QueryFirstOrDefaultAsync<ProductDTO>("dbo.SpProductDetails_GetBySKUCode", param: queryParameters,
                commandType: CommandType.StoredProcedure);
            return productDTO;
        }

        public Task<int> InsertAsync(ProductDTO product)
        {
            throw new NotImplementedException();
        }
    }
}
