import { LoginResponse } from "@/lib/dto/User.dto";
import { getSession } from "@/lib/utils/auth.utils";
import { headers } from "next/headers";
import LogoutButton from "./component/LogoutButton";
import Notifition from "./component/@NotificationButton/page";

export default async function NavBar() {
	const user =
		(await getSession()) as LoginResponse;

	if (!user) {
		return;
	}
	const { username, id, userType } =
		user;
	const headersList = headers();
	const currentPath =
		headersList.get("x-invoke-path") ||
		"Unknown";

	console.log("test", currentPath);
	return (
		<div className="  w-full h-[50px]  bg-white shadow-md flex flex-row items-center justify-between px-10">
			<div className=" h-full flex flex-row gap-5 items-center">
				<p className=" font-semibold">
					MCash
				</p>
			</div>
			<div className=" h-full w-fit flex flex-row items-center gap-10">
				<div className=" flex flex-row h-full gap-3 items-center">
					<div className=" h-[30px] w-[30px] bg-gray-200 rounded-full" />
					<p>{username}</p>
				</div>
				<Notifition
					id={id}
					userType={userType}
				/>
				<LogoutButton />
			</div>
		</div>
	);
}
