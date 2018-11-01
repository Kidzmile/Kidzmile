using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Common.Uow
{
   public interface IDatabaseProvider
    {
        IDbConnection GetMasterDbConnection();
    }
}
