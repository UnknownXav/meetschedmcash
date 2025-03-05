import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore"
import { db } from '@/lib/firebase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/data/components/ui/dialog"
import { Button } from "@/data/components/ui/button"

export const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  // Set up a real-time listener for all notifications (read and unread)
  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(notifs);
    });
    return () => unsubscribe();
  }, []);

  // Mark all notifications as read by updating the "read" field
  const markAllAsRead = async () => {
    try {
      const updatePromises = notifications.map((notif) =>
        updateDoc(doc(db, "notifications", notif.id), { read: true })
      );
      await Promise.all(updatePromises);
      // Update local state to reflect changes without removing notifications
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Handle a notification click to show its details
  const handleNotificationClick = (notif: any) => {
    setSelectedNotification(notif);
  };

  const closeNotificationDialog = () => {
    setSelectedNotification(null);
  };

  const hasNotifications = notifications.length > 0;

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
            {notifications.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-600">No notifications.</div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                    notif.read ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500">
                    {notif.timestamp?.toDate 
                      ? notif.timestamp.toDate().toLocaleString() 
                      : new Date(notif.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="px-4 py-2 border-t border-gray-200">
            <Button
              className="text-sm text-red-600 hover:text-red-700 font-medium"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
        </div>
      )}

      {selectedNotification && (
        <Dialog open={!!selectedNotification} onOpenChange={closeNotificationDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Notification Details</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-sm font-medium text-gray-800">Message:</p>
              <p className="text-sm text-gray-600 mb-2">{selectedNotification.message}</p>
              <p className="text-sm font-medium text-gray-800">Company Name:</p>
              <p className="text-sm text-gray-600 mb-2">{selectedNotification.companyName}</p>
              <p className="text-sm font-medium text-gray-800">Timestamp:</p>
              <p className="text-sm text-gray-600">
                {selectedNotification.timestamp?.toDate 
                  ? selectedNotification.timestamp.toDate().toLocaleString() 
                  : new Date(selectedNotification.timestamp).toLocaleString()}
              </p>
            </div>
            <DialogFooter>
              <Button onClick={closeNotificationDialog} variant="outline">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
