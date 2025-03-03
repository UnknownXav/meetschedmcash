import Link from "next/link";
import {
	Video,
	Calendar,
	UserPlus,
	List,
	UserCheck,
	PlayCircle,
} from "lucide-react";
import { getSession } from "@/lib/utils/auth.utils";
import {
	LoginResponse,
	UserType,
} from "@/lib/dto/User.dto";
import {
	rmAccountCreation,
	scheduleDemo,
	trackReferal,
	viewMeetings,
	viewRmsAccount,
} from "@/lib/constant/feature";

export default async function Dashboard() {
	const user =
		(await getSession()) as LoginResponse;

	const { userType } = user;

	return (
		<div className="flex flex-col items-center justify-center flex-1 bg-gray-100 h-full">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-red-600">
					WELCOME!
				</h1>
				<p className="text-lg text-gray-600 mt-2">
					How can I support you today?
				</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
				{scheduleDemo.includes(
					userType
				) && (
					<Link href="/create-client">
						<div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:bg-red-200 transition cursor-pointer">
							<Video
								className="text-red-600"
								size={50}
							/>
							<span className="mt-4 font-semibold text-gray-800">
								Schedule a Virtual Demo
							</span>
						</div>
					</Link>
				)}

				{viewMeetings.includes(
					userType
				) && (
					<Link href="/view-meetings">
						<div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:bg-red-200 transition cursor-pointer">
							<Calendar
								className="text-red-600"
								size={50}
							/>
							<span className="mt-4 font-semibold text-gray-800">
								Check Meeting Schedules
							</span>
						</div>
					</Link>
				)}

				{trackReferal.includes(
					userType
				) && (
					<Link href="/TrackReferral">
						<div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:bg-red-200 transition cursor-pointer">
							<UserCheck
								className="text-red-600"
								size={50}
							/>
							<span className="mt-4 font-semibold text-gray-800">
								Track Referral Status
							</span>
						</div>
					</Link>
				)}

				<Link href="/PayrollWalkthrough">
					<div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:bg-red-200 transition cursor-pointer">
						<PlayCircle
							className="text-red-600"
							size={50}
						/>
						<span className="mt-4 font-semibold text-gray-800">
							ML Payroll PRO Walkthrough
						</span>
					</div>
				</Link>

				{rmAccountCreation.includes(
					userType
				) && (
					<Link href="/create-account">
						<div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:bg-red-200 transition cursor-pointer">
							<UserPlus
								className="text-red-600"
								size={50}
							/>
							<span className="mt-4 font-semibold text-gray-800">
								{userType ===
								UserType.ADMIN
									? "Create User"
									: "Add RM account"}
							</span>
						</div>
					</Link>
				)}

				{viewRmsAccount.includes(
					userType
				) && (
					<Link href="/view-rms">
						<div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:bg-red-200 transition cursor-pointer">
							<List
								className="text-red-600"
								size={50}
							/>
							<span className="mt-4 font-semibold text-gray-800">
								View RM Accounts
							</span>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}
