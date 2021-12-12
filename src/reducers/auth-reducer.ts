import { LoggedUser } from "../context/security-context";

export interface AuthModel {
  user: LoggedUser | null;
}

interface LoginSucceedAction {
  type: "auth:login-succeed";
  payload: LoggedUser;
}

interface LogoutSucceedAction {
  type: "auth:logout-succeed";
  payload: {};
}

export const createLoginSucceedAction = (
  loggedUser: LoggedUser
): LoginSucceedAction => ({
  type: "auth:login-succeed",
  payload: loggedUser,
});

export const createLogoutSucceedAction = (): LogoutSucceedAction => ({
  type: "auth:logout-succeed",
  payload: {},
});

type Actions = LoginSucceedAction | LogoutSucceedAction;

export const authReducer = (state: AuthModel, action: Actions) => {
  switch (action.type) {
    case "auth:login-succeed":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "auth:logout-succeed":
      localStorage.clear();
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
