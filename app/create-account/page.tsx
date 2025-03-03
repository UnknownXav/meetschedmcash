import { getSession } from "@/lib/utils/auth.utils";
import Form from "./@CreateAccountForm/page";
import { redirect } from "next/navigation";
import { LoginResponse } from "@/lib/dto/User.dto";

export default async function CreateAccount() {
	const session =
		(await getSession()) as LoginResponse;
	if (!session) {
		redirect("/");
	}

	const { userType, id } = session;
	return (
		<div className="flex justify-center mt-10 mb-19">
			<Form userType={userType} />
		</div>
	);
}
