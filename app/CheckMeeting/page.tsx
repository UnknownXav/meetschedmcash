"use client";

import { getAllMeeting } from "@/lib/serviceclient/meeting.service"; 
import { deleteMeeting } from "@/lib/services/meeting.service";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { db } from "@/lib/firebase";
import { MeetingType } from "@/lib/types/meeting.type";
import { addDoc, collection } from "firebase/firestore";



export default function Meeting() {
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MeetingType[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingType | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchMeetings();
  }, []);

  useEffect(() => {
    filterMeetings();
  }, [meetings, statusFilter, searchTerm]);

  const fetchMeetings = async () => {
    try {
      const resp = await getAllMeeting();
      setMeetings(resp);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch meetings.",
        variant: "destructive",
      });
    }
  };

  const filterMeetings = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const filtered = meetings.filter((meeting) => {
      const [year, month] = meeting.meetingDate.split("-").map(Number);
      return year === currentYear && month === currentMonth && meeting.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (statusFilter !== "All") {
      setFilteredMeetings(filtered.filter((meeting) => meeting.status === statusFilter));
    } else {
      setFilteredMeetings(filtered);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateMeetingStatus(id, newStatus);
      toast({
        title: "Success",
        description: "Meeting status updated successfully.",
      });
      fetchMeetings();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update meeting status.",
        variant: "destructive",
      });
    }
  };

  const handledeleteMeeting = async (id: string) => {
    try {      
      await deleteMeeting(id); 
        
      const updatedMeetings = meetings.filter((meeting) => meeting.id !== id);
        
      setMeetings(updatedMeetings);        
      toast({
        title: "Meeting Deleted",
        description: "The meeting has been successfully deleted.",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } catch (error) {
      toast({
        title: "Error Deleting Meeting",
        description: "There was an error deleting the meeting.",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  const handleForward = async (companyName: string) => {
    try {
      const forwardedRef = collection(db, "forwardedCompanies");
      await addDoc(forwardedRef, { companyName, timestamp: new Date() });
      alert(`${companyName} has been forwarded to Track Referral Status.`);
      setMeetings([]);
    } catch (error) {
      console.error("Error forwarding company: ", error);
      alert("Failed to forward company. Please try again.");
    }
  }
  
  

  return (
    <Card className="p-6">
      <Button variant="outline" onClick={() => router.push("/dashboard")} className="mb-4 flex float-left items-center gap-2">
        <ArrowLeft size={16} />
        Back
      </Button>
      <h2 className="text-2xl text-center font-bold mb-6">Meeting Schedules</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by company name..."
          className="p-2 border rounded w-[450px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="All">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Endorsed">Endorsed</SelectItem>
            <SelectItem value="Rescheduled">Rescheduled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[80svh] pr-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Meeting Date</TableHead>
              <TableHead>Meeting Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMeetings.length > 0 ? (
              filteredMeetings.map((val) => (
                <TableRow key={val.id} className="cursor-pointer hover:bg-gray-100" onClick={() => setSelectedMeeting(val)}>
                  <TableCell>{val.companyName}</TableCell>
                  <TableCell>{val.contactPerson}</TableCell>
                  <TableCell>{val.meetingDate}</TableCell>
                  <TableCell>{val.meetingTime}</TableCell>
                  <TableCell>
                    <Select onValueChange={(newStatus) => handleStatusChange(val.id, newStatus)} defaultValue={val.status}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder={val.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Endorsed">Endorsed</SelectItem>
                        <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{val.dateSubmitted}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={(e) => { e.stopPropagation(); handledeleteMeeting(val.id); }}>
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell>
                <Button onClick={(e) => { e.stopPropagation(); handleForward(val.companyName); }}
                  variant="secondary">
                  Forward
                </Button>
                </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No meetings found for this month.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>


      {selectedMeeting && (
        <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Meeting Details</DialogTitle>
              <DialogDescription>
                <p><strong>Company :</strong> {selectedMeeting.companyName}</p>
                <p><strong>Contact Person:</strong> {selectedMeeting.contactPerson}</p>
                <p><strong>Contact Number:</strong> {selectedMeeting.contactNumber}</p>
                <p><strong>Meeting Date:</strong> {selectedMeeting.meetingDate}</p>
                <p><strong>Meeting Time:</strong> {selectedMeeting.meetingTime}</p>
                <p><strong>Client Emails:</strong> {selectedMeeting.clientEmails}</p>
                <p><strong>RM Emails:</strong> {selectedMeeting.rmEmails}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

function updateMeetingStatus(id: string, newStatus: string) {
  throw new Error("Function not implemented.");
}
