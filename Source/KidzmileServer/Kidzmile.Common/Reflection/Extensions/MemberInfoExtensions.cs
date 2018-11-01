// --------------------------------------------------------------------------------------------------------------------
// <copyright file="MemberInfoExtensions.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   Extensions to MemberInfo.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Reflection;

namespace Kidzmile.Common.Reflection.Extensions
{
    /// <summary>
    /// Extensions to <see cref="MemberInfo" />.
    /// </summary>
    public static class MemberInfoExtensions
    {
        /// <summary>
        /// Gets a single attribute for a member.
        /// </summary>
        /// <typeparam name="TAttribute">Type of the attribute</typeparam>
        /// <param name="memberInfo">The member that will be checked for the attribute</param>
        /// <param name="inherit">Include inherited attributes</param>
        /// <returns>
        /// Returns the attribute object if found. Returns null if not found.
        /// </returns>
        /// <exception cref="System.ArgumentNullException">memberInfo</exception>
        public static TAttribute GetSingleAttributeOrNull<TAttribute>(this MemberInfo memberInfo, bool inherit)
            where TAttribute : Attribute
        {
            if (memberInfo == null)
            {
                throw new ArgumentNullException("memberInfo");
            }

            var attrs = memberInfo.GetCustomAttributes(typeof(TAttribute), inherit);
            if (attrs.Length > 0)
            {
                return (TAttribute)attrs[0];
            }

            return default(TAttribute);
        }

        /// <summary>
        /// Gets a single attribute for a member.
        /// </summary>
        /// <typeparam name="TAttribute">Type of the attribute</typeparam>
        /// <param name="memberInfo">The member that will be checked for the attribute</param>
        /// <returns>
        /// Returns the attribute object if found. Returns null if not found.
        /// </returns>
        /// <exception cref="System.ArgumentNullException">memberInfo</exception>
        public static TAttribute GetSingleAttributeOrNull<TAttribute>(this MemberInfo memberInfo)
            where TAttribute : Attribute
        {
            bool inherit = true;
            if (memberInfo == null)
            {
                throw new ArgumentNullException("memberInfo");
            }

            var attrs = memberInfo.GetCustomAttributes(typeof(TAttribute), inherit);
            if (attrs.Length > 0)
            {
                return (TAttribute)attrs[0];
            }

            return default(TAttribute);
        }

        /// <summary>
        /// Gets the single attribute of type or base types or null.
        /// </summary>
        /// <typeparam name="TAttribute">The type of the attribute.</typeparam>
        /// <param name="type">The type parameter.</param>
        /// <param name="inherit">if set to <c>true</c> [inherit].</param>
        /// <returns>Returns Object of TAttribute</returns>
        public static TAttribute GetSingleAttributeOfTypeOrBaseTypesOrNull<TAttribute>(this Type type, bool inherit)
            where TAttribute : Attribute
        {
            var attr = type.GetSingleAttributeOrNull<TAttribute>();
            if (attr != null)
            {
                return attr;
            }

            if (type.BaseType == null)
            {
                return null;
            }

            return type.BaseType.GetSingleAttributeOfTypeOrBaseTypesOrNull<TAttribute>(inherit);
        }

        /// <summary>
        /// Gets the single attribute of type or base types or null.
        /// </summary>
        /// <typeparam name="TAttribute">The type of the attribute.</typeparam>
        /// <param name="type">The type parameter.</param>
        /// <returns>Returns Object of TAttribute</returns>
        public static TAttribute GetSingleAttributeOfTypeOrBaseTypesOrNull<TAttribute>(this Type type)
            where TAttribute : Attribute
        {
            bool inherit = true;
            var attr = type.GetSingleAttributeOrNull<TAttribute>();
            if (attr != null)
            {
                return attr;
            }

            if (type.BaseType == null)
            {
                return null;
            }

            return type.BaseType.GetSingleAttributeOfTypeOrBaseTypesOrNull<TAttribute>(inherit);
        }
    }
}