"use client";
import Alert from "@/app/view-meetings/@Alert/page";
import ViewModal from "@/app/view-meetings/@ViewModal/page";
import {
    TableCell,
    TableRow,
} from "@/data/components/ui/table";
import { ClientDto } from "@/lib/dto/Client.dto";
import { UserType } from "@/lib/dto/User.dto";
import {
    ReferalStatusColors,
    ReferalStatusEnum,
} from "@/lib/types/MeetingStatus.enum";
import { displayReferalStatus } from "@/lib/utils/meeting.utils";
import {
    Check,
    Eye,
    Pencil,
    X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
    queryId: string;
    item: ClientDto;
    userType: UserType;
};

export default function RowItem(props: Props) {
    const { queryId, item, userType } = props;
    const [status, setStatus] = useState<ReferalStatusEnum>(item?.referalStatus);
    const [enrolledEmployees, setEnrolledEmployees] = useState<number>(item?.enrolledEmployees || 0);

    return (
        <TableRow key={item?.id}>
            <TableCell className="text-center">
                {item?.company.name}
            </TableCell>
            <TableCell className="text-center">
                {item?.company.estimatedNumberEmployee}
            </TableCell>
            <TableCell className="text-center">
                <input
                    type="number"
                    value={enrolledEmployees}
                    onChange={(e) => setEnrolledEmployees(Number(e.target.value))}
                    className="ml-2 p-1 w-16 text-center border rounded"
                    min={''}
                />
            </TableCell>
            <TableCell className="text-justify">
                {item?.meetingBy}
            </TableCell>
            <TableCell
                className="text-center"
                style={{
                    color: ReferalStatusColors[item.referalStatus] || "gray",
                }}
            >
                {queryId !== item?.id ? (
                    displayReferalStatus(item.referalStatus)
                ) : (
                    <select
                        className="p-1 rounded-lg text-white w-fit"
                        style={{
                            backgroundColor: ReferalStatusColors[status] || "#ccc",
                        }}
                        onChange={(e) => setStatus(e.target.value as ReferalStatusEnum)}
                        value={status}
                    >
                        {Object.values(ReferalStatusEnum)
                            .filter(
                                (val) => ![ReferalStatusEnum.NONE, ReferalStatusEnum.OTHERS].includes(val)
                            )
                            .map((status) => (
                                <option key={status} value={status}>
                                    {status.replace(/_/g, " ")}
                                </option>
                            ))}
                    </select>
                )}
            </TableCell>
            {userType === item.meetingBy ? (
                <TableCell className="flex justify-end">
                    {queryId === item?.id ? (
                        <div className="flex flex-row gap-3 justify-end">
                            <Alert status={status} updateBy="referal" id={queryId}>
                                <button className="p-2 rounded-full bg-green-800">
                                    <Check size={14} color={"white"} />
                                </button>
                            </Alert>
                            <Link href="/view-referal" className="p-2 rounded-full bg-red-800">
                                <X size={14} color={"white"} />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-end flex-1 gap-4">
                            <Link href={`?id=${item?.id}`} className="p-2 rounded-full bg-yellow-600">
                                <Pencil size={14} color={"white"} />
                            </Link>
                            <ViewModal id={item.id} userType={UserType.ADMIN} data={item}>
                                <button className="p-2 rounded-full bg-green-600 self-end">
                                    <Eye size={14} color="white" />
                                </button>
                            </ViewModal>
                        </div>
                    )}
                </TableCell>
            ) : (
                <TableCell className="flex justify-end">
                    <ViewModal id={item.id} userType={UserType.ADMIN} data={item}>
                        <button className="p-2 rounded-full bg-green-600 self-end">
                            <Eye size={14} color="white" />
                        </button>
                    </ViewModal>
                </TableCell>
            )}
        </TableRow>
    );
}
