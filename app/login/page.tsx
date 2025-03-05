"use client";
import Button from "@/lib/component/Button";
import Input from "@/lib/component/Input";
import { LoginDto } from "@/lib/dto/User.dto";
import { signIn } from "@/lib/services/auth.service";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
	const [username, setUsername] =
		useState<string>("");
	const [password, setPassword] =
		useState<string>("");

	const [
		usernameError,
		setUsernameError,
	] = useState<string>("");

	const [
		passwordError,
		setPasswordError,
	] = useState<string>("");

	const [isLoading, setIsLoading] =
		useState<boolean>(false);

	async function login() {
		try {
			setIsLoading(true);
			if (!username) {
				setUsernameError(
					"Username is required"
				);

				return;
			}

			if (!password) {
				setPasswordError(
					"Password is required"
				);

				return;
			}

			const payload: LoginDto = {
				username,
				password,
			};

			const resp = await signIn(
				payload
			);

			if (resp) {
				window.location.href =
					"/dashboard";
				toast.success(
					"Successfully Login"
				);
			}
		} catch (error: any) {
			toast.error(
				error.response.data.message
			);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
				{/* Left Column: Login Form */}
				<div className="flex flex-col justify-center space-y-6">
					<img
						src="/ml-logo.png"
						alt="ML Logo"
						className="h-24 object-contain mb-8"
					/>
					<div className="space-y-6 max-w-md">
						<h2 className="text-center text-4l font-bold text-gray-600">
							Please enter your
							credentials
						</h2>

						<Input
							type="text"
							id="emailOrUsername"
							name="emailOrUsername"
							placeholder="Email or Username"
							value={username}
							onChange={(e) =>
								setUsername(
									e.target.value
								)
							}
							className="w-full"
							error={usernameError}
						/>
						<Input
							type="password"
							id="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(e) =>
								setPassword(
									e.target.value
								)
							}
							className="w-full"
							error={passwordError}
						/>
						<Button
							onClick={() => login()}
							className="w-full bg-red-600 hover:bg-red-700"
						>
							{isLoading
								? "Loading..."
								: "Sign in"}
						</Button>
					</div>
				</div>

				{/* Right Column: Image (visible on md and larger screens) */}
				<div className="hidden md:block">
					<img
						src="/ml-payroll.jpg"
						alt="ML Payroll"
						className="w-full h-full object-cover rounded-lg"
					/>
				</div>
			</div>
		</div>
	);
}
