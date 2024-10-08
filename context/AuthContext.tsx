import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserProps {
  id: number;
  name: string;
  abbreviation?: string;
  type?: string;
  zipCode?: string;
  prefecture?: string;
  address?: string;
  phone?: string;
  fax?: string;
  holidays?: string;
  websiteURL?: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
