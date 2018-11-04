using Kidzmile.Common.Uow;
using Kidzmile.Web.Repository;
using Kidzmile.Web.Service;
using System.Web.Http;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;

namespace Kidzmile
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IDatabaseProvider, DatabaseProvider>(new ContainerControlledLifetimeManager());
            container.RegisterType<IProductRepository, ProductRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IProductDataService, ProductDataService>(new HierarchicalLifetimeManager());
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}