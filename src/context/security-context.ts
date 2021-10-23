import React from "react";

export interface LoggedUser {
  username: string;
}

export function saveUser(loggedUser: LoggedUser) {
  window.localStorage.setItem("user", JSON.stringify(loggedUser));
}

export function clearUser() {
  window.localStorage.removeItem("user");
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

export function getLoggedUserFromLocalSession(): LoggedUser | null {
  const loggedUser = window.localStorage.getItem("user");
  if (!loggedUser) {
    return null;
  }

  return JSON.parse(loggedUser);
}
