// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IAssemblyFinder.cs" company="EPAM Systems">
//   Copyright 2016
// </copyright>
// <summary>
//   This interface is used to get all assemblies to investigate special classes such as NextGen modules.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using System.Reflection;

namespace Kidzmile.Common.Reflection
{
    /// <summary>
    /// This interface is used to get all assemblies to investigate special classes
    /// such as NextGen modules.
    /// </summary>
    public interface IAssemblyFinder
    {
        /// <summary>
        /// This method should return all assemblies used by application.
        /// </summary>
        /// <returns>
        /// List of assemblies
        /// </returns>
        List<Assembly> GetAllAssemblies();
    }
}