namespace Kidzmile.Common.Collections
{
    /// <summary>
    /// A shortcut for <see cref="TypeList{TBaseType}" /> to use object as base type.
    /// </summary>
    public class TypeList : TypeList<object>, ITypeList
    {
    }
}