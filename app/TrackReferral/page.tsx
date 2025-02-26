"use client"

import { useState, useEffect, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { X } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { ReferralType } from "@/lib/types/referral.type"

// Status type and color mapping
const STATUS_COLORS = {
  Onboarded: "text-orange-500",
  Active: "text-green-500",
  SystemUser: "text-blue-500",
  FullyCompliant: "text-red-500"
}

const STATUS_DESCRIPTIONS = {
  Onboarded: "Clients in this stage have been successfully registered...",
  Active: "Clients in this stage have started enrolling their employees...",
  SystemUser: "Clients at this stage have already pre-funded their accounts...",
  FullyCompliant: "These clients have met all the necessary requirements..."
}

function ReferralStatus() {
  const router = useRouter()
  const [referrals, setReferrals] = useState<ReferralType[]>([])
  const [customStatuses, setCustomStatuses] = useState<{ [key: string]: string }>({})
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [openTooltip, setOpenTooltip] = useState<string | null>(null)

  const UserRole = {
    Role: "MCASH_DIVISION", // Or any other role
  }

  const isMCASH_DIVISION = UserRole?.Role === "MCASH_DIVISION"

  const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');  // Ensures two digits (e.g., '02')
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Month (0-11), +1 for 1-12, ensures two digits
      const year = currentDate.getFullYear();  // Full year (e.g., 2025)

      const formattedDate = `${day}-${month}-${year}`;
  useEffect(() => {
    const q = query(collection(db, "forwardedCompanies"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newReferrals: ReferralType[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        newReferrals.push({
          id: doc.id,
          companyName: data.companyName,
          status: data.status || "Onboarded",
          dateOnboarded: data.dateOnboarded || new Date().toISOString(),
          dateStarted: data.dateStarted || null,
        })
      })
      setReferrals(newReferrals)
    })

    return () => unsubscribe()
  }, [])

  const handleStatusChange = (companyName: string, newStatus: string) => {
    if (isMCASH_DIVISION) {
      const currentDate = new Date().toISOString()
      setReferrals((prevReferrals) =>
        prevReferrals.map((referral) =>
          referral.companyName === companyName
            ? {
                ...referral,
                status: newStatus === "Other..." ? customStatuses[companyName] || "Other..." : newStatus,
                dateStarted: newStatus === "Active" && !referral.dateStarted ? currentDate : referral.dateStarted,
              }
            : referral
        )
      )
      setSelectedStatus(newStatus)
    }
  }

  const handleCustomStatusChange = (companyName: string, value: string) => {
    if (isMCASH_DIVISION) {
      setCustomStatuses((prev) => ({
        ...prev,
        [companyName]: value,
      }))
      setReferrals((prevReferrals) =>
        prevReferrals.map((referral) =>
          referral.companyName === companyName
            ? {
                ...referral,
                status: value || "Other...",
              }
            : referral
        )
      )
    }
  }

  const handleCustomStatusSubmit = (companyName: string) => {
    const customStatus = customStatuses[companyName]
    if (customStatus) {
      handleStatusChange(companyName, customStatus)
    }
  }

  // Function to delete a referral
  const handleDelete = async (referralId: string) => {
    try {
      await deleteDoc(doc(db, "forwardedCompanies", referralId))
      setReferrals((prevReferrals) => prevReferrals.filter((referral) => referral.id !== referralId))
    } catch (error) {
      console.error("Error deleting referral:", error)
    }
  }

  const StatusTooltip = ({ status }: { status: string }) => (
    <Popover open={openTooltip === status} onOpenChange={(open) => setOpenTooltip(open ? status : null)}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer">
          <InfoCircledIcon className="h-4 w-4" />
          <span className={STATUS_COLORS[status as keyof typeof STATUS_COLORS]}>{status}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold mb-2">{status}</h4>
          <button onClick={() => setOpenTooltip(null)} className="text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-600">{STATUS_DESCRIPTIONS[status as keyof typeof STATUS_DESCRIPTIONS]}</p>
      </PopoverContent>
    </Popover>
  )

  return (
    <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>
      <DialogContent className="max-w-7xl p-6">
        <DialogHeader>
          <DialogTitle>Track Referral Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">No referrals yet.</p>
              <p className="text-sm text-gray-400">Referrals will appear here after being forwarded from meeting schedules.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Onboarded</TableHead>
                    <TableHead>Date Started</TableHead>
                    {isMCASH_DIVISION && <TableHead>Actions</TableHead>} {/* Show Actions only for McashDivision */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => (
                    <TableRow key={referral.companyName}>
                      <TableCell className="font-medium">{referral.companyName}</TableCell>
                      <TableCell>
                        {isMCASH_DIVISION ? (
                          <div className="flex items-center gap-2">
                            <Select
                              value={referral.status}
                              onValueChange={(value) => handleStatusChange(referral.companyName, value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Onboarded" className="text-orange-500">Onboarded</SelectItem>
                                <SelectItem value="Active" className="text-green-500">Active</SelectItem>
                                <SelectItem value="SystemUser" className="text-blue-500">SystemUser</SelectItem>
                                <SelectItem value="FullyCompliant" className="text-red-500">FullyCompliant</SelectItem>
                                <SelectItem value="Other...">Other...</SelectItem>
                              </SelectContent>
                            </Select>
                            {referral.status === "Other..." && (
                              <>
                                <Input
                                  value={customStatuses[referral.companyName] || ""}
                                  onChange={(e) => handleCustomStatusChange(referral.companyName, e.target.value)}
                                  placeholder="Enter status..."
                                  className="w-40"
                                />
                                <Button onClick={() => handleCustomStatusSubmit(referral.companyName)}>Submit</Button>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className={STATUS_COLORS[referral.status as keyof typeof STATUS_COLORS] || "text-gray-500"}>
                            {referral.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{referral.dateOnboarded ? new Date(referral.dateOnboarded).toLocaleDateString() : "-"}</TableCell>
                      <TableCell>{referral.dateStarted ? new Date(referral.dateStarted).toLocaleDateString() : "-"}</TableCell>
                      {isMCASH_DIVISION && (
                        <TableCell>
                          <Button variant="destructive" onClick={() => handleDelete(referral.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex flex-wrap gap-4 pt-4">
                {Object.keys(STATUS_DESCRIPTIONS).map((status) => (
                  <StatusTooltip key={status} status={status} />
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReferralStatus
