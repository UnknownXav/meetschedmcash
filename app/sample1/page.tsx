import { getAllMeeting} from "@/lib/serviceclient/meeting.service"; 
import ScheduleMeeting from "./_components/ScheduleMeeting"; 

export default async function Meeting() {
    const resp = await getAllMeeting(); 

   

    return (
        <div className="w-full">
            <p>Meeting Sample</p>
            <div className="flex flex-col justify-center">
                <ScheduleMeeting />
                {resp.map((val) => {
                    return (
                        <div key={val.id} className="w-[50%] p-3 my-2 border border-grey-300 shadow-md mx-auto">
                            <p className="text-lg">
                                Company Name: {val.companyName}
                            </p>
                            <p className="text-sm">
                                Contact Person: {val.contactPerson}
                            </p>
                            <p className="text-sm">
                                Contact Number: {val.contactNumber}
                            </p>
                            <p className="text-sm">
                                Meeting Date: {val.meetingDate}
                            </p>
                            <p className="text-sm">
                                Meeting Time: {val.meetingTime}
                            </p>
                            <p className="text-sm">
                                Status: {val.status}
                            </p>
                            <p className="text-sm">
                                Payroll Status: 
                                {val.payrollStatus === "others" ? val.payrollStatus : val.payrollStatus}
                                {/* Display the custom payroll status if "Others" is selected */}
                            </p>
                            <p className="text-sm">
                                Client Team Members' Email Addresses joining the meeting: {val.clientEmails}
                            </p>
                            <p className="text-sm">
                                RMs/AMs Team Members' Email Addresses joining the meeting: {val.rmEmails}
                            </p>
                            
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
