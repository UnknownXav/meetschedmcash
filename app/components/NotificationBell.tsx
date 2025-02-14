import React, { useState } from 'react';
import { Bell } from 'lucide-react';

export const NotificationBell: React.FC = () => {
  const [hasNotifications] = useState(true); // This will be connected to actual notifications later
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {hasNotifications && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {/* Sample notifications - will be replaced with real data */}
            <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-800">New meeting scheduled</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <p className="text-sm text-gray-800">Client referral status updated</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="px-4 py-2 border-t border-gray-200">
            <button
              className="text-sm text-red-600 hover:text-red-700 font-medium"
              onClick={() => {/* Mark all as read functionality */}}
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
