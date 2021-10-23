import { LoggedUser } from "../context/security-context";

export function login(username: string, password: string): Promise<LoggedUser> {
  return new Promise((resolve) => {
    resolve({
      username,
    });
  });
}
