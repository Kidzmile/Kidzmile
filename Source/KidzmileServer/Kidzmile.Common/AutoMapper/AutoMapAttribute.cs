using System;
using System.Collections.Generic;
using System.Linq;

namespace Kidzmile.Common.AutoMapper
{
    /// <summary>
    /// The Auto Map Attribute Class
    /// </summary>
    public class AutoMapAttribute : Attribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoMapAttribute"/> class.
        /// </summary>
        /// <param name="targetTypes">The target types.</param>
        public AutoMapAttribute(params Type[] targetTypes)
        {
            TargetTypes = targetTypes.ToArray();
        }

        /// <summary>
        /// Gets the target types.
        /// </summary>
        /// <value>
        /// The target types.
        /// </value>
        public IList<Type> TargetTypes { get; private set; }

        /// <summary>
        /// Gets the direction.
        /// </summary>
        /// <value>
        /// The direction.
        /// </value>
        internal virtual AutoMapDirection Direction
        {
            get { return AutoMapDirection.From | AutoMapDirection.To; }
        }
    }
}