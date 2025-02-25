"use client"

import { getAllMeeting, deleteMeeting } from "@/lib/serviceclient/meeting.service"; 
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Define the type for a meeting
interface MeetingType {
  id: string;
  companyName: string;
  contactPerson: string;
  meetingDate: string;
  meetingTime: string;
  status: string;
  dateSubmitted: string;
}

export default function Meeting() {
  const [meetings, setMeetings] = useState<MeetingType[]>([]); // Set the type for meetings
  const { toast } = useToast();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const resp = await getAllMeeting();
      setMeetings(resp); // No more type error here
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch meetings.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMeeting(id);
      toast({
        title: "Success",
        description: "Meeting deleted successfully.",
      });
      fetchMeetings(); // Refetch meetings after deletion
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete meeting.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="flex flex-row justify-between text-2xl font-bold mb-6">Meeting Schedules</h2>

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
            {meetings.map((val) => (
              <TableRow key={val.id}>
                <TableCell>{val.companyName}</TableCell>
                <TableCell>{val.contactPerson}</TableCell>
                <TableCell>{val.meetingDate}</TableCell>
                <TableCell>{val.meetingTime}</TableCell>
                <TableCell>{val.status}</TableCell>
                <TableCell>{val.dateSubmitted}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(val.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}