import React from "react";

export enum ButtonType {
	SOLID = "SOLID",
	OUTLINE = "OUTLINE",
}

type Props =
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		buttonType?: ButtonType | undefined;
	};

export default function Button(
	props: Props
) {
	const {
		buttonType = ButtonType.SOLID,
	} = props;

	const buttonStyle =
		buttonType === ButtonType.SOLID
			? "p-3 bg-red-500 rounded-md text-white hover:bg-red-100 hover:text-red-500"
			: "p-3 bg-white border-red-500 border text-red-500 rounded-md hover:bg-red-200 hover:border-none";

	return (
		<button
			{...props} // Spread props to allow all button attributes
			className={`${buttonStyle} ${
				props.className || ""
			}`}
		>
			{props.children}
		</button>
	);
}
