import { useState } from "react";
import FeatherIcon from "feather-icons-react";

export default function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const writeToClipboard = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
		});
	};

	return (
		<button type="button" onClick={writeToClipboard}>
			{copied ? (
				<FeatherIcon icon={"check-circle"} size={16} />
			) : (
				<FeatherIcon icon={"clipboard"} size={16} />
			)}
		</button>
	);
}
