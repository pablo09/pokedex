import React from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./AppRoutes";
import {
  clearUser,
  getLoggedUserFromLocalSession,
  LoggedUser,
  saveUser,
  SecurityContext,
} from "../context/security-context";
import { BrowserRouter } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel";

function App() {
  const [loggedUser, setLoggedUser] = React.useState<LoggedUser | null>(null);

  React.useEffect(() => {
    const user = getLoggedUserFromLocalSession();
    if (user) {
      setLoggedUser(user);
    }
  }, []);

  const isAuthenticated = () => {
    return loggedUser != null;
  };

  const onLogin = (user: LoggedUser) => {
    setLoggedUser(user);
    saveUser(user);
  };

  const onLogout = () => {
    setLoggedUser(null);
    clearUser();
  };

  return (
    <SecurityContext.Provider
      value={{
        loggedUser,
        isAuthenticated,
        onLogout,
        onLogin,
      }}
    >
      <BrowserRouter basename="/">
        <div className="d-flex flex-column h-100">
          <NavigationPanel />
          <div className="container mt-5">
            <main className="mt-5 flex-shrink-0">
              <AppRoutes />
            </main>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </SecurityContext.Provider>
  );
}

export default App;
