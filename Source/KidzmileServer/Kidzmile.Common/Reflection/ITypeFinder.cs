// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ITypeFinder.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   The Type Finder Interface
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// The Type Finder Interface
    /// </summary>
    public interface ITypeFinder
    {
        /// <summary>
        /// Finds the specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns>Returns Type Array Value </returns>
        Type[] Find(Func<Type, bool> predicate);

        /// <summary>
        /// Finds all.
        /// </summary>
        /// <returns>Returns Type Array Value </returns>
        Type[] FindAll();
    }
}