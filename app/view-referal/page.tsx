import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/data/components/ui/table";
import { getReferal } from "@/lib/services/client.service";
import { getSession } from "@/lib/utils/auth.utils";
import { ChevronLeft } from "lucide-react";
import { ClientDto } from "@/lib/dto/Client.dto";
import Link from "next/link";
import RowItem from "./@RowItem/page";

export default async function ViewReferal({
	searchParams,
}: {
	searchParams: {
		[key: string]: string;
	};
}) {
	const session = await getSession();

	if (!session) {
		return <div></div>;
	}

	const { id, userType } = session;

	const resp = (await getReferal(
		id,
		userType
	)) as Array<ClientDto>;
	const queryId = searchParams?.id;
	return (
		<div className="w-full flex-row   ">
			<div className=" my-6 flex flex-row w-[70%] m-auto items-center justify-between">
				<Link
					href="/dashboard"
					className=" flex flex-row items-center gap-3 hover:text-red-500"
				>
					<ChevronLeft size={20} />
					Back
				</Link>
				<h1 className="text-2xl font-bold text-center ">
					Track Referal Status
				</h1>
				<div className=" w-[18px]" />
			</div>

			<Table className=" max-w-[70%] m-auto">
				<TableHeader>
					<TableRow>
						<TableHead>
							Company Name
						</TableHead>
						<TableHead className=" text-center">
							No. Employee
						</TableHead>
						<TableHead>
							Meeting Date
						</TableHead>
						<TableHead>Time</TableHead>
						<TableHead>
							Lead by
						</TableHead>

						<TableHead>
							Status
						</TableHead>

						<TableHead className=" text-right">
							Action
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{resp.map((val) => {
						return (
							<RowItem
								userType={userType}
								key={val.id}
								item={val}
								queryId={queryId}
							/>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
