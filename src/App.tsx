import React from "react";
import "./App.css";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import { PokemonDashboardPage } from "./pages/pokemon-dashboard/PokemonDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PokemonDetailsPage } from "./pages/pokemon-details/PokemonDetailsPage";
import { LoginPage } from "./pages/LoginPage";
import { Unauthorized } from "./pages/Unauthorized";
import { MyCollectionPage } from "./pages/my-collection/MyCollectionPage";
import { ProtectedRoute } from "./security/ProtectedRoute";
import {
  clearUser,
  getLoggedUserFromLocalSession,
  LoggedUser,
  saveUser,
  SecurityContext,
} from "./context/security-context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loggedUser, setLoggedUser] = React.useState<LoggedUser | null>(null);

  React.useEffect(() => {
    const user = getLoggedUserFromLocalSession();
    console.log("User", user);
    if (user) {
      setLoggedUser(user);
    }
  }, []);

  return (
    <SecurityContext.Provider
      value={{
        loggedUser,
        isAuthenticated: () => loggedUser != null,
        onLogout: () => {
          setLoggedUser(null);
          clearUser();
        },
        onLogin: (user: LoggedUser) => {
          setLoggedUser(user);
          saveUser(user);
        },
      }}
    >
      <BrowserRouter basename="/">
        <Container>
          <Header />
          <Body>
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
              <Route exact path="/unauthorized">
                <Unauthorized />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </Body>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </SecurityContext.Provider>
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

const Header = () => {
  const { loggedUser, onLogout } = React.useContext(SecurityContext);
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png"
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top mr-1"
            />
            Pokedex
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mb-2 mb-lg-0 me-5 text-nowrap text-decoration-none">
            {loggedUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-collection">
                    My collection
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    {loggedUser.username}
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/" onClick={onLogout}>
                    Sign out
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
