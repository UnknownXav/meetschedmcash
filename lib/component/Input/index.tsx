type Props =
	React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(
	props: Props
) {
	return (
		<input
			{...props}
			className="p-3 border border-gray-300 w-ull rounded-md hover:bg-red-50 outline-none"
		/>
	);
}
