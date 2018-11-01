using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kidzmile.Common.AutoMapper;
using Kidzmile.Common.Collections;
using Kidzmile.Common.Reflection;
using System.Reflection;
using AutoMapper;

namespace Kidzmile.Common.AutoMapper
{
    public interface IAutoMapperResolver
    {

    }
    public class AutoMapperResolver: IAutoMapperResolver
    {
        private readonly ITypeFinder _typeFinder;

        public AutoMapperResolver(ITypeFinder typeFinder)
        {
            _typeFinder = typeFinder;
            FindAndAutoMapTypes();
        }

        private void FindAndAutoMapTypes()
        {
            var types = _typeFinder.Find(type =>
                type.IsDefined(typeof(AutoMapAttribute)) ||
                type.IsDefined(typeof(AutoMapFromAttribute)) ||
                type.IsDefined(typeof(AutoMapToAttribute))
                );

            foreach (var type in types)
            {
                AutoMapperHelper.CreateMap(type);
            }
            Mapper.Initialize(AutoMapperHelper.cfg);
        }
    }
}
