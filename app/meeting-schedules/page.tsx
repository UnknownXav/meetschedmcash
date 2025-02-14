"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Meeting } from "@/app/types/user"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore"

export function MeetingSchedules() {
  const router = useRouter()
  const { user } = useAuth()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)

  useEffect(() => {
    // Set up real-time listener for meetings collection
    const q = query(collection(db, "meetings"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const meetingsData: Meeting[] = [];
      querySnapshot.forEach((doc) => {
        // Use the Firestore document ID
        meetingsData.push({ ...doc.data(), id: doc.id } as Meeting);
      });
      setMeetings(meetingsData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (meetingId: string, newStatus: string) => {
    try {
      const meetingRef = doc(db, "meetings", meetingId);
      await updateDoc(meetingRef, { status: newStatus });
      // Clear meetings data after forwarding to referral status
      if (newStatus === 'referral') {
        setMeetings([]); // Set meetings to empty
      }
    } catch (error) {
      console.error("Error updating meeting status: ", error);
      alert("Failed to update meeting status. Please try again.");
    }
  }

  const handleReschedule = (meetingId: string) => {
    console.log(`Rescheduling meeting ${meetingId}`)
    alert("Meeting rescheduled. RM has been notified.")
  }

  const handleDelete = async (meetingId: string) => {
    if (!meetingId) {
      console.error("No meeting ID provided");
      return;
    }

    if (window.confirm("Are you sure you want to delete this meeting? This action cannot be undone.")) {
      try {
        console.log("Deleting meeting with ID:", meetingId);
        const meetingRef = doc(db, "meetings", meetingId);
        await deleteDoc(meetingRef);
        setSelectedMeeting(null); // Close the dialog
      } catch (error) {
        console.error("Error deleting meeting: ", error);
        alert("Failed to delete meeting. Please try again.");
      }
    }
  }

  const handleForward = async (companyName: string) => {
    try {
      const forwardedRef = collection(db, "forwardedCompanies");
      await addDoc(forwardedRef, { companyName, timestamp: new Date() });
      alert(`${companyName} has been forwarded to Track Referral Status.`);
      setMeetings([]); // Clear meetings state after transferring data from referral status
    } catch (error) {
      console.error("Error forwarding company: ", error);
      alert("Failed to forward company. Please try again.");
    }
  }

  const getPayrollStatusDisplay = (status: string) => {
    switch (status) {
      case "manual":
        return "No system; payroll is computed manually and paid in cash"
      case "spreadsheet":
        return "Payroll system in place, but a disbursement channel is needed for cash payroll"
      case "software":
        return "No system, but only a disbursement channel is needed for salary payments"
      default:
        return status // For "others" or custom status
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>
      <DialogContent className="max-w-7xl p-6">
        <DialogHeader>
          <DialogTitle>Meeting Schedules</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {meetings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">No meetings scheduled yet.</p>
              <p className="text-sm text-gray-400">Meetings will appear here after someone schedules a virtual demo.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Meeting Date</TableHead>
                  <TableHead>Meeting Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payroll Status</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetings.map((meeting) => (
                  <TableRow
                    key={meeting.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    <TableCell>{meeting.companyName}</TableCell>
                    <TableCell>
                      <p>
                        <strong>Contact:</strong> {meeting.contactPerson}
                      </p>
                      <p>
                        <strong>Number:</strong> {meeting.contactNumber}
                      </p>
                      <p>
                        <strong>Client Emails:</strong> {meeting.clientEmails}
                      </p>
                      <p>
                        <strong>RM/AM Emails:</strong> {meeting.rmEmails}
                      </p>
                    </TableCell>
                    <TableCell>{meeting.meetingDate}</TableCell>
                    <TableCell>{meeting.meetingTime}</TableCell>
                    <TableCell>
                      {user?.role === "McashDivision" && (
                        <Select
                          defaultValue={meeting.status}
                          onValueChange={(value) => handleStatusChange(meeting.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Endorsed">Endorsed</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      {user?.role === "SpbdDivision" && (
                        <Select
                          defaultValue={meeting.status}
                          onValueChange={(value) => handleStatusChange(meeting.id, value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      {user?.role === "RegionalManager" && meeting.status}
                    </TableCell>
                    <TableCell
                      className="max-w-[200px] truncate"
                      title={getPayrollStatusDisplay(meeting.payrollStatus)}
                    >
                      {getPayrollStatusDisplay(meeting.payrollStatus)}
                    </TableCell>
                    <TableCell>{meeting.dateSubmitted}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {user?.role === "SpbdDivision" && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReschedule(meeting.id)
                            }}
                            size="sm"
                          >
                            Reschedule
                          </Button>
                        )}
                        {user?.role === "McashDivision" && (
                          <>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(meeting.id)
                              }}
                              variant="destructive"
                              size="sm"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleForward(meeting.companyName)
                              }}
                              variant="outline"
                              size="sm"
                            >
                              Forward
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
      {selectedMeeting && (
        <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Meeting Details</DialogTitle>
            </DialogHeader>
            <Card>
              <CardHeader>
                <CardTitle>{selectedMeeting.companyName}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Contact Person:</p>
                  <p>{selectedMeeting.contactPerson}</p>
                </div>
                <div>
                  <p className="font-semibold">Contact Number:</p>
                  <p>{selectedMeeting.contactNumber}</p>
                </div>
                <div>
                  <p className="font-semibold">Meeting Date:</p>
                  <p>{selectedMeeting.meetingDate}</p>
                </div>
                <div>
                  <p className="font-semibold">Meeting Time:</p>
                  <p>{selectedMeeting.meetingTime}</p>
                </div>
                <div>
                  <p className="font-semibold">Status:</p>
                  <p>{selectedMeeting.status}</p>
                </div>
                <div>
                  <p className="font-semibold">Date Submitted:</p>
                  <p>{selectedMeeting.dateSubmitted}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">Payroll Status:</p>
                  <p>{getPayrollStatusDisplay(selectedMeeting.payrollStatus)}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">Client Emails:</p>
                  <p>{selectedMeeting.clientEmails}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">RM/AM Emails:</p>
                  <p>{selectedMeeting.rmEmails}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex space-x-2">
                    {user?.role === "McashDivision" && (
                      <>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(selectedMeeting.id)
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleForward(selectedMeeting.companyName)
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Forward
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}

export default MeetingSchedules;
