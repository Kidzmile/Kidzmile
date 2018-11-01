// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FolderAssemblyFinder.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   The Folder Assembly Finder Class
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// The Folder Assembly Finder Class
    /// </summary>
    public class FolderAssemblyFinder : IAssemblyFinder
    {
        /// <summary>
        /// The sync lock
        /// </summary>
        private readonly object _syncLock = new object();

        /// <summary>
        /// The assemblies
        /// </summary>
        private List<Assembly> _assemblies;

        /// <summary>
        /// Initializes a new instance of the <see cref="FolderAssemblyFinder"/> class.
        /// </summary>
        /// <param name="folderPath">The folder path.</param>
        /// <param name="searchOption">The search option.</param>
        public FolderAssemblyFinder(string folderPath, SearchOption searchOption = SearchOption.TopDirectoryOnly)
        {
            FolderPath = folderPath;
            SearchOption = searchOption;
        }

        /// <summary>
        /// Gets the folder path.
        /// </summary>
        /// <value>
        /// The folder path.
        /// </value>
        public string FolderPath { get; private set; }

        /// <summary>
        /// Gets the search option.
        /// </summary>
        /// <value>
        /// The search option.
        /// </value>
        public SearchOption SearchOption { get; private set; }

        /// <summary>
        /// This method should return all assemblies used by application.
        /// </summary>
        /// <returns>
        /// List of assemblies
        /// </returns>
        public List<Assembly> GetAllAssemblies()
        {
            if (_assemblies == null)
            {
                lock (_syncLock)
                {
                    if (_assemblies == null)
                    {
                        _assemblies = GetAllAssembliesInternal();
                    }
                }
            }

            return _assemblies;
        }

        /// <summary>
        /// Gets all assemblies internal.
        /// </summary>
        /// <returns>Returns List of Assembly</returns>
        private List<Assembly> GetAllAssembliesInternal()
        {
            var assemblies = new List<Assembly>();
            var dllFiles = Directory.GetFiles(FolderPath, "*.dll", SearchOption);

            foreach (string dllFile in dllFiles)
            {
                assemblies.Add(Assembly.LoadFile(dllFile));
            }

            return assemblies;
        }
    }
}