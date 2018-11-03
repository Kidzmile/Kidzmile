using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kidzmile.Web.Repository.DTO.Product;
using Dapper;
using System.Data;
using Kidzmile.Common.Uow;

namespace Kidzmile.Web.Repository
{
    public class ProductRepository : BaseAppRepository, IProductRepository
    {
        public ProductRepository(IDatabaseProvider databaseProvider) :base(databaseProvider)
        {

        }

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

            var productDTO = await base.GetMasterDbConnection().QueryFirstOrDefaultAsync<ProductDTO>("dbo.SpProductDetails_GetBySKUCode", param: queryParameters,
                commandType: CommandType.StoredProcedure);
            return productDTO;
        }

        public async Task<int> Insert(ProductDTO productdto)
        {
            var queryParameters = new DynamicParameters();
            queryParameters.Add("@name", productdto.Name);
            queryParameters.Add("@sku_code", productdto.SKUCode);
            queryParameters.Add("@units", productdto.Units);
            queryParameters.Add("@product_active", productdto.IsActive);
            queryParameters.Add("@price_per_unit", productdto.PricePerUnit);
            queryParameters.Add("@color", productdto.Color);
            queryParameters.Add("@size", productdto.Size);
            queryParameters.Add("@product_description", productdto.Description);
            queryParameters.Add("@material", productdto.Material);
            queryParameters.Add("@imagepath", productdto.ImagePath); 
            queryParameters.Add("@id", productdto.ID, dbType: DbType.Int32, direction: ParameterDirection.Output);
            //queryParameters.Add("@statusmessage", "", dbType: DbType.String, direction: ParameterDirection.Output);
            var result = await base.GetMasterDbConnection().ExecuteAsync("dbo.SpProductDetails_Insert", param: queryParameters, commandType: CommandType.StoredProcedure);
            return queryParameters.Get<int>("@id");
        }

        public async Task<bool> Update(ProductDTO productdto)
        {
            var queryParameters = new DynamicParameters();
            queryParameters.Add("@name", productdto.Name);
            queryParameters.Add("@sku_code", productdto.SKUCode);
            queryParameters.Add("@units", productdto.Units);
            queryParameters.Add("@product_active", productdto.IsActive);
            queryParameters.Add("@price_per_unit", productdto.PricePerUnit);
            queryParameters.Add("@color", productdto.Color);
            queryParameters.Add("@size", productdto.Size);
            queryParameters.Add("@product_description", productdto.Description);
            queryParameters.Add("@material", productdto.Material);
            queryParameters.Add("@imagepath", productdto.ImagePath);
            queryParameters.Add("@statusmessage", "", dbType: DbType.String, direction: ParameterDirection.Output);
            queryParameters.Add("@isupdated", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            await base.GetMasterDbConnection().ExecuteAsync("dbo.SpProductDetails_Update", param: queryParameters, commandType: CommandType.StoredProcedure);
            return queryParameters.Get<bool>("@isupdated");
        }

        public async Task<bool> Delete(string code)
        {
            var queryParameters = new DynamicParameters();
            queryParameters.Add("@sku_code", code);
            queryParameters.Add("@statusmessage", "", dbType: DbType.String, direction: ParameterDirection.Output);
            queryParameters.Add("@isdeleted", dbType: DbType.Boolean, direction: ParameterDirection.Output);
            await base.GetMasterDbConnection().ExecuteAsync("dbo.SpProductDelete", param: queryParameters, commandType: CommandType.StoredProcedure);
            return queryParameters.Get<bool>("@isdeleted");
        }
    }
}
