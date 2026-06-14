import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  isLoading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: false,
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
