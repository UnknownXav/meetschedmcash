"use client";

import Button from "@/lib/component/Button";
import Input from "@/lib/component/Input";
import Select from "@/lib/component/Select";
import { requiredMessage } from "@/lib/constant/errorMessage";
import {
	CreateUserDto,
	UserLocation,
	UserType,
} from "@/lib/dto/User.dto";
import { createUser } from "@/lib/services/user.service";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
	useEffect,
	useMemo,
	useState,
} from "react";
import { toast } from "sonner";

type Props = {
	userType: UserType;
};

export default function CreateAccountForm(
	props: Props
) {
	const { userType } = props;
	const defaulValue =
		userType !== UserType.ADMIN
			? UserType.RMS
			: UserType.MCASH;
	const [isLoading, setIsLoading] =
		useState<boolean>(false);
	const [user, setUser] =
		useState<string>(
			defaulValue.toString()
		);
	const defaulLocationValue = [
		UserType.ADMIN.toString(),
		UserType.MCASH.toString(),
		UserType.SPBD.toString(),
	].includes(user)
		? UserLocation.MAIN
		: UserLocation.LNCR;
	const [email, setEmail] =
		useState<string>("");

	const [fname, setFname] =
		useState<string>("");

	const [mname, setMname] =
		useState<string>("");

	const [lname, setLname] =
		useState<string>("");

	const [location, setLocation] =
		useState<string>(
			defaulLocationValue
		);
	const [username, setUsername] =
		useState<string>("");

	const [emailError, setEmailError] =
		useState<string>("");

	const [fnameError, setFnameError] =
		useState<string>("");

	const [lnameError, setLnameError] =
		useState<string>("");

	const [
		usernameError,
		setUsernameError,
	] = useState<string>("");

	function isValidEmail(
		email: string
	): boolean {
		const regex =
			/^[a-zA-Z0-9._%+-]+@mlhuillier\.com$/;
		return regex.test(email);
	}

	const displayLocation =
		useMemo(() => {
			if (user === UserType.RMS) {
				return (
					<Select
						value={location}
						onChange={(e) =>
							setLocation(
								e.target.value
							)
						}
					>
						<option
							value={UserLocation.LNCR}
						>
							{UserLocation.LNCR}
						</option>
						<option
							value={
								UserLocation.VISMIN
							}
						>
							{UserLocation.VISMIN}
						</option>
					</Select>
				);
			}
		}, [user, location, setLocation]);
	const displaySelectUserCreated =
		useMemo(() => {
			if (userType === UserType.ADMIN) {
				return (
					<Select
						value={user}
						onChange={(e) =>
							setUser(e.target.value)
						}
					>
						<option
							value={UserType.MCASH}
						>
							MCash
						</option>
						<option
							value={UserType.SPBD}
						>
							SPBD
						</option>
						<option
							value={UserType.RMS}
						>
							RMS
						</option>
					</Select>
				);
			}
		}, [userType, setUser, user]);

	useEffect(() => {
		if (fname && lname) {
			setUsername(
				`${fname
					.split(" ")?.[0]
					.toLowerCase()}.${lname
					.split(" ")?.[0]
					.toLocaleLowerCase()}@${user.toLowerCase()}`
			);
		}
	}, [
		user,
		fname,
		lname,
		displaySelectUserCreated,
	]);

	function isValidInput() {
		if (!email) {
			setEmailError(
				requiredMessage("Email ")
			);
			return false;
		}

		if (!isValidEmail(email)) {
			setEmailError(
				"Invalid email please use company email (@mlhuillier.com)"
			);
			return false;
		}

		if (!fname) {
			setFnameError(
				requiredMessage("Firstname ")
			);

			return false;
		}

		if (!lname) {
			setLnameError(
				requiredMessage("Lastname ")
			);
			return false;
		}

		if (!username) {
			setUsernameError(
				requiredMessage("Username ")
			);
		}

		return true;
	}

	async function handleSubmit() {
		try {
			if (!isValidInput()) {
				return;
			}
			setIsLoading(true);
			const payload: CreateUserDto = {
				userType: user as UserType,
				email: email,
				username: username,
				firstname: fname,
				middlename: mname,
				lastname: lname,
				password: username,
				createdBy: userType,
				userLocation: location,
			};

			const resp = await createUser(
				payload
			);

			if (resp) {
				setEmail("");
				setFname("");
				setMname("");
				setLname("");
				setUsername("");
				setUser(defaulValue);
				setLocation(
					defaulLocationValue
				);
				toast.success(
					"Successfully Created"
				);
			}
		} catch (error) {
			toast.error(
				"Something went wrong"
			);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		setFnameError("");
	}, [fname]);
	useEffect(() => {
		setEmailError("");
	}, [email]);
	useEffect(() => {
		setLnameError("");
	}, [lname]);
	useEffect(() => {
		setUsernameError("");
	}, [username]);

	return (
		<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
			<div className=" flex  items-center  flex-row justify-between mb-6">
				<Link href="/dashboard">
					<ChevronLeft size={20} />
				</Link>

				<h2 className="text-xl font-bold  text-center">
					Create Account
				</h2>
				<div className=" w-[18px]" />
			</div>
			<div className=" flex flex-col gap-3">
				{displaySelectUserCreated}
				<Input
					placeholder="Email"
					value={email}
					onChange={(e) =>
						setEmail(e.target.value)
					}
					error={emailError}
				/>
				<Input
					placeholder="Firstname"
					value={fname}
					onChange={(e) =>
						setFname(e.target.value)
					}
					error={fnameError}
				/>
				<Input
					placeholder="Middlename (optional)"
					value={mname}
					onChange={(e) =>
						setMname(e.target.value)
					}
				/>
				<Input
					placeholder="Lastname"
					value={lname}
					onChange={(e) =>
						setLname(e.target.value)
					}
					error={lnameError}
				/>
				{displayLocation}
				<p className=" mt-5">
					Account Info
				</p>
				<Input
					placeholder="Username"
					value={username}
					onChange={(e) =>
						setUsername(e.target.value)
					}
					error={usernameError}
				/>
				<div className=" h-5" />
				<Button
					onClick={() => handleSubmit()}
				>
					{isLoading
						? "Loading..."
						: "Create Account"}
				</Button>
			</div>
		</div>
	);
}
