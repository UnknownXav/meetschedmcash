"use client";
import Alert from "@/app/view-meetings/@Alert/page";
import ViewModal from "@/app/view-meetings/@ViewModal/page";
import { TableCell, TableRow } from "@/data/components/ui/table";
import { ClientDto } from "@/lib/dto/Client.dto";
import { UserType } from "@/lib/dto/User.dto";
import { ReferalStatusColors, ReferalStatusEnum } from "@/lib/types/MeetingStatus.enum";
import { displayReferalStatus } from "@/lib/utils/meeting.utils";
import { Check, Eye, Pencil, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
	queryId: string;
	item: ClientDto;
	userType: UserType;
};

export default function RowItem(props: Props) {
	const { queryId, item, userType } = props;
	const [status, setStatus] = useState<ReferalStatusEnum>(item?.referalStatus);
	const [enrolledEmployees, setEnrolledEmployees] = useState<number>(item?.company?.estimatedNumberEmployee || 0);
	const [isEditing, setIsEditing] = useState<boolean>(false);

	// Function to handle updating the enrolled employees
	const handleUpdateEnrolledEmployees = () => {
		// You can add logic to handle updating the value in the backend or via an API call
		setIsEditing(false); // Exit editing mode after updating
		console.log("Updated Enrolled Employees:", enrolledEmployees);
	};

	return (
		<TableRow key={item?.id}>
			<TableCell className="text-right">
				{item?.company.name}
			</TableCell>

			{/* Enrolled Employees Input/Display */}
			<TableCell className="text-center">
				{queryId === item?.id && isEditing ? (
					<input
						type="number"
						value={enrolledEmployees}
						onChange={(e) => setEnrolledEmployees(Number(e.target.value))}
						className="p-1 text-center w-full border rounded-md"
					/>
				) : (
					<span>{enrolledEmployees}</span>
				)}
			</TableCell>

			<TableCell className="text-center">
				{item?.meetingBy}
			</TableCell>

			<TableCell
				className="text-center"
				style={{
					color: ReferalStatusColors[item.referalStatus] || "gray",
				}}
			>
				{queryId !== item?.id ? (
					displayReferalStatus(item.referalStatus)
				) : (
					<select
						className="p-1 rounded-lg text-white w-fit"
						style={{ backgroundColor: ReferalStatusColors[status] || "#ccc" }}
						onChange={(e) => setStatus(e.target.value as ReferalStatusEnum)}
						value={status}
					>
						{Object.values(ReferalStatusEnum)
							.filter((val) => ![ReferalStatusEnum.NONE, ReferalStatusEnum.OTHERS].includes(val))
							.map((status) => (
								<option key={status} value={status}>
									{status.replace(/_/g, " ")}
								</option>
							))}
					</select>
				)}
			</TableCell>

			{/* Action Buttons for Admin */}
			{userType === item.meetingBy ? (
				<TableCell className="flex justify-end">
					{queryId === item?.id && isEditing ? (
						<div className="flex flex-row gap-3 justify-end">
							<button className="p-2 rounded-full bg-green-800" onClick={handleUpdateEnrolledEmployees}>
								<Check size={14} color={"white"} />
							</button>
							<button className="p-2 rounded-full bg-red-800" onClick={() => setIsEditing(false)}>
								<X size={14} color={"white"} />
							</button>
						</div>
					) : (
						<div className="flex flex-row justify-end flex-1 gap-4">
							<button className="p-2 rounded-full bg-yellow-600" onClick={() => setIsEditing(true)}>
								<Pencil size={14} color={"white"} />
							</button>
							<ViewModal id={item.id} userType={UserType.ADMIN} data={item}>
								<button className="p-2 rounded-full bg-green-600">
									<Eye size={14} color="white" />
								</button>
							</ViewModal>
						</div>
					)}
				</TableCell>
			) : (
				<TableCell className="flex justify-end">
					<ViewModal id={item.id} userType={UserType.ADMIN} data={item}>
						<button className="p-2 rounded-full bg-green-600">
							<Eye size={14} color="white" />
						</button>
					</ViewModal>
				</TableCell>
			)}
		</TableRow>
	);
}
