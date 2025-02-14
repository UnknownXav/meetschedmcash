"use client"

import { AuthProvider } from "../contexts/AuthContext"
import type React from "react" // Added import for React

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

