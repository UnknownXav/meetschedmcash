import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ClientDto } from "@/lib/dto/Client.dto"
import { UserType } from "@/lib/dto/User.dto"

type Props = {
  children: React.ReactNode
  id: string
  userType: UserType
  data: ClientDto
}

export default function ViewModal(props: Props) {
  const { data } = props
  return (
    <Sheet>
      <SheetTrigger asChild>{props.children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{data.company.name}</SheetTitle>
          <SheetDescription>{data.company.email}</SheetDescription>
        </SheetHeader>
        <div className=" border-t border-t-gray-300 my-2" />
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-row justify-between">
            <div>
              <p className=" text-[10px] text-grey">Contact Person</p>
              <p className=" bg-gray-50 px-3 py-1">
                {data.company.contactPerson}
              </p>
            </div>
            <div>
              <p className=" text-[10px] text-grey">Contact No.</p>
              <p className=" bg-gray-50 px-3 py-1">
                {data.company.contactNumber}
              </p>
            </div>
          </div>
          <div>
            <p className=" text-[10px] text-grey mt-3">Contact No.</p>
            <p className=" bg-gray-50 px-3 py-1">
              {data.company.contactNumber}
            </p>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
