import FeatherIcon from "feather-icons-react";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const writeToClipboard = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		});
	};

	return (
		<button
			type="button"
			onClick={writeToClipboard}
			className="p-1 focus:outline-none"
		>
			{copied ? (
				<FeatherIcon icon={"check-circle"} size={16} fill={"green"} />
			) : (
				<FeatherIcon icon={"clipboard"} size={16} />
			)}
		</button>
	);
}
