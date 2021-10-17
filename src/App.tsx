import React from "react";
import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PokemonDashboardPage } from "./pages/pokemon-dashboard/PokemonDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PokemonDetailsPage } from "./pages/pokemon-details/PokemonDetailsPage";

function App() {
  return (
    <Container>
      <Header />
      <Body>
        <BrowserRouter basename="/">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/dashboard">
              <PokemonDashboardPage />
            </Route>
            <Route exact path="/pokemon-details/:pokemonId">
              <PokemonDetailsPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </Body>
    </Container>
  );
}

export default App;

const Container: React.FC = (props) => (
  <div className="d-flex flex-column h-100">{props.children}</div>
);

const Body: React.FC = (props) => (
  <div className="container mt-5">
    <main className="mt-5 flex-shrink-0">{props.children}</main>
  </div>
);

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Pokedex
        </a>
      </div>
    </nav>
  </header>
);
