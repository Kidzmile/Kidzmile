// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TypeHelper.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   Some simple type-checking methods used internally.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Net.Configuration;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// Some simple type-checking methods used internally.
    /// </summary>
    internal static class TypeHelper
    {
        /// <summary>
        /// Determines whether the specified object is function.
        /// </summary>
        /// <param name="obj">The object parameter.</param>
        /// <returns>Returns Boolean Value</returns>
        public static bool IsFunc(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            var type = obj.GetType();
            if (!type.IsGenericType)
            {
                return false;
            }

            return type.GetGenericTypeDefinition() == typeof(Func<>);
        }

        /// <summary>
        /// Determines whether the specified object is function.
        /// </summary>
        /// <typeparam name="TReturn">The type of the return.</typeparam>
        /// <param name="obj">The object parameter.</param>
        /// <returns>Returns Boolean Value</returns>
        public static bool IsFunc<TReturn>(object obj)
        {
            return obj != null && obj.GetType() == typeof(Func<TReturn>);
        }

        /// <summary>
        /// Determines whether [is primitive extended including nullable] [the specified type].
        /// </summary>
        /// <param name="type">The type parameter.</param>
        /// <returns>Returns Boolean Value</returns>
        public static bool IsPrimitiveExtendedIncludingNullable(Type type)
        {
            if (IsPrimitiveExtended(type))
            {
                return true;
            }

            if (type.IsGenericType && type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return IsPrimitiveExtended(type.GenericTypeArguments[0]);
            }

            return false;
        }

        /// <summary>
        /// Determines whether [is primitive extended] [the specified type].
        /// </summary>
        /// <param name="type">The type parameter.</param>
        /// <returns>Returns Boolean Value</returns>
        private static bool IsPrimitiveExtended(Type type)
        {
            if (type.IsPrimitive)
            {
                return true;
            }

            return type == typeof(string) ||
                   type == typeof(decimal) ||
                   type == typeof(DateTime) ||
                   type == typeof(DateTimeOffset) ||
                   type == typeof(TimeSpan) ||
                   type == typeof(Guid);
        }
    }
}
