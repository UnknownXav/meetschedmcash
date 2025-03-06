"use client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/data/components/ui/popover";
import { payrollReferalStatusInfo } from "@/lib/constant/payrollReferalStatus";
import { ReferalStatusColors } from "@/lib/types/MeetingStatus.enum";
import { displayReferalStatus } from "@/lib/utils/meeting.utils";

export default function DisplayReferalStatus() {
	return (
		<div className=" max-w-[70%] mx-auto flex flex-row justify-between flex-wrap mt-10">
			{payrollReferalStatusInfo.map(
				(val) => {
					return (
						<Popover>
							<PopoverTrigger>
								<p
									className=" my-3 text-sm px-3 py-2 rounded-lg bg-opacity-10 text-white "
									style={{
										backgroundColor:
											ReferalStatusColors[
												val.id
											],
									}}
								>
									{displayReferalStatus(
										val.id
									)}
								</p>
							</PopoverTrigger>
							<PopoverContent>
								<p
									style={{
										color:
											ReferalStatusColors[
												val.id
											],
									}}
								>
									{val.description}
								</p>
							</PopoverContent>
						</Popover>
					);
				}
			)}
		</div>
	);
}

// return payrollReferalStatusInfo.map(
//     (val) => {
//         return (
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                         style={{
//                             backgroundColor:
//                                 ReferalStatusEnum[
//                                     val.id
//                                 ],
//                         }}
//                     >
//                         {displayReferalStatus(
//                             val.id
//                         )}
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-80">
//                     <div className="grid gap-4">
//                         <div className="space-y-2">
//                             <h4 className="font-medium leading-none">
//                                 {displayReferalStatus(
//                                     val.id
//                                 )}
//                             </h4>
//                             <p className="text-sm text-muted-foreground">
//                                 {val.description}
//                             </p>
//                         </div>
//                     </div>
//                 </PopoverContent>
//             </Popover>
//         );
//     }
// );
