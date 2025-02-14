"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Referral } from "@/app/types/user"
import { useAuth } from "@/app/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot } from "firebase/firestore"

export function ReferralStatus() {
  const router = useRouter()
  const { user } = useAuth()
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [customStatuses, setCustomStatuses] = useState<{ [key: string]: string }>({})
  const [statusDescription, setStatusDescription] = useState("")

  useEffect(() => {
    // Set up real-time listener for forwardedCompanies collection
    const q = query(collection(db, "forwardedCompanies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newReferrals: Referral[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newReferrals.push({
          companyName: data.companyName,
          status: "Onboarded",
          dateOnboarded: new Date(), // Use Date object directly
          dateStarted: new Date(), // Use Date object directly
        });
      });
      setReferrals(newReferrals);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleStatusChange = (companyName: string, newStatus: string) => {
    if (user?.role === "McashDivision") {
      if (newStatus === "Others") {
        // Initialize custom status for this company if it doesn't exist
        if (!customStatuses[companyName]) {
          setCustomStatuses(prev => ({
            ...prev,
            [companyName]: ""
          }))
        }
      }

      setReferrals((prevReferrals) =>
        prevReferrals.map((referral) =>
          referral.companyName === companyName
            ? {
                ...referral,
                status: newStatus === "Others" ? 
                  (customStatuses[companyName] || "Others") : 
                  newStatus,
                dateStarted: newStatus === "Active" ? 
                  new Date() :
                  referral.dateStarted,
              }
            : referral,
        ),
      )
    }
  }

  const handleCustomStatusChange = (companyName: string, value: string) => {
    setCustomStatuses(prev => ({
      ...prev,
      [companyName]: value
    }))
    
    setReferrals((prevReferrals) =>
      prevReferrals.map((referral) =>
        referral.companyName === companyName
          ? {
              ...referral,
              status: value || "Others",
            }
          : referral,
      ),
    )
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "Onboarded":
        return "Clients in this stage have been successfully registered in the system but have not yet started using it. Follow up is required to ensure progress and facilitate the transition to active use."
      case "Active":
        return "Clients in this stage have started enrolling their employees in the system, preparing for payroll disbursement. They are in the process of setting up their system for full operational use."
      case "SystemUser":
        return "Clients at this stage have already pre-funded their accounts and are ready to proceed with payroll disbursement. They are fully utilizing the system for their payroll needs."
      case "FullyCompliant":
        return "These clients have met all the necessary requirements for accreditation. They are fully committed to using the system, and their account will be managed by the Mcash support team for ongoing assistance and optimization."
      default:
        return ""
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>  
      <DialogContent className="max-w-7xl p-6">
        <DialogHeader>
          <DialogTitle>Referral Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">No referrals yet.</p>
              <p className="text-sm text-gray-400">Referrals will appear here after being forwarded from meeting schedules.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Onboarded</TableHead>
                  <TableHead>Date Started</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.companyName}>
                    <TableCell>{referral.companyName}</TableCell>
                    <TableCell>
                      {user?.role === "McashDivision" ? (
                        <div className="flex items-center space-x-2">
                          <Select
                            defaultValue={referral.status === customStatuses[referral.companyName] ? "Others" : referral.status}
                            onValueChange={(value) => handleStatusChange(referral.companyName, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Onboarded">Onboarded</SelectItem>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                          {(referral.status === "Others" || customStatuses[referral.companyName]) && (
                            <Input
                              value={customStatuses[referral.companyName] || ""}
                              onChange={(e) => handleCustomStatusChange(referral.companyName, e.target.value)}
                              placeholder="Enter custom status"
                              className="w-40"
                            />
                          )}
                        </div>
                      ) : (
                        referral.status
                      )}
                    </TableCell>
                    <TableCell>{referral.dateOnboarded instanceof Date ? referral.dateOnboarded.toLocaleDateString() : "-"}</TableCell>
                    <TableCell>{referral.dateStarted instanceof Date ? referral.dateStarted.toLocaleDateString() : "-"}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => alert(`Managing ${referral.companyName}`)}
                        variant="outline"
                        size="sm"
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReferralStatus;
