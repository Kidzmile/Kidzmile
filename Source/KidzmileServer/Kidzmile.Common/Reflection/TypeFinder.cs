// --------------------------------------------------------------------------------------------------------------------
// <copyright file="TypeFinder.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   The Type Finder Class
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Kidzmile.Common.Collections.Extensions;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// The Type Finder Class
    /// </summary>
    public class TypeFinder : ITypeFinder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TypeFinder"/> class.
        /// </summary>
        public TypeFinder()
        {
            AssemblyFinder = CurrentDomainAssemblyFinder.Instance;
        }
        /// <summary>
        /// Gets or sets the assembly finder.
        /// </summary>
        /// <value>
        /// The assembly finder.
        /// </value>
        public IAssemblyFinder AssemblyFinder { get; set; }
        

        /// <summary>
        /// Finds the specified predicate.
        /// </summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns>Returns Type Array Value </returns>
        public Type[] Find(Func<Type, bool> predicate)
        {
            return GetAllTypes().Where(predicate).ToArray();
        }

        /// <summary>
        /// Finds all.
        /// </summary>
        /// <returns>Returns Type Array Value </returns>
        public Type[] FindAll()
        {
            return GetAllTypes().ToArray();
        }

        /// <summary>
        /// Gets all types.
        /// </summary>
        /// <returns>Returns Type List</returns>
        private List<Type> GetAllTypes()
        {
            var allTypes = new List<Type>();

            foreach (var assembly in AssemblyFinder.GetAllAssemblies().Distinct())
            {
                try
                {
                    Type[] typesInThisAssembly;

                    try
                    {
                        typesInThisAssembly = assembly.GetTypes();
                    }
                    catch (ReflectionTypeLoadException ex)
                    {
                        typesInThisAssembly = ex.Types;
                    }

                    if (typesInThisAssembly.IsNullOrEmpty())
                    {
                        continue;
                    }

                    allTypes.AddRange(typesInThisAssembly.Where(type => type != null));
                }
                catch (Exception ex)
                {
                }
            }

            return allTypes;
        }
    }
}