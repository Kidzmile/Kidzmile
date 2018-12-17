import { DEFAULT_APP_DATA } from './app-data';
import { DEFAULT_META_DATA } from './meta-data';

export const DEFAULT_CONFIG = {
  prodApiEndpoint: 'https://api.aviacommerce.org/',
  // prodApiEndpoint: 'http://localhost:3000/',
  frontEndUrl: 'https://test-aviacommerce.netlify.com/',
  appName: 'AviaCommerce Online Shop',
  fevicon: '/assets/default/logo.svg',
  header: {
    brand: {
      logo: '/assets/default/logo.svg',
      name: 'Kidzmile',
      height: '42',
      width: '140'
    },
    searchPlaceholder: 'Search for products',
    showGithubRibon: false
  },
  //showDummyCardInfo: true,
  // Following are the test crediantials for payubiz payment gateway.
  // payuBizSalt: 'eCwWELxi',
  // payuBizKey: 'gtKFFx',
  // freeShippingAmount: 50,
  currency_symbol: 'fa fa-inr', // INR ₹
  // PaymentMethodCod: 'COD',
  // PaymentMethodPayubiz: 'Payubiz',
  // defaultPaymentMethod: 'Payubiz',
  // reviewsDisplayLimit: 5,

  // ...DEFAULT_APP_DATA,
  // ...DEFAULT_META_DATA
};
