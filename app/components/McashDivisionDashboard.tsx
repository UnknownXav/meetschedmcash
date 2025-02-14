import React from "react";
import Link from "next/link";
import { Video, Calendar, Users, Play, UserPlus, List } from "lucide-react";

export const McashDivisionDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-red-600 text-3xl font-bold mb-2">WELCOME!</h1>
        <p className="text-gray-600">How can I support you today?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/virtual-demo" className="no-underline">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
            <div className="flex flex-col items-center space-y-4">
              <Video className="w-12 h-12 text-red-600" />
              <span className="text-gray-800 font-medium">Schedule a Virtual Demo</span>
            </div>
          </div>
        </Link>
        <Link href="/meeting-schedules" className="no-underline">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
            <div className="flex flex-col items-center space-y-4">
              <Calendar className="w-12 h-12 text-red-600" />
              <span className="text-gray-800 font-medium">Check Meeting Schedules</span>
            </div>
          </div>
        </Link>
        <Link href="/referral-status" className="no-underline">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
            <div className="flex flex-col items-center space-y-4">
              <Users className="w-12 h-12 text-red-600" />
              <span className="text-gray-800 font-medium">Track Referral Status</span>
            </div>
          </div>
        </Link>
        <Link href="/virtual-walkthrough" className="no-underline">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
            <div className="flex flex-col items-center space-y-4">
              <Play className="w-12 h-12 text-red-600" />
              <span className="text-gray-800 font-medium">ML Payroll PRO Virtual Walkthrough</span>
            </div>
          </div>
        </Link>
        <Link href="/add-client-account" className="no-underline">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
            <div className="flex flex-col items-center space-y-4">
              <UserPlus className="w-12 h-12 text-red-600" />
              <span className="text-gray-800 font-medium">Add RM Account</span>
            </div>
          </div>
        </Link>
        <Link href="/view-client-accounts" className="no-underline">
          <div className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow cursor-pointer text-center">
            <div className="flex flex-col items-center space-y-4">
              <List className="w-12 h-12 text-red-600" />
              <span className="text-gray-800 font-medium">View RM Accounts</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
