using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kidzmile.Web.Repository.DTO;
using Dapper;
using System.Data;
using Kidzmile.Common.Uow;

namespace Kidzmile.Web.Repository
{
    public class CategoryRepository : BaseAppRepository, ICategoryRepository
    {
        public CategoryRepository(IDatabaseProvider databaseProvider) : base(databaseProvider)
        {

        }
        public async Task<IList<CategoryDTO>> GetAllCategory()
        {
            var lstCategory = await base.GetMasterDbConnection().QueryAsync<CategoryDTO>("dbo.SpCategory_Get",
               commandType: CommandType.StoredProcedure);
            return lstCategory.ToList();
        }

        public async Task<List<string>> GetImagesBySKUCode(string code)
        {
            var queryParameters = new DynamicParameters();
            queryParameters.Add("@skucode", code);

            var lstImages = await base.GetMasterDbConnection().QueryAsync<string>("dbo.SpProductImages_GetBySKUCode", param: queryParameters,commandType: CommandType.StoredProcedure);
            return lstImages.ToList();
        }
    }
}
