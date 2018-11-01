using System;

namespace Kidzmile.Common.AutoMapper
{
    /// <summary>
    /// The Auto Map To Attribute Class
    /// </summary>
    public class AutoMapToAttribute : AutoMapAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="AutoMapToAttribute"/> class.
        /// </summary>
        /// <param name="targetTypes">The target types.</param>
        public AutoMapToAttribute(params Type[] targetTypes)
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
            get { return AutoMapDirection.To; }
        }
    }
}