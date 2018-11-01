using System;
using System.Reflection;
using AutoMapper;
using Kidzmile.Common.Collections.Extensions;
using AutoMapper.Configuration;

namespace Kidzmile.Common.AutoMapper
{
    /// <summary>
    /// The Auto Map Helper Class
    /// </summary>
    public static class AutoMapperHelper
    {
       public static MapperConfigurationExpression cfg = new MapperConfigurationExpression();

        /// <summary>
        /// Creates the map.
        /// </summary>
        /// <param name="type">The type parameter.</param>
        public static void CreateMap(Type type)
        {
            CreateMap<AutoMapFromAttribute>(type);
            CreateMap<AutoMapToAttribute>(type);
            CreateMap<AutoMapAttribute>(type);
        }

        /// <summary>
        /// Creates the map.
        /// </summary>
        /// <typeparam name="TAttribute">The type of the attribute.</typeparam>
        /// <param name="type">The type parameter.</param>
        public static void CreateMap<TAttribute>(Type type)
            where TAttribute : AutoMapAttribute
        {
            if (!type.IsDefined(typeof(TAttribute)))
            {
                return;
            }

            foreach (var autoMapToAttribute in type.GetCustomAttributes<TAttribute>())
            {
                if (autoMapToAttribute.TargetTypes.IsNullOrEmpty())
                {
                    continue;
                }

                

                foreach (var targetType in autoMapToAttribute.TargetTypes)
                {
                    cfg.CreateMap(type, targetType).ReverseMap();

                    //if (autoMapToAttribute.Direction.HasFlag(AutoMapDirection.To))
                    //{
                    //    Mapper.Initialize(cfg => { cfg.CreateMap(type, targetType).ReverseMap(); });
                    //}

                    //if (autoMapToAttribute.Direction.HasFlag(AutoMapDirection.From))
                    //{
                    //    Mapper.Initialize(cfg => { cfg.CreateMap(targetType, type); });
                    //}
                }                
            }
        }
    }
}