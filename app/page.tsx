import { getSession } from "@/lib/utils/auth.utils";
import { redirect } from "next/navigation";

export default async function SignIn() {
	const session = await getSession();

	if (session) {
		redirect("/dashboard");
	}
}
