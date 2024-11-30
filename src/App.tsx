import "./App.css";
import { useState } from "react";
import { getActiveTabInfo, getHashRemovedURL } from "./utils/url.ts";
import CopyButton from "./components/CopyButton.tsx";

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

	const makeMarkdownLink = (title: string, url: string) => {
		return `[${title}](${url})`;
	};

	return (
		<>
			<div className="max-w-2xl">
				<div className="text-lg">{currentTitle}</div>
				<div className="text-sm">{currentURL}</div>
				<div>
					<button type="button" onClick={removeHashReload}>
						Remove Hash Reload
					</button>
				</div>
				<div className="text-sm">{rHashedURL}</div>
				<CopyButton text={rHashedURL} />
				<div>{makeMarkdownLink(currentTitle, currentURL)}</div>
				<CopyButton text={makeMarkdownLink(currentTitle, currentURL)} />
			</div>
		</>
	);
}

export default App;
