import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/data/components/ui/table";
import { LoginResponse } from "@/lib/dto/User.dto";
import { getRms } from "@/lib/services/user.service";
import { formatDate } from "@/lib/utils/date.utils";
import {
	ChevronLeft,
	PencilLine,
} from "lucide-react";
import Link from "next/link";

export default async function ViewRms() {
	const rmsUser =
		(await getRms()) as Array<LoginResponse>;
	return (
		<div className="w-full flex-row   ">
			<div className=" my-6 flex flex-row w-[70%] m-auto items-center justify-between">
				<Link
					href="/dashboard"
					className=" flex flex-row items-center gap-3 hover:text-red-500"
				>
					<ChevronLeft size={20} /> Back
				</Link>
				<h1 className="text-2xl font-bold text-center ">
					Regional Managers Account
				</h1>
				<div className=" w-[18px]" />
			</div>

			<Table className=" w-[50%] m-auto">
				<TableHeader>
					<TableRow>
						<TableHead className="">
							Name
						</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>
							Designation
						</TableHead>
						<TableHead className="">
							Date Created
						</TableHead>
						<TableHead className="">
							Added By
						</TableHead>
						<TableHead className="text-right">
							Action
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{rmsUser.map((val) => (
						<TableRow key={val.id}>
							<TableCell className="font-medium">
								{`${val.firstname} ${val.middlename} ${val.lastname}`}
							</TableCell>
							<TableCell>
								{val.email}
							</TableCell>
							<TableCell>
								{val.userLocation}
							</TableCell>
							<TableCell className="">
								{formatDate(
									val?.createdDate
								)}
							</TableCell>
							<TableCell className="">
								{val.createdBy}
							</TableCell>
							<TableCell className=" text-right">
								<button className=" rounded-full p-2 bg-red-500">
									<PencilLine
										size={12}
										color="white"
									/>
								</button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
