"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { compare } from "bcryptjs";

type UserRole = "McashDivision" | "SpbdDivision" | "RegionalManager" | null;

interface User {
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount.
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const db = getFirestore();

    // ----- 1. Try logging in using the "clients" collection (RegionalManager) -----
    try {
      const clientsRef = collection(db, "clients");
      const clientQuery = query(clientsRef, where("username", "==", username));
      const clientSnapshot = await getDocs(clientQuery);

      if (!clientSnapshot.empty) {
        let clientDoc: any = null;
        clientSnapshot.forEach((doc) => {
          clientDoc = { id: doc.id, ...doc.data() };
        });
        if (clientDoc) {
          const storedHashedPassword = clientDoc.password;
          const passwordMatches = await compare(password, storedHashedPassword);
          if (!passwordMatches) {
            console.error("Invalid password for client account");
            return false;
          }
          const userData: User = {
            name: clientDoc.companyName || clientDoc.username,
            username: clientDoc.username,
            email: clientDoc.email,
            role: "RegionalManager",
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          return true;
        }
      }
    } catch (error) {
      console.error("Error logging in via clients collection:", error);
    }

    // ----- 2. Try logging in using the "mcashDivisionAccounts" collection (McashDivision) -----
    try {
      const mcashRef = collection(db, "mcashDivisionAccounts");
      const mcashQuery = query(mcashRef, where("username", "==", username));
      const mcashSnapshot = await getDocs(mcashQuery);

      if (!mcashSnapshot.empty) {
        let mcashDoc: any = null;
        mcashSnapshot.forEach((doc) => {
          mcashDoc = { id: doc.id, ...doc.data() };
        });
        if (mcashDoc) {
          const storedHashedPassword = mcashDoc.password;
          const passwordMatches = await compare(password, storedHashedPassword);
          if (!passwordMatches) {
            console.error("Invalid password for McashDivision account");
            return false;
          }
          const userData: User = {
            name: mcashDoc.name || mcashDoc.username,
            username: mcashDoc.username,
            email: mcashDoc.email,
            role: "McashDivision",
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          return true;
        }
      }
    } catch (error) {
      console.error("Error logging in via mcashDivisionAccounts collection:", error);
    }

    // ----- 3. Try logging in using the "spbdDivisionAccounts" collection (SpbdDivision) -----
    try {
      const spbdRef = collection(db, "spbdDivisionAccounts");
      const spbdQuery = query(spbdRef, where("username", "==", username));
      const spbdSnapshot = await getDocs(spbdQuery);

      if (!spbdSnapshot.empty) {
        let spbdDoc: any = null;
        spbdSnapshot.forEach((doc) => {
          spbdDoc = { id: doc.id, ...doc.data() };
        });
        if (spbdDoc) {
          const storedHashedPassword = spbdDoc.password;
          const passwordMatches = await compare(password, storedHashedPassword);
          if (!passwordMatches) {
            console.error("Invalid password for SpbdDivision account");
            return false;
          }
          const userData: User = {
            name: spbdDoc.name || spbdDoc.username,
            username: spbdDoc.username,
            email: spbdDoc.email,
            role: "SpbdDivision",
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          return true;
        }
      }
    } catch (error) {
      console.error("Error logging in via spbdDivisionAccounts collection:", error);
    }

    console.error("User not found in any collection");
    return false;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
