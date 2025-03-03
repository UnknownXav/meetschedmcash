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
} from "@/data/components/ui/alert-dialog";
import Button from "@/lib/component/Button";
import { axiosConfig } from "@/lib/config/axiosconfig";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	async function handleLogout() {
		try {
			setIsLoading(true);
			const resp =
				await axiosConfig.post(
					"logout"
				);
			if (resp) {
				window.location.href = "/";
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
				<LogOut size={20} />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Logout
					</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure do you want to
						logout?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						Cancel
					</AlertDialogCancel>
					<Button
						onClick={() =>
							handleLogout()
						}
					>
						{isLoading
							? "Loading..."
							: "Logout"}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
