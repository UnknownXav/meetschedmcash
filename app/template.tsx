import React from "react";
import NavBar from "./@Navbar/page";

export default function Template({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className=" w-full h-full">
			<NavBar />
			{children}
		</div>
	);
}
