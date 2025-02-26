import { getAllMeeting } from "@/lib/serviceclient/meeting.service"
import SearchMeetings from "./@SearchMeeting/page";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type PageParams = {
    params:any,
    searchParams:{query:string}
}

type Props = PageParams


export default async function MeetingList(props:Props){
    
    const {query} = props.searchParams
    
    console.log(query)
    
    const meetings = await getAllMeeting();
    const filterData = meetings.filter(val=>{
        const company = val.companyName ? val?.companyName?.toUpperCase() : ""?.toUpperCase()
        const searchParams = query?.toUpperCase();
    
        return company.indexOf(searchParams) > -1;
    })

    const data = query ? filterData : meetings;
    return (<div>
        <SearchMeetings/>
    {data.map(val=>{
        
        return <div><p>{val.companyName}</p>
        <Dialog >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Meeting Details</DialogTitle>
              <DialogDescription>
                <p><strong>Company :</strong> {val.companyName}</p>
                <p><strong>Contact Person:</strong> {val.contactPerson}</p>
                <p><strong>Contact Number:</strong> {val.contactNumber}</p>
                <p><strong>Meeting Date:</strong> {val.meetingDate}</p>
                <p><strong>Meeting Time:</strong> {val.meetingTime}</p>
                <p><strong>Client Emails:</strong> {val.clientEmails}</p>
                <p><strong>RM Emails:</strong> {val.rmEmails}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog></div>
    })}
    </div>)
}