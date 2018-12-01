using System.Collections.Generic;
using System.Threading.Tasks;
using Kidzmile.Web.Models;
using Kidzmile.Web.Repository;
using Kidzmile.Common.AutoMapper;
using Kidzmile.Web.Repository.DTO;
using System;

namespace Kidzmile.Web.Service
{
   public class CategoryDataService : ICategoryDataService
    {
        private ICategoryRepository _categoryRepository;
        public CategoryDataService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<IList<Category>> GetAll()
        {
            List<Category> categories = new List<Category>();

            var allCategory = await _categoryRepository.GetAllCategory();

            return allCategory.MapTo(categories);
        }

        public async Task<List<string>> GetImagesPath(string code)
        {
            List<string> listOfImages = await _categoryRepository.GetImagesBySKUCode(code);
            return listOfImages;
        }
    }
}
