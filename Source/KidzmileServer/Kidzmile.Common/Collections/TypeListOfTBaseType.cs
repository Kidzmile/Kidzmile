using System;
using System.Collections;
using System.Collections.Generic;

namespace Kidzmile.Common.Collections
{
    /// <summary>
    /// Extends <see cref="List{Type}" /> to add restriction a specific base type.
    /// </summary>
    /// <typeparam name="TBaseType">Base Type of <see cref="Type" />s in this list</typeparam>
    public class TypeList<TBaseType> : ITypeList<TBaseType>
    {
        /// <summary>
        /// The type list
        /// </summary>
        private readonly List<Type> typeList;

        /// <summary>
        ///  Initializes a new instance of the <see cref="TypeList{TBaseType}" /> class.
        /// </summary>
        public TypeList()
        {
            typeList = new List<Type>();
        }

        /// <summary>
        /// Gets the count.
        /// </summary>
        /// <value>
        /// The count value.
        /// </value>
        public int Count { get { return typeList.Count; } }

        /// <summary>
        /// Gets a value indicating whether this instance is read only.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance is read only; otherwise, <c>false</c>.
        /// </value>
        public bool IsReadOnly { get { return false; } }

        /// <summary>
        /// Gets or sets the <see cref="Type" /> at the specified index.
        /// </summary>
        /// <value>
        /// The <see cref="Type"/>.
        /// </value>
        /// <param name="index">Index parameter.</param>
        /// <returns>Returns Object of Type</returns>
        public Type this[int index]
        {
            get { return typeList[index]; }
            set
            {
                CheckType(value);
                typeList[index] = value;
            }
        }

        /// <summary>
        /// Adds a type to list.
        /// </summary>
        /// <typeparam name="T">Type parameter</typeparam>
        /// <inheritdoc />
        public void Add<T>() where T : TBaseType
        {
            typeList.Add(typeof(T));
        }

        /// <summary>
        /// Adds the specified item.
        /// </summary>
        /// <param name="item">The item parameter.</param>
        /// <inheritdoc />
        public void Add(Type item)
        {
            CheckType(item);
            typeList.Add(item);
        }

        /// <summary>
        /// Inserts the specified index.
        /// </summary>
        /// <param name="index">The index parameter.</param>
        /// <param name="item">The item parameter.</param>
        /// <inheritdoc />
        public void Insert(int index, Type item)
        {
            typeList.Insert(index, item);
        }

        /// <summary>
        /// Indexes the of.
        /// </summary>
        /// <param name="item">The item parameter.</param>
        /// <returns>Returns Integer Value</returns>
        /// <inheritdoc />
        public int IndexOf(Type item)
        {
            return typeList.IndexOf(item);
        }

        /// <summary>
        /// Checks if a type exists in the list.
        /// </summary>
        /// <typeparam name="T">Type parameter</typeparam>
        /// <returns>Returns Boolean Value</returns>
        /// <inheritdoc />
        public bool Contains<T>() where T : TBaseType
        {
            return Contains(typeof(T));
        }

        /// <summary>
        /// Determines whether [contains] [the specified item].
        /// </summary>
        /// <param name="item">The item parameter.</param>
        /// <returns>Returns Boolean Value</returns>
        /// <inheritdoc />
        public bool Contains(Type item)
        {
            return typeList.Contains(item);
        }

        /// <summary>
        /// Removes a type from list
        /// </summary>
        /// <typeparam name="T">type of collection to remove</typeparam>
        /// <inheritdoc />
        public void Remove<T>() where T : TBaseType
        {
            typeList.Remove(typeof(T));
        }

        /// <summary>
        /// Removes the specified item.
        /// </summary>
        /// <param name="item">The item parameter.</param>
        /// <returns>Returns Boolean Value</returns>
        /// <inheritdoc />
        public bool Remove(Type item)
        {
            return typeList.Remove(item);
        }

        /// <summary>
        /// Removes at.
        /// </summary>
        /// <param name="index">The index parameter.</param>
        /// <inheritdoc />
        public void RemoveAt(int index)
        {
            typeList.RemoveAt(index);
        }

        /// <summary>
        /// Removes all items from the <see cref="T:System.Collections.Generic.ICollection`1" />.
        /// </summary>
        /// <inheritdoc />
        public void Clear()
        {
            typeList.Clear();
        }

        /// <summary>
        /// Copies to.
        /// </summary>
        /// <param name="array">The array parameter.</param>
        /// <param name="arrayIndex">Index of the array.</param>
        /// <inheritdoc />
        public void CopyTo(Type[] array, int arrayIndex)
        {
            typeList.CopyTo(array, arrayIndex);
        }

        /// <summary>
        /// Returns an enumerator that iterates through the collection.
        /// </summary>
        /// <returns>
        /// An enumerator that can be used to iterate through the collection.
        /// </returns>
        /// <inheritdoc />
        public IEnumerator<Type> GetEnumerator()
        {
            return typeList.GetEnumerator();
        }

        /// <summary>
        /// Returns an enumerator that iterates through a collection.
        /// </summary>
        /// <returns>
        /// An <see cref="T:System.Collections.IEnumerator" /> object that can be used to iterate through the collection.
        /// </returns>
        IEnumerator IEnumerable.GetEnumerator()
        {
            return typeList.GetEnumerator();
        }

        /// <summary>
        /// Checks the type.
        /// </summary>
        /// <param name="item">The item parameter.</param>
        /// <exception cref="System.ArgumentException">Given item is not type of  + typeof(TBaseType).AssemblyQualifiedName;item</exception>
        private static void CheckType(Type item)
        {
            if (!typeof(TBaseType).IsAssignableFrom(item))
            {
                throw new ArgumentException("Given item is not type of " + typeof(TBaseType).AssemblyQualifiedName, "item");
            }
        }
    }
}
