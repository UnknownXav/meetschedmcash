"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore"; // Ensure this line is present
import { db } from "@/lib/firebase"; // En

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const getUserRole = async (emailOrUsername: string) => {
    const usersRef = collection(db, "clients");
    const q = query(usersRef, where("email", "==", emailOrUsername));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const userDoc = querySnapshot.docs[0];
    // Check if the user is created by McashDivision
    const isCreatedByMcashDivision = userDoc.data().createdBy === 'McashDivision';
    return isCreatedByMcashDivision ? 'RegionalManager' : userDoc.data().role;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const isLoggedIn = await login(emailOrUsername, password);
      if (isLoggedIn) {
        // Determine user role and redirect accordingly
        const userRole = await getUserRole(emailOrUsername);
        if (userRole === 'McashDivision') {
          router.push("/mcash-division-dashboard");
        } else if (userRole === 'SpbdDivision') {
          router.push("/spbd-division-dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Left Column: Login Form */}
        <div className="flex flex-col justify-center space-y-6">
          <img 
            src="/ml-logo.png" 
            alt="ML Logo" 
            className="h-24 object-contain mb-8"
          />
          <div className="space-y-6 max-w-md">
            <h2 className="text-center text-4l font-bold text-gray-600">
              Please enter your credentials
            </h2>
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="w-full"
                required
              />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Login
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Image (visible on md and larger screens) */}
        <div className="hidden md:block">
          <img 
            src="/ml-payroll.jpg"
            alt="ML Payroll"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
