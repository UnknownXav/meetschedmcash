import { getClientMeetings } from "@/lib/services/meeting.service"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/data/components/ui/table"

import { ClientDto } from "@/lib/dto/Client.dto"
import { displayMeetingByStatus } from "@/lib/utils/meeting.utils"
import { MeetingStatusEnum } from "@/lib/types/MeetingStatus.enum"
import { Eye, PencilLine } from "lucide-react"
import ViewModal from "./@ViewModal/page"
import { UserType } from "@/lib/dto/User.dto"
export default async function ViewMeetings() {
  const meeting = (await getClientMeetings()) as Array<ClientDto>

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center my-6">Meeting Schedule</h1>
      <Table className=" max-w-[70%] m-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead className=" text-center">No. Employee</TableHead>
            <TableHead>Meeting Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Lead by</TableHead>

            <TableHead className=" text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {meeting.map((val) => {
            let color = ""
            if (val.meetingStatus === MeetingStatusEnum.PENDING) {
              color = "text-yellow-500"
            } else if (val.meetingStatus === MeetingStatusEnum.ENDORSE) {
              color = "text-blue-500"
            } else if (val.meetingStatus === MeetingStatusEnum.RESCHEDULE) {
              color = "text-orange-500"
            }

            return (
              <TableRow key={val.id}>
                <TableCell className="font-medium">
                  {val.company.name}
                </TableCell>
                <TableCell className=" text-center">
                  {val.company.estimatedNumberEmployee}
                </TableCell>
                <TableCell>{val.meetings.date}</TableCell>
                <TableCell>{val.meetings.time}</TableCell>
                <TableCell className={`${color}`}>
                  {displayMeetingByStatus(val.meetingStatus)}
                </TableCell>
                <TableCell>{val.meetingBy}</TableCell>

                <TableCell className=" text-blue-500 cursor-pointer">
                  <div className=" flex flex-row gap-3 justify-end">
                    <ViewModal data={val} id={"1212"} userType={UserType.MCASH}>
                      <button className=" rounded-full p-2 bg-red-200">
                        <Eye size={12} color="black" />
                      </button>
                    </ViewModal>
                    <button className=" rounded-full p-2 bg-red-500">
                      <PencilLine size={12} color="white" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
