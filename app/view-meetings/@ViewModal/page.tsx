import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/data/components/ui/sheet"
import Button, { ButtonType } from "@/lib/component/Button"
import { ClientDto } from "@/lib/dto/Client.dto"
import { UserType } from "@/lib/dto/User.dto"
import Alert from "../@Alert/page"
import Reschedule from "../@Reschedule/page"
import { MeetingStatusEnum } from "@/lib/types/MeetingStatus.enum"
import RequestToReschedule from "../@RequestToReschedule/page"

type Props = {
  children: React.ReactNode
  id: string
  userType: UserType
  data: ClientDto
}

export default function ViewModal(props: Props) {
  const { data, userType } = props
  const displayEndorseButton = () => {
    const includedUser = [UserType.ADMIN, UserType.MCASH]
    if (includedUser.includes(userType) && data.meetingBy === UserType.MCASH) {
      return (
        <Alert>
          <Button buttonType={ButtonType.OUTLINE}>Endorse</Button>
        </Alert>
      )
    }
  }

  const displayConfirmButton = () => {
    const userTypeIncluded = [UserType.ADMIN, UserType.MCASH, UserType.SPBD]
    const meetingStatusIncluded = [
      MeetingStatusEnum.PENDING,
      MeetingStatusEnum.ENDORSE,
    ]

    if (
      userTypeIncluded.includes(userType) &&
      meetingStatusIncluded.includes(data.meetingStatus)
    ) {
      return (
        <Alert>
          <Button>Confirm</Button>
        </Alert>
      )
    }
  }

  const displayButtonToReschedule = () => {
    if (
      userType === UserType.RMS &&
      data.meetingStatus === MeetingStatusEnum.RESCHEDULE
    ) {
      return (
        <div className=" flex justify-end mt-3">
          <Reschedule
            date={data?.meetings?.date}
            updatedBy={userType}
            time={data?.meetings?.time}
            id={data.id}
          >
            <Button className=" w-fit " buttonType={ButtonType.NEUTRAL}>
              Reschedule
            </Button>
          </Reschedule>
        </div>
      )
    }
  }

  const displayButtonToRequestToReschedule = () => {
    const includeArray = [UserType.MCASH, UserType.SPBD]
    const includedStatus = [
      MeetingStatusEnum.PENDING,
      MeetingStatusEnum.ENDORSE,
    ]
    if (
      includeArray.includes(userType) &&
      includedStatus.includes(data.meetingStatus)
    ) {
      return (
        <RequestToReschedule id={data.id}>
          <Button className="  " buttonType={ButtonType.NEUTRAL}>
            Request to Reschedule
          </Button>
        </RequestToReschedule>
      )
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{props.children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{data?.company?.name}</SheetTitle>
          <SheetDescription>{data?.company?.email}</SheetDescription>
        </SheetHeader>
        <div className=" border-t border-t-gray-300 my-2" />
        <p className=" font-bold">Company Info</p>
        <div className=" h-3" />
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-row justify-between">
            <div>
              <p className=" text-[10px] text-grey">Contact Person</p>
              <p className=" bg-gray-50 px-3 py-1">
                {data?.company?.contactPerson}
              </p>
            </div>
            <div>
              <p className=" text-[10px] text-grey mt-3">Contact No.</p>
              <p className=" bg-gray-50 px-3 py-1">
                {data?.company?.contactNumber}
              </p>
            </div>
          </div>

          <div>
            <p className=" text-[10px] text-grey">Estimated No. Employee</p>
            <p className=" bg-gray-50 px-3 py-1">
              {data?.company?.estimatedNumberEmployee} employees
            </p>
          </div>
          <div>
            <p className=" text-[10px] text-grey">Client Payroll Status</p>
            <p className=" bg-gray-50 px-3 py-1">
              {data?.company?.payrollStatus} employees
            </p>
          </div>
          <p className=" font-semibold my-3">Meeting Information</p>
          <div className=" flex flex-row justify-between">
            <div>
              <p className=" text-[10px] text-grey">Meeting Date</p>
              <p className=" bg-gray-50 px-3 py-1">{data?.meetings?.date}</p>
            </div>
            <div>
              <p className=" text-[10px] text-grey">Time</p>
              <p className=" bg-gray-50 px-3 py-1">{data?.meetings?.time}</p>
            </div>
          </div>

          <div>
            <p className=" text-[10px] text-grey">Referred By</p>
            <p className=" bg-gray-50 px-3 py-1">{data?.referedBy?.email}</p>
          </div>
          <div>
            <p className=" text-[10px] text-grey">Host By</p>
            <p className=" bg-gray-50 px-3 py-1">{data?.meetingBy}</p>
          </div>
        </div>
        {data.meetingStatus === MeetingStatusEnum.RESCHEDULE && (
          <div className=" mt-3">
            <p className=" text-[10px] text-grey">
              Reason of request reschedule
            </p>
            <p className=" bg-gray-50 px-3 py-1">{data?.remarks}</p>
          </div>
        )}

        <SheetFooter className=" mt-10">
          {displayEndorseButton()}
          {displayButtonToReschedule()}

          {displayConfirmButton()}
        </SheetFooter>
        <SheetFooter className=" w-full mt-3">
          {displayButtonToRequestToReschedule()}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
