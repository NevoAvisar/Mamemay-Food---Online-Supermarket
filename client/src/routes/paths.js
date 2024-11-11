const paths = {
  auth: {
    root: "/auth",
    login: "/auth/login",
    register: "/auth/register",
  },
  admin: {
    root: "/admin",
    products: "/admin/products",
    orders: "/admin/orders",
  },
  shop: {
    root: "/shop",
    home: "/shop/home",
    listing: "/shop/listing",
    checkout: "/shop/checkout",
    account: "/shop/account",
    paypalReturn: "/shop/paypal-return",
    paymentSuccess: "/shop/payment-success",
    search: "/shop/search",
  },
  common: {
    UnAuthPage: "/unauth-page",
    notFound: "*", // for 404 not found pages
  },
};

export default paths;
