import { Suspense, lazy } from "react";
import LoadingScreen from "@/components/common/LoadingScreen";

// Utility function to load components lazily with a loading screen.
const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

  LoadableComponent.displayName = `Loadable(${
    Component.displayName || Component.name || "Component"
  })`;

  return LoadableComponent;
};
// Auth Pages
export const AuthLogin = Loadable(lazy(() => import("../pages/auth/login")));
export const AuthRegister = Loadable(
  lazy(() => import("../pages/auth/register"))
);

// Admin Pages
export const AdminProducts = Loadable(
  lazy(() => import("../pages/admin-view/products"))
);
export const AdminOrders = Loadable(
  lazy(() => import("../pages/admin-view/orders"))
);

// Shopping Pages
export const ShoppingHome = Loadable(
  lazy(() => import("../pages/shopping-view/home"))
);
export const ShoppingListing = Loadable(
  lazy(() => import("../pages/shopping-view/listing"))
);
export const ShoppingCheckout = Loadable(
  lazy(() => import("../pages/shopping-view/checkout"))
);
export const ShoppingAccount = Loadable(
  lazy(() => import("../pages/shopping-view/account"))
);
export const PaypalReturnPage = Loadable(
  lazy(() => import("../pages/shopping-view/paypal-return"))
);
export const PaymentSuccessPage = Loadable(
  lazy(() => import("../pages/shopping-view/payment-success"))
);
export const SearchProducts = Loadable(
  lazy(() => import("../pages/shopping-view/search"))
);

// Common Pages
export const NotFound = Loadable(lazy(() => import("../pages/not-found")));
export const UnAuthPage = Loadable(lazy(() => import("../pages/unauth-page")));

// Layouts
export const AuthLayout = Loadable(
  lazy(() => import("../components/auth/layout"))
);
export const AdminLayout = Loadable(
  lazy(() => import("../components/admin-view/layout"))
);
export const ShoppingLayout = Loadable(
  lazy(() => import("../components/shopping-view/layout"))
);
export const CheckAuth = Loadable(
  lazy(() => import("../components/common/check-auth"))
);
