"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, updateDoc, query, where, orderBy } from "firebase/firestore";
import { Trash2, Edit, Search, UserPlus, RefreshCw, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { hash } from 'bcryptjs';

interface ClientAccount {
  id: string;
  username: string;
  password: string;
  dateCreated: string;
  active: boolean;
  lastLogin?: string;
  createdBy: string;
}

function ViewClientAccounts() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<ClientAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAccount, setEditingAccount] = useState<ClientAccount | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    username: "",
    password: "",
    active: true
  });

  

  // Redirect if not McashDivision
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "McashDivision") {
      router.push("/dashboard");
      return;
    }
  }, [user, router]);

  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      const accountsRef = collection(db, "clients");
      const q = query(accountsRef, orderBy("dateCreated", "desc"));
      const querySnapshot = await getDocs(q);
      
      const accountsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ClientAccount[];
      
      setAccounts(accountsData);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast({
        title: "Error",
        description: "Failed to load accounts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "McashDivision") {
      fetchAccounts();
    }
  }, [user]);

  const handleEdit = (account: ClientAccount) => {
    setEditingAccount(account);
    setEditForm({
      username: account.username,
      password: "",
      active: account.active
    });
  };

  const handleUpdate = async () => {
    if (!editingAccount) return;

    try {
      const accountRef = doc(db, "clients", editingAccount.id);
      const updateData: Partial<ClientAccount> = {
        username: editForm.username,
        active: editForm.active
      };

      if (editForm.password) {
        updateData.password = await hash(editForm.password, 10);
      }

      await updateDoc(accountRef, updateData);
      
      toast({
        title: "Success",
        description: "Account updated successfully",
      });
      
      setEditingAccount(null);
      fetchAccounts();
    } catch (error) {
      console.error("Error updating account:", error);
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!accountToDelete) return;

    try {
      await deleteDoc(doc(db, "clients", accountToDelete));
      toast({
        title: "Success",
        description: "Account deleted successfully",
      });
      setShowDeleteDialog(false);
      setAccountToDelete(null);
      fetchAccounts();
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <Card className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="absolute top-2 right-2 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Client Accounts</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={fetchAccounts}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => router.push("/add-client-account")}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Date Created</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="bg-white border-b">
                    <td className="px-6 py-4">{account.username}</td>
                    <td className="px-6 py-4">
                      {new Date(account.dateCreated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        account.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {account.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(account)}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setAccountToDelete(account.id);
                            setShowDeleteDialog(true);
                          }}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingAccount} onOpenChange={() => setEditingAccount(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                value={editForm.username}
                onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-active"
                checked={editForm.active}
                onChange={(e) => setEditForm(prev => ({ ...prev, active: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="edit-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAccount(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="w-full bg-red-500 hover:bg-red-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this account? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default ViewClientAccounts;