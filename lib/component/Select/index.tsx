import React from "react";
type Props =
	React.SelectHTMLAttributes<HTMLSelectElement>;
export default function Select(
	props: Props
) {
	return (
		<select
			{...props}
			className="p-3 border border-gray-300 w-full rounded-md hover:bg-red-50 outline-none"
		>
			{props.children}
		</select>
	);
}
