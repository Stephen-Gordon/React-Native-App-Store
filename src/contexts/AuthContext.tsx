import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "../types";
interface MyAuthContext {
  signIn: (token: string, user: string | null) => void;
  signOut: () => void;
  session?: string | null;
  isLoading?: boolean;
  getUser?: () => any;
}

const AuthContext = React.createContext<MyAuthContext | null>(null);

// This hook can be used to access the user info.
export function useSession() {
  const value: any = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[userLoading, user], setUser] = useStorageState("user");

  return (
    <AuthContext.Provider
      value={{
        signIn: (_token, _user) => {
          setSession(_token);
          setUser(_user);
        },
        signOut: () => {
          setSession(null);
          setUser(null);
        },
        getUser: () => {
          const parsedUser = JSON.parse(user);
          return parsedUser;
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
