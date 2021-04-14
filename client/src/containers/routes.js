import React from "react";
import PrivateRoute from "../helpers/PrivateRoute";
import PublicRoute from "../helpers/PublicRoute";
import {
  RequestDetails,
  QuoteDetails,
  Login,
  // NotFound
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <PublicRoute restricted={false} component={Login} path="/" />
      <PublicRoute restricted={true} component={Login} path="/login" />
      <PrivateRoute
        exact
        path="/dashboard/requests"
        component={RequestDetails}
      />
      <PrivateRoute
        exact
        path="/dashboard/quote/:id"
        component={QuoteDetails}
      />
      {/* <PublicRoute restricted={true}  component={NotFound} /> */}
    </>
  );
};

export default AppRoutes;
