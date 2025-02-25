"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { hash } from 'bcryptjs';
import { z } from "zod";
import { X } from "@/components/icons";

// Validation schema
const clientAccountSchema = z.object({    
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export interface ClientAccount {
  id: string;
  username: string;
  password: string;
  dateCreated: string;
  active: boolean;
  lastLogin?: string;
  createdBy: string;
}

export default function AddRmAccount() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if not logged in or if the user is not McashDivision
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

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    try {
      clientAccountSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Check if username exists
      const usersRef = collection(db, "clients");
      const q = query(usersRef, where("username", "==", formData.username));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setErrors({ username: "Username already exists" });
        return;
      }

      // Hash password
      const hashedPassword = await hash(formData.password, 10);

      // Create new client account
      const newAccount: Omit<ClientAccount, 'id'> = {
        username: formData.username,
        password: hashedPassword,
        dateCreated: new Date().toISOString(),
        active: true,
        createdBy: user?.email ?? "unknown",
      };

      await addDoc(collection(db, "clients"), newAccount);

      toast({
        title: "Success",
        description: "Client account created successfully",
      });

      router.push("/view-client-accounts");
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-md mx-auto relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="absolute top-2 right-2 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Client Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "border-red-500" : ""}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-red-500" : ""}
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
            Create Account
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}