"use client";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/data/components/ui/dialog";
import Button from "@/lib/component/Button";
import Input from "@/lib/component/Input";
import { RequestToReschedulePayload } from "@/lib/dto/Client.dto";
import { requestReschedule } from "@/lib/services/meeting.service";
import {
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";

type Props = {
	children: React.ReactNode;
	id: string;
};

export default function RequestToReschedule(
	props: Props
) {
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	const [remarks, setRemarks] =
		useState<string>("");
	const [error, setError] =
		useState<string>("");
	const [isOpen, setIsOpen] =
		useState<boolean>(true);
	async function handleRequest() {
		try {
			setIsLoading(true);

			if (!remarks) {
				setError(
					"This field is required"
				);
				return;
			}
			const payload: RequestToReschedulePayload =
				{
					remarks: remarks,
				};
			const resp =
				await requestReschedule(
					props.id,
					payload
				);

			if (!resp) {
				toast.success(
					"Successfully Updated"
				);
				return;
			}
		} catch (error) {
			toast.error(
				"Something went wrong. try again later"
			);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		setError("");
	}, [remarks]);
	return (
		<Dialog>
			<DialogTrigger asChild>
				{props.children}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Request to Reschedule
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col">
					<div className=" flex flex-col gap-4">
						<Input
							placeholder="Reason..."
							value={remarks}
							onChange={(e) =>
								setRemarks(
									e.target.value
								)
							}
							error={error}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={() =>
							handleRequest()
						}
					>
						{isLoading
							? "Loading.."
							: "Submit"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
