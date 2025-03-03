"use client";

import { SaveClientType } from "@/lib/types/client.type";
import { useState } from "react";

export default function AddClient() {
	const [username, setUsername] =
		useState<string>("");
	async function handleSubmit() {
		try {
			if (!username) {
				alert("Username required");
				return;
			}

			const payload: SaveClientType = {
				username: username,
				password: username,
				dateCreated:
					new Date().toISOString(),
				active: false,
				createdBy: "sample user",
				isPasswordUpdated: false,
			};
			const resp = await saveClient(
				payload
			);

			if (resp.status == 200) {
				if (
					confirm("Successfully added")
				) {
					window.location.reload();
				}
			}
		} catch (error) {
			alert("Internal server error");
		}
	}

	return (
		<div className=" w-[50%] mx-auto">
			<div className=" flex flex-row gap-3">
				<input
					className=" p-3 border border-grey-500 w-full rounded-md"
					placeholder="Username"
					onChange={(e) =>
						setUsername(e.target.value)
					}
				/>
				<button
					onClick={() => handleSubmit()}
					className=" p-3 bg-red-500  text-white rounded-md"
				>
					Submit
				</button>
			</div>
		</div>
	);
}
