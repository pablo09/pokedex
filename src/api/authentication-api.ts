import { LoggedUser } from "../context/security-context";
import { apiErrorHandler } from "./index";

export function login(username: string, password: string): Promise<LoggedUser> {
  return fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(apiErrorHandler)
    .then((resp) => resp.json());
}
