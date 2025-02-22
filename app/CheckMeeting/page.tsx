import { getAllMeeting } from "@/lib/serviceclient/meeting.service"; 
import ScheduleMeeting from "../ScheduleMeeting/page"; 

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function Meeting() {
  const resp = await getAllMeeting();


  const userRole = "McashDivision";

  //const statusOptions = userRole === "McashDivision"
   // ? ["Confirmed", "Endorsed"]
   // : ["Rescheduled"];

 
  return (

    <Card className="p-6">
      <h2 className="flex flex-row justify-between text-2xl font-bold mb-6">Meeting Schedules</h2>

      <ScrollArea className="h-[60vh] pr-4">
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
          {resp.map((val) => (
            <TableRow key={val.id}>
              <TableCell>{val.companyName}</TableCell>
              <TableCell>{val.contactPerson}</TableCell>
              <TableCell>{val.meetingDate}</TableCell>
              <TableCell>{val.meetingTime}</TableCell>
              <TableCell>{val.status}</TableCell>
              <TableCell>{val.dateSubmitted}</TableCell>              
            </TableRow>
           ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}