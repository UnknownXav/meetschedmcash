"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { compare } from "bcryptjs";

type UserRole = "McashDivision" | "SpbdDivision" | "RegionalManager" | null;

interface User {
  id: string;
  uid: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Verify the stored user still exists in Firestore
          const isValid = await verifyStoredUser(parsedUser);
          if (isValid) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem("user");
          }
        }
      } catch (error) {
        console.error("Error loading stored user:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const verifyStoredUser = async (storedUser: User): Promise<boolean> => {
    const db = getFirestore();
    try {
      let collectionName = "";
      switch (storedUser.role) {
        case "McashDivision":
          collectionName = "mcashDivisionAccounts";
          break;
        case "SpbdDivision":
          collectionName = "spbdDivisionAccounts";
          break;
        case "RegionalManager":
          collectionName = "clients";
          break;
        default:
          return false;
      }

      const userQuery = query(
        collection(db, collectionName),
        where("username", "==", storedUser.username)
      );
      const snapshot = await getDocs(userQuery);
      return !snapshot.empty;
    } catch (error) {
      console.error("Error verifying stored user:", error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const db = getFirestore();

    try {
      // Define collections to check in order
      const collections = [
        { name: "mcashDivisionAccounts", role: "McashDivision" },
        { name: "spbdDivisionAccounts", role: "SpbdDivision" },
        { name: "clients", role: "RegionalManager" }
      ];

      for (const { name, role } of collections) {
        const userQuery = query(
          collection(db, name),
          where("username", "==", username)
        );

        const snapshot = await getDocs(userQuery);
        
        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();

          if (!userData.password) {
            console.error(`No password found for user in ${name}`);
            continue;
          }

          const passwordMatches = await compare(password, userData.password);
          if (!passwordMatches) {
            console.error(`Invalid password for ${name} account`);
            continue;
          }

          const user: User = {
            id: userDoc.id,
            uid: userData.uid || userDoc.id,
            name: userData.name || userData.companyName || userData.username,
            username: userData.username,
            email: userData.email,
            role: role as UserRole
          };

          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          return true;
        }
      }

      console.error("User not found in any collection");
      return false;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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