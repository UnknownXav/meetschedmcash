"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getAllClient } from "@/lib/serviceclient/client.service";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust to your actual button component
import { ClientAccount } from "../-components/types/user";

export default function Sample() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<ClientAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<ClientAccount | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const resp = await getAllClient();
        setAccounts(resp);
      } catch (error) {
        toast({
          title: "Error fetching accounts",
          description: "There was an error fetching client accounts.",
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    };

    fetchAccounts();
  }, [toast]);

  const handleEdit = (account: ClientAccount) => {
    setSelectedAccount(account);
    setEditUsername(account.username);
    setEditPassword(account.password);
    setShowEditDialog(true);
  };

  const handleDeleteAccount = (id: string) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);
    toast({
      title: "Account Deleted",
      description: "The account has been successfully deleted.",
      style: {
        backgroundColor: "red",
        color: "white",
      },
    });
  };

  const handleSaveEdit = () => {
    if (!selectedAccount) return;

    const updatedAccounts = accounts.map((account) =>
      account.id === selectedAccount.id
        ? { ...account, username: editUsername, password: editPassword }
        : account
    );

    setAccounts(updatedAccounts);
    toast({
      title: "Account Updated",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
    setShowEditDialog(false);
  };

  const togglePasswordVisibility = (accountId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-bold text-center">RM Accounts</h3>
      <div className="flex flex-col justify-center">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="w-[50%] p-3 my-2 border border-gray-300 shadow-md mx-auto"
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{account.username}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(account)}
                  aria-label="Edit account"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteAccount(account.id)}
                  aria-label="Delete account"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm">{account.dateCreated}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm">
                {showPasswords[account.id] ? account.password : "••••••••"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => togglePasswordVisibility(account.id)}
                className="h-4 w-4"
                aria-label="Toggle password visibility"
              >
                {showPasswords[account.id] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-4 rounded w-[90%] md:w-[50%]">
            <h2 className="text-xl font-bold mb-4">Edit Account</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="editUsername" className="block font-medium">
                  Username
                </label>
                <input
                  id="editUsername"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label htmlFor="editPassword" className="block font-medium">
                  Password
                </label>
                <input
                  id="editPassword"
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={handleSaveEdit}>Save Changes</Button>
              <Button onClick={() => setShowEditDialog(false)} variant="destructive">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
