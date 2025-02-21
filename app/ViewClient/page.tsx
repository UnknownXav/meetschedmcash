import { getAllClient } from "@/lib/serviceclient/client.service";


export default async function Sample() {
	const resp = await getAllClient();

	return (
		<div className=" w-full ">
			<p>Sample</p>
			<div className=" flex flex-col justify-center">
			
				{resp.map((val) => {
					return (
						<div className=" w-[50%] p-3 my-2 border border-grey-300 shadow-md mx-auto">
							<p className=" text-lg">
								{val.username}
							</p>
							<p className=" text-sm">
								{val.dateCreated}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
