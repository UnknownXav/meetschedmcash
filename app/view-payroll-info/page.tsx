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

		<><Link
			href="/dashboard"
			className=" flex flex-row items-center gap-3 hover:text-red-500"
		>
			<ChevronLeft size={20} /> Back
		</Link>
		<div className=" w-[50%] m-auto mt-10">

				<div className="font-bold text-xl font-red text-red-500 text-left">
					About ML Payroll PRO
				</div>
				<div className="text-sm text-justify text-black">
					ML Payroll Pro is a cutting-edge payroll system designed specifically for Micro, Small, and Medium Enterprises (MSMEs)
					aiming to streamline and automate their payroll processes. This solution is particularly beneficial for businesses currently reliant on manual handling,
					cash payroll, or individual transfers.
				</div>

				<div className=" flex flex-row justify-end py-3 border-b items-center">

					<CreateButton
						userType={userType} />
				</div>

				<div className=" h-3" />
				{data.map((val) => {
					return (
						<ItemCard
							key={val.id}
							{...val} />
					);
				})}
			</div></>
	);
}
