"use client";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/data/components/ui/sheet";
import { NotificationDto } from "@/lib/dto/Notification.dto";
import { UserType } from "@/lib/dto/User.dto";
import { db } from "@/lib/firebase";
import { FirebaseCollectionEnum } from "@/lib/types/FirebaseCollection.enum";
import { formatDate } from "@/lib/utils/date.utils";
import {
	collection,
	onSnapshot,
	query,
	QueryFieldFilterConstraint,
	where,
} from "firebase/firestore";
import { Bell } from "lucide-react";

import {
	useEffect,
	useState,
} from "react";

type Prosp = {
	userType: UserType;
	id: string;
};

export default function Notifition(
	props: Prosp
) {
	const [data, setData] = useState<
		NotificationDto[]
	>([]);
	console.log(data);
	useEffect(() => {
		const qry: QueryFieldFilterConstraint[] =
			[];

		if (
			props.userType === UserType.RMS
		) {
			qry.push(
				where(
					"reciever",
					"==",
					props.id
				)
			);
		}
		const q = query(
			collection(
				db,
				FirebaseCollectionEnum.notification
			),
			...qry
		);
		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const newData =
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as Array<NotificationDto>;
				setData(newData);
			}
		);

		return () => unsubscribe(); // Cleanup on unmount
	}, []);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className=" relative">
					<p className="text-[8px] bg-red-400 p-1  px-2 rounded-full text-white absolute -top-3 -right-3">
						{data.length}
					</p>
					<Bell size={21} />
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						Notification
					</SheetTitle>
				</SheetHeader>
				<div className=" h-full  overflow-y-scroll">
					{data.map((val) => {
						return (
							<div className=" w-full my-2 border-b py-3">
								<p className=" font-bold text-[14px]">
									{val.title}
								</p>
								<p className=" text-[12px] mt-2">
									{val.message}
								</p>

								<p className=" mt-3 text-[10px]">
									{formatDate(
										val.dateCreated
									)}
								</p>
							</div>
						);
					})}
				</div>
				<SheetFooter>
					<SheetClose asChild>
						{/* <Button type="submit">Save changes</Button> */}
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
