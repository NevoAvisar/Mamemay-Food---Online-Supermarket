import { Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AuthLogin,
  AuthRegister,
  AdminProducts,
  AdminOrders,
  ShoppingHome,
  ShoppingListing,
  ShoppingCheckout,
  ShoppingAccount,
  PaypalReturnPage,
  PaymentSuccessPage,
  SearchProducts,
  NotFound,
  UnAuthPage,
  AuthLayout,
  AdminLayout,
  ShoppingLayout,
  CheckAuth,
} from "./elements";
import PATHS from "./paths";

function MainRouter({ isAuthenticated, user = {} }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />}
      />
      <Route
        path={PATHS.auth.root}
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path={PATHS.auth.login} element={<AuthLogin />} />
        <Route path={PATHS.auth.register} element={<AuthRegister />} />
      </Route>
      <Route
        path={PATHS.admin.root}
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path={PATHS.admin.products} element={<AdminProducts />} />
        <Route path={PATHS.admin.orders} element={<AdminOrders />} />
      </Route>
      <Route
        path={PATHS.shop.root}
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path={PATHS.shop.home} element={<ShoppingHome />} />
        <Route path={PATHS.shop.listing} element={<ShoppingListing />} />
        <Route path={PATHS.shop.checkout} element={<ShoppingCheckout />} />
        <Route path={PATHS.shop.account} element={<ShoppingAccount />} />
        <Route path={PATHS.shop.paypalReturn} element={<PaypalReturnPage />} />
        <Route
          path={PATHS.shop.paymentSuccess}
          element={<PaymentSuccessPage />}
        />
        <Route path={PATHS.shop.search} element={<SearchProducts />} />
      </Route>
      <Route path={PATHS.common.UnAuthPage} element={<UnAuthPage />} />
      <Route path={PATHS.common.notFound} element={<NotFound />} />
    </Routes>
  );
}

MainRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

export default MainRouter;
