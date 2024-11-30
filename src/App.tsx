import "./App.css";
import { useState } from "react";
import { getActiveTabInfo, getHashRemovedURL } from "./utils/url.ts";

function App() {
	const [currentTitle, setCurrentTitle] = useState("");
	const [currentURL, setCurrentURL] = useState("");
	const [rHashedURL, setRHashedURL] = useState("");

	getActiveTabInfo().then((info) => {
		setCurrentTitle(info.title);
		setCurrentURL(info.url);
		setRHashedURL(getHashRemovedURL(info.url));
	});

	const removeHashReload = () => {
		if (!rHashedURL) {
			return;
		}
		chrome.tabs.update({ url: rHashedURL });
	};

	const [copied, setCopied] = useState(false);

	const writeToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
		});
	};

	const makeMarkdownLink = (title: string, url: string) => {
		return `[${title}](${url})`;
	};

	return (
		<>
			<div>
				<div>{currentTitle}</div>
				<div>{currentURL}</div>
				<div>
					<button type="button" onClick={removeHashReload}>
						Remove Hash Reload
					</button>
				</div>
				<div>{rHashedURL}</div>
				<button
					type="button"
					onClick={() => {
						writeToClipboard(rHashedURL);
					}}
				>
					copy
				</button>
				<div>{makeMarkdownLink(currentTitle, currentURL)}</div>
				<button
					type="button"
					onClick={() => {
						writeToClipboard(makeMarkdownLink(currentTitle, currentURL));
					}}
				>
					copy
				</button>
				{copied && <div>Copied!</div>}
			</div>
		</>
	);
}

export default App;
