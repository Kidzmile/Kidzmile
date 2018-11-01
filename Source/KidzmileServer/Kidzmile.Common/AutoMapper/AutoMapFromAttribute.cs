using System;

namespace Kidzmile.Common.AutoMapper
{
    /// <summary>
    /// The Auto Map From Attribute Class
    /// </summary>
    public class AutoMapFromAttribute : AutoMapAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoMapFromAttribute"/> class.
        /// </summary>
        /// <param name="targetTypes">The target types.</param>
        public AutoMapFromAttribute(params Type[] targetTypes)
            : base(targetTypes)
        { }

        /// <summary>
        /// Gets the direction.
        /// </summary>
        /// <value>
        /// The direction.
        /// </value>
        internal override AutoMapDirection Direction
        {
            get { return AutoMapDirection.From; }
        }
    }
}