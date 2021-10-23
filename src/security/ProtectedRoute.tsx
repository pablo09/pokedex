import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { getLoggedUserFromLocalSession } from "../context/security-context";

export const ProtectedRoute = ({ component, ...rest }: any) => {
  if (!getLoggedUserFromLocalSession()) {
    return <Redirect to="/unauthorized" />;
  }
  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};
