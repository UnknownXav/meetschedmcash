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
import { toast } from "sonner";

type Props = {
	children: React.ReactNode;
	status: string;
	id: string;
};

export default function Alert(
	props: Props
) {
	const { id, status } = props;
	async function handleSubmit() {
		try {
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
					"Successfully Upated"
				);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
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
						status to {status}?
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
						Continue
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
