using Kidzmile.Web.Repository.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Web.Repository
{
   public interface ICategoryRepository
    {
      Task<IList<CategoryDTO>>  GetAllCategory();

      Task<List<string>> GetImagesBySKUCode(string code);
    }
}

