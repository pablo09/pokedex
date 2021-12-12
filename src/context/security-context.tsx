import React from "react";
import {
  createLoginSucceedAction,
  createLogoutSucceedAction,
  authReducer,
} from "../reducers/auth-reducer";

export interface LoggedUser {
  username: string;
}

function getLoggedUserFromLocalSession(): LoggedUser | null {
  const loggedUser = window.localStorage.getItem("user");
  if (!loggedUser) {
    return null;
  }

  return JSON.parse(loggedUser);
}

interface SecurityContextType {
  loggedUser: LoggedUser | null;
  isAuthenticated(): boolean;
  onLogin(loggedUser: LoggedUser): void;
  onLogout(): void;
}

export const SecurityContext = React.createContext<SecurityContextType>({
  loggedUser: null,
  isAuthenticated: () => false,
  onLogin: (loggedUser: LoggedUser) => {},
  onLogout: () => {},
});

export const SecurityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loginState, dispatch] = React.useReducer(authReducer, {
    user: getLoggedUserFromLocalSession(),
  });

  return (
    <SecurityContext.Provider
      value={{
        loggedUser: loginState.user,
        isAuthenticated: () => loginState.user != null,
        onLogout: () => dispatch(createLogoutSucceedAction()),
        onLogin: (loggedUser: LoggedUser) =>
          dispatch(createLoginSucceedAction(loggedUser)),
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};
