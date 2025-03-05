"use client";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/lib/component/Button";
import { ChangeMeetingStatus } from "@/lib/dto/Client.dto";
import { updateMeestingStatus } from "@/lib/services/meeting.service";
import { MeetingStatusEnum } from "@/lib/types/MeetingStatus.enum";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	children: React.ReactNode;
	id: string;
	meetingStatus: MeetingStatusEnum;
};

export default function ConfirmAlert(
	props: Props
) {
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	const isConfirmStatus =
		props.meetingStatus ===
		MeetingStatusEnum.CONFIRM;
	const headerMessage = isConfirmStatus
		? "Confirm Meeting"
		: "Endorse Client";

	const message = isConfirmStatus
		? "Confirm meeting"
		: "Are you sure do you want to endorse this client to SPBD?";

	async function handleClick() {
		try {
			const payload: ChangeMeetingStatus =
				{
					meetingStatus:
						props.meetingStatus,
				};
			const resp =
				await updateMeestingStatus(
					props.id,
					payload
				);
			if (resp) {
				location.reload();
				toast.success(
					"Successfully Upated"
				);
			}
		} catch (error) {
			toast.error(
				"Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{props.children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{headerMessage}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{message}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						Cancel
					</AlertDialogCancel>
					<Button
						onClick={() =>
							handleClick()
						}
					>
						{isLoading
							? "Loading..."
							: "Confirm"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
