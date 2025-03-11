"use client";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/data/components/ui/dialog";
import Button from "@/lib/component/Button";
import Input from "@/lib/component/Input";
import { CreatePayrollDocs } from "@/lib/dto/PayrollDocsDto.dto";
import { UserType } from "@/lib/dto/User.dto";
import { addPayrollInfo } from "@/lib/services/payrollinfo.service";
import {
	useEffect,
	useState,
} from "react";
import { toast } from "sonner";

type Props = {
	userType: UserType;
};

export default function CreateButton(
	props: Props
) {
	if (
		props.userType !== UserType.MCASH
	) {
		return <></>;
	}
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	const [title, setTitle] =
		useState<string>("");

	const [description, setDescription] =
		useState<string>("");

	const [link, setLink] =
		useState<string>("");

	const [titleError, setTitleError] =
		useState<string>("");

	const [
		descriptionError,
		setDescriptionError,
	] = useState<string>("");

	const [linkError, setLinkError] =
		useState<string>("");

	const isDataValid = () => {
		if (!title) {
			setTitleError(
				"Title is required"
			);
			return false;
		}

		if (!description) {
			setDescriptionError(
				"Description is required"
			);

			return false;
		}

		if (!link) {
			setLinkError("Link is required");
			return false;
		}

		return true;
	};

	useEffect(() => {
		setTitleError("");
	}, [title]);

	useEffect(() => {
		setDescriptionError("");
	}, [description]);

	useEffect(() => {
		setLinkError("");
	}, [link]);

	async function submit() {
		try {
			if (!isDataValid()) {
				return;
			}
			setIsLoading(true);
			const payload: CreatePayrollDocs =
				{
					title,
					description,
					link,
					dateCreated:
						new Date().toISOString(),
				};

			const resp = await addPayrollInfo(
				payload
			);

			if (resp) {
				toast.success(
					"Successfully Added"
				);
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>New</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Edit profile
					</DialogTitle>
					<DialogDescription>
						Make changes to your profile
						here. Click save when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<div className=" flex flex-col gap-3">
					<div className=" flex-col gap-1">
						<p className=" text-xs text-gray-400 px-2">
							Title
						</p>
						<Input
							value={title}
							onChange={(e) =>
								setTitle(e.target.value)
							}
							error={titleError}
						/>
					</div>
					<div className=" flex-col gap-1">
						<p className=" text-xs text-gray-400 px-2">
							Description
						</p>
						<Textarea
							value={description}
							onChange={(e) =>
								setDescription(
									e.target.value
								)
							}
						/>
						<p className="px-1 text-red-500 text-[10px]">
							{descriptionError}
						</p>
					</div>
					<div className=" flex-col gap-1">
						<p className=" text-xs text-gray-400 px-2">
							Link
						</p>
						<Input
							value={link}
							onChange={(e) =>
								setLink(e.target.value)
							}
							error={linkError}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						onClick={() => submit()}
					>
						{isLoading
							? "Loading..."
							: "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
