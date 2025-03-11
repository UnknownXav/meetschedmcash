"use client";
import Button from "@/lib/component/Button";
import { PayrollDocsInfoDto } from "@/lib/dto/PayrollDocsDto.dto";

type Props = PayrollDocsInfoDto;

export default function ItemCard(
	props: Props
) {
	const { title, description, link } =
		props;

	function openNewTab() {
		window.open(link);
	}
	return (
		<div className=" shadow-md bg-white border-gray-200 border rounded-md w-full p-5 flex flex-row justify-between my-3 ">
			<div className=" flex flex-col gap-6">
				<p className="  font-bold text-red-500">
					{title}
				</p>
				<p className=" text-sm">
					{description}
				</p>
			</div>
			<div className=" flex justify-center items-center px-5">
				<Button onClick={openNewTab}>
					view
				</Button>
			</div>
		</div>
	);
}
