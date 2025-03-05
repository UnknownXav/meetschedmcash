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
import { changeReferalStatus } from "@/data/Meeting.data";
import Button from "@/lib/component/Button";
import { ChangeReferalStatusDto } from "@/lib/dto/Client.dto";
import { ReferalStatusEnum } from "@/lib/types/MeetingStatus.enum";
import { displayReferalStatus } from "@/lib/utils/meeting.utils";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	children: React.ReactNode;
	status: ReferalStatusEnum;
	id: string;
	updateBy?: string;
};

export default function Alert(
	props: Props
) {
	const {
		id,
		status,
		updateBy = "meeting",
	} = props;
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	async function handleSubmit() {
		try {
			setIsLoading(true);
			const payload: ChangeReferalStatusDto =
				{
					referalStatus:
						status as ReferalStatusEnum,
				};
			const resp =
				await changeReferalStatus(
					id,
					payload
				);

			if (resp) {
				toast.success(
					"Successfully Updated"
				);
				if (updateBy === "meeting") {
					window.location.reload();

					return;
				} else {
					window.location.href =
						"/view-referal";
					return;
				}
			}
		} catch (error) {
			console.log(error);
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
						Change status
					</AlertDialogTitle>
					<AlertDialogDescription>
						do you want change the
						status to{" "}
						{displayReferalStatus(
							status as ReferalStatusEnum
						)}
						?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						Cancel
					</AlertDialogCancel>
					<Button
						onClick={() =>
							handleSubmit()
						}
					>
						{isLoading
							? "Loading..."
							: "Continue"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
