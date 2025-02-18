"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import { X } from "lucide-react"
import type { Meeting } from "@/app/types/user"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

function ScheduleDemo() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    companyName: "",
    clientStatus: "",
    customClientStatus: "",
    contactPerson: "",
    contactNumber: "",
    meetingDate: "",
    meetingTime: "",
    clientEmails: "",
    rmEmails: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateEmails = (emails: string) => {
    const emailArray = emails.split(",").map((email) => email.trim())
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailArray.every((email) => emailRegex.test(email))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.companyName) newErrors.companyName = "Company name is required"
    if (!formData.clientStatus) newErrors.clientStatus = "Client status is required"
    if (formData.clientStatus === "others" && !formData.customClientStatus)
      newErrors.customClientStatus = "Custom status is required"
    if (!formData.contactPerson) newErrors.contactPerson = "Contact person is required"
    if (!formData.contactNumber) newErrors.contactNumber = "Contact number is required"
    if (!formData.meetingDate) newErrors.meetingDate = "Meeting date is required"
    if (!formData.meetingTime) newErrors.meetingTime = "Meeting time is required"
    if (!formData.clientEmails) newErrors.clientEmails = "Client email addresses are required"
    else if (!validateEmails(formData.clientEmails)) newErrors.clientEmails = "Invalid email format"
    if (!formData.rmEmails) newErrors.rmEmails = "RM/AM email addresses are required"
    else if (!validateEmails(formData.rmEmails)) newErrors.rmEmails = "Invalid email format"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const newMeeting = {
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        contactNumber: formData.contactNumber,
        meetingDate: formData.meetingDate,
        meetingTime: formData.meetingTime,
        status: "Pending",
        payrollStatus: formData.clientStatus === "others" ? (formData.customClientStatus as "others" | "manual" | "spreadsheet" | "software") : formData.clientStatus,
        dateSubmitted: new Date().toLocaleDateString(),
        clientEmails: formData.clientEmails,
        rmEmails: formData.rmEmails,
      }

      try {
        // Add the meeting to Firestore
        await addDoc(collection(db, "meetings"), newMeeting);
        router.push("/meeting-schedules")
      } catch (error) {
        console.error("Error adding meeting: ", error);
        alert("Failed to schedule meeting. Please try again.");
      }
    }
  }

  const availableTimes = [
    { time: '08:00-09:30', label: '8:00 AM - 9:30 AM' },
    { time: '09:00-10:30', label: '9:00 AM - 10:30 AM' },
    { time: '10:30-12:00', label: '10:30 AM - 12:00 PM' },
    { time: '13:00-14:30', label: '13:00 PM - 14:30 PM' },
    { time: '14:30-16:00', label: '14:30 PM - 16:00 PM' },
    { time: '16:30-17:00', label: '16:00 PM - 17:30 PM' },
  ];

  return (
    <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-4">
        <DialogHeader className="flex flex-row items-center justify-between sticky top-0 bg-white pb-4 z-10">
          <DialogTitle>Schedule a Virtual Demo</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => router.push("/dashboard")}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Company Name</label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full ${errors.companyName ? "border-red-500" : ""}`}
            />
            {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Client Current Status of Payroll Operations</label>
            <Select name="clientStatus" onValueChange={(value) => handleSelectChange("clientStatus", value)}>
              <SelectTrigger className={errors.clientStatus ? "border-red-500" : ""}>
                <SelectValue placeholder="Select client current status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">No system; payroll is computed manually and paid in cash</SelectItem>
                <SelectItem value="spreadsheet">
                  Payroll system in place, but a disbursement channel is needed for cash payroll
                </SelectItem>
                <SelectItem value="software">
                  No system, but only a disbursement channel is needed for salary payments
                </SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.clientStatus && <p className="text-red-500 text-xs">{errors.clientStatus}</p>}
            {formData.clientStatus === "others" && (
              <div className="mt-2">
                <Input
                  name="customClientStatus"
                  value={formData.customClientStatus}
                  onChange={handleInputChange}
                  placeholder="Enter custom status"
                  className={`w-full ${errors.customClientStatus ? "border-red-500" : ""}`}
                />
                {errors.customClientStatus && <p className="text-red-500 text-xs">{errors.customClientStatus}</p>}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Client Contact Person</label>
            <Input
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleInputChange}
              className={`w-full ${errors.contactPerson ? "border-red-500" : ""}`}
            />
            {errors.contactPerson && <p className="text-red-500 text-xs">{errors.contactPerson}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Client Contact Number</label>
            <Input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className={`w-full ${errors.contactNumber ? "border-red-500" : ""}`}
            />
            {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Meeting Date</label>
            <Input
              name="meetingDate"
              type="date"
              value={formData.meetingDate}
              onChange={handleInputChange}
              className={`w-full ${errors.meetingDate ? "border-red-500" : ""}`}
            />
            {errors.meetingDate && <p className="text-red-500 text-xs">{errors.meetingDate}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Meeting Time</label>
            <Select name="meetingTime" onValueChange={(value) => handleSelectChange("meetingTime", value)}>
              <SelectTrigger className={errors.meetingTime ? "border-red-500" : ""}>
                <SelectValue placeholder="Select meeting time" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map(({ time, label }) => (
                  <SelectItem key={time} value={time}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.meetingTime && <p className="text-red-500 text-xs">{errors.meetingTime}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Client Team Members' Email Addresses joining the meeting</label>
            <Textarea
              name="clientEmails"
              placeholder="Enter email addresses separated by commas"
              value={formData.clientEmails}
              onChange={handleInputChange}
              className={`min-h-[60px] ${errors.clientEmails ? "border-red-500" : ""}`}
            />
            {errors.clientEmails && <p className="text-red-500 text-xs">{errors.clientEmails}</p>}
            <p className="text-xs text-gray-500">Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">RMs/AMs Team Members' Email Addresses joining the meeting</label>
            <Textarea
              name="rmEmails"
              placeholder="Enter email addresses separated by commas"
              value={formData.rmEmails}
              onChange={handleInputChange}
              className={`min-h-[60px] ${errors.rmEmails ? "border-red-500" : ""}`}
            />
            {errors.rmEmails && <p className="text-red-500 text-xs">{errors.rmEmails}</p>}
            <p className="text-xs text-gray-500">Example: 123@gmail.com, abc@gmail.com, xyz@gmail.com</p>
          </div>

          <div className="flex justify-end gap-2 sticky bottom-0 bg-white pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleDemo;