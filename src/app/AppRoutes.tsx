import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { PokemonDashboardPage } from "../pages/pokemon-dashboard/PokemonDashboardPage";
import { PokemonDetailsPage } from "../pages/pokemon-details/PokemonDetailsPage";
import { ProtectedRoute } from "../security/ProtectedRoute";
import { MyCollectionPage } from "../pages/my-collection/MyCollectionPage";
import { ProfilePage } from "../pages/ProfilePage";
import { Unauthorized } from "../pages/Unauthorized";
import { NotFoundPage } from "../pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route exact path="/dashboard">
        <PokemonDashboardPage />
      </Route>
      <Route exact path="/pokemon-details/:pokemonId">
        <PokemonDetailsPage />
      </Route>
      <ProtectedRoute exact path="/my-collection">
        <MyCollectionPage />
      </ProtectedRoute>
      <ProtectedRoute exact path="/profile">
        <ProfilePage />
      </ProtectedRoute>
      <Route exact path="/unauthorized">
        <Unauthorized />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};
