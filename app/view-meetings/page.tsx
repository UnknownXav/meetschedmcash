import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/data/components/ui/table";

import { displayMeetingByStatus } from "@/lib/utils/meeting.utils";
import { MeetingStatusEnum } from "@/lib/types/MeetingStatus.enum";
import {
	ChevronLeft,
	Eye,
	PencilLine,
} from "lucide-react";
import ViewModal from "./@ViewModal/page";
import { LoginResponse } from "@/lib/dto/User.dto";
import { ClientDto } from "@/lib/dto/Client.dto";
import { getClientMeetings } from "@/lib/services/meeting.service";
import { getSession } from "@/lib/utils/auth.utils";
import Link from "next/link";

export default async function ViewMeetings() {
	const user =
		(await getSession()) as LoginResponse;

	const { id, userType } = user;

	const meeting =
		(await getClientMeetings(
			id,
			userType
		)) as Array<ClientDto>;
	return (
		<div className="w-full flex-row   ">
			<div className=" my-6 flex flex-row w-[70%] m-auto items-center justify-between">
				<Link
					href="/dashboard"
					className=" flex flex-row items-center gap-3 hover:text-red-500"
				>
					<ChevronLeft size={20} /> Back
				</Link>
				<h1 className="text-2xl font-bold text-center ">
					Meeting Schedule
				</h1>
				<div className=" w-[18px]" />
			</div>

			<Table className=" max-w-[70%] m-auto">
				<TableHeader>
					<TableRow>
						<TableHead>
							Company Name
						</TableHead>
						<TableHead className=" text-center">
							No. Employee
						</TableHead>
						<TableHead>
							Meeting Date
						</TableHead>
						<TableHead>Time</TableHead>
						<TableHead>
							Status
						</TableHead>
						<TableHead>
							Lead by
						</TableHead>

						<TableHead className=" text-right">
							Action
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{meeting.map((val) => {
						let color = "";
						if (
							val.meetingStatus ===
							MeetingStatusEnum.PENDING
						) {
							color = "text-yellow-500";
						} else if (
							val.meetingStatus ===
							MeetingStatusEnum.ENDORSE
						) {
							color = "text-blue-500";
						} else if (
							val.meetingStatus ===
							MeetingStatusEnum.RESCHEDULE
						) {
							color = "text-orange-500";
						} else {
							color = "text-green-500";
						}

						return (
							<TableRow key={val.id}>
								<TableCell className="font-medium">
									{val.company.name}
								</TableCell>
								<TableCell className=" text-center">
									{
										val.company
											.estimatedNumberEmployee
									}
								</TableCell>
								<TableCell>
									{val.meetings.date}
								</TableCell>
								<TableCell>
									{val.meetings.time}
								</TableCell>
								<TableCell
									className={`${color}`}
								>
									{displayMeetingByStatus(
										val.meetingStatus
									)}
								</TableCell>
								<TableCell>
									{val.meetingBy}
								</TableCell>

								<TableCell className=" text-blue-500 cursor-pointer">
									<div className=" flex flex-row gap-3 justify-end">
										<ViewModal
											data={val}
											id={"1212"}
											userType={
												userType
											}
										>
											<button className=" rounded-full p-2 bg-red-200">
												<Eye
													size={12}
													color="black"
												/>
											</button>
										</ViewModal>
										<button className=" rounded-full p-2 bg-red-500">
											<PencilLine
												size={12}
												color="white"
											/>
										</button>
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
