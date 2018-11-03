using System.Configuration;
using System.Data;
using System.Data.SqlClient;

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
