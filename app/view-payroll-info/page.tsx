import { getSession } from "@/lib/utils/auth.utils";
import CreateButton from "./_component/CreateButton";
import { LoginResponse } from "@/lib/dto/User.dto";
import { getDocsList } from "@/lib/services/payrollinfo.service";
import { PayrollDocsInfoDto } from "@/lib/dto/PayrollDocsDto.dto";
import ItemCard from "./_component/ItemCard";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function ViewPayrollInfo() {
	const session =
		(await getSession()) as LoginResponse;

	if (!session) {
		return;
	}
	const data =
		(await getDocsList()) as PayrollDocsInfoDto[];
	const { userType } = session;
	return (
		<div className=" w-[50%] m-auto mt-10">
			<div className=" flex flex-row justify-between py-3 border-b items-center">
			<Link
					href="/dashboard"
					className=" flex flex-row items-center gap-3 hover:text-red-500"
				>
					<ChevronLeft size={20} /> Back
				</Link>

				<p className=" font-bold text-lg font-red text-red-400">
					About ML Payroll PRO
				</p>
				<div className=" font text-lg">
					ML Payroll Pro is cutting-edge payroll system designed specifically for Micro, Small, and Medium Enterprises (MSMEs) 
					aiming to streamline and automate their payroll processes. This solution is particularly beneficial for businesses currently reliant on manual handling, 
					cash payroll, or individual transfers. 
				</div>

				<CreateButton
					userType={userType}
				/>
			</div>
			<div className=" h-3" />
			{data.map((val) => {
				return (
					<ItemCard
						key={val.id}
						{...val}
					/>
				);
			})}
		</div>
	);
}
