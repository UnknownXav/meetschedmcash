"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { McashDivisionDashboard } from "../components/McashDivisionDashboard";
import { SpbdDivisionDashboard } from "../components/SpbdDivisionDashboard";
import { RegionalManagerDashboard } from "../components/RegionalManagerDashboard";
import { NotificationBell } from "../components/NotificationBell";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    // Outer container fills full viewport height and width.
    <div className="h-screen w-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      {/* Remove width restrictions to let the content span full width */}
      <div className="relative py-3 w-full px-4">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="w-full">
            {/* Header with welcome message and logout button */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
              <div className="flex items-center space-x-4">
                <NotificationBell />
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
            {/* Conditional dashboard content based on user role */}
            {user.role === "McashDivision" && <McashDivisionDashboard />}
            {user.role === "SpbdDivision" && <SpbdDivisionDashboard />}
            {user.role === "RegionalManager" && <RegionalManagerDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
}
