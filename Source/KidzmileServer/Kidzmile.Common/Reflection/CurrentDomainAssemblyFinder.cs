// --------------------------------------------------------------------------------------------------------------------
// <copyright file="CurrentDomainAssemblyFinder.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   Default implementation of <see cref="IAssemblyFinder" />.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// Default implementation of <see cref="IAssemblyFinder" />.
    /// If gets assemblies from current domain.
    /// </summary>
    public class CurrentDomainAssemblyFinder : IAssemblyFinder
    {
        /// <summary>
        /// The singleton instance
        /// </summary>
        private static readonly CurrentDomainAssemblyFinder SingletonInstance = new CurrentDomainAssemblyFinder();

        /// <summary>
        /// Gets Singleton instance of <see cref="CurrentDomainAssemblyFinder" />.
        /// </summary>
        /// <value>
        /// The instance.
        /// </value>
        public static CurrentDomainAssemblyFinder Instance { get { return SingletonInstance; } }
        
        /// <summary>
        /// This method should return all assemblies used by application.
        /// </summary>
        /// <returns>
        /// List of assemblies
        /// </returns>
        public List<Assembly> GetAllAssemblies()
        {
            return AppDomain.CurrentDomain.GetAssemblies().ToList();
        }
    }
}