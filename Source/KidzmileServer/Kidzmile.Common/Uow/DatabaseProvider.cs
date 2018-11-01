using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kidzmile.Common.Uow
{

  public class DatabaseProvider : IDatabaseProvider
    {

        public DatabaseProvider()
        {

        }
        public IDbConnection GetMasterDbConnection()
        {
            return new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString);
        }

       
    }
}
