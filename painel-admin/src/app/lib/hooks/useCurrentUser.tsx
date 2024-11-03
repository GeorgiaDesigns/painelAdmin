import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useSession, signOut, SignOutParams } from "next-auth/react";

type LogoutParams = SignOutParams<boolean> & { logLogout?: boolean };

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface CurrentUserContextData {
  user: User;
  updateSession: () => Promise<Response>;
  logout: (options?: LogoutParams) => Promise<void>;
}

interface CurrentUserProviderProps {
  children: ReactNode;
}

const CurrentUserContext = createContext<CurrentUserContextData>(
  {} as CurrentUserContextData
);

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(emptyUser);

  const updateSession = useCallback(() => {
    return fetch("/api/auth/session?update");
  }, []);

  const logout = useCallback(async (options?: LogoutParams) => {
    const logLogoutEnabled = options?.logLogout ?? true;
    if (logLogoutEnabled) await userService.logout();
    await signOut(options);
  }, []);

  useEffect(() => {
    const sessionStatus = status;
    if (!session || sessionStatus === "unauthenticated") {
      setUser(emptyUser);
    }

    if (session && sessionStatus === "authenticated") {
      const userData = session.user as User;
      setUser({
        ...userData
      });
    }
  }, [session, status]);

  return (
    <CurrentUserContext.Provider
      value={{
        user,
        updateSession,
        logout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser(): CurrentUserContextData {
  const context = useContext(CurrentUserContext);
  return context;
}
