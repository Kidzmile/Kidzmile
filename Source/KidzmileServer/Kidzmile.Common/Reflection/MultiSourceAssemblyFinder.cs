// --------------------------------------------------------------------------------------------------------------------
// <copyright file="MultiSourceAssemblyFinder.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   The Multi Source Assembly Finder Class
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// The Multi Source Assembly Finder Class
    /// </summary>
    public class MultiSourceAssemblyFinder : IAssemblyFinder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="MultiSourceAssemblyFinder"/> class.
        /// </summary>
        /// <param name="sources">The sources.</param>
        public MultiSourceAssemblyFinder(params IAssemblyFinder[] sources)
        {
            Sources = sources == null
                ? new List<IAssemblyFinder>()
                : sources.ToList();
        }

        /// <summary>
        /// Gets the sources.
        /// </summary>
        /// <value>
        /// The sources.
        /// </value>
        public List<IAssemblyFinder> Sources { get; private set; }

        /// <summary>
        /// This method should return all assemblies used by application.
        /// </summary>
        /// <returns>
        /// List of assemblies
        /// </returns>
        public List<Assembly> GetAllAssemblies()
        {
            var list = new List<Assembly>();

            foreach (var source in Sources)
            {
                list.AddRange(source.GetAllAssemblies());
            }

            return list;
        }
    }
}