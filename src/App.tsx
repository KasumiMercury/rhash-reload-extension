import "./App.css";
import { useState } from "react";
import { getActiveTabInfo, getHashRemovedURL } from "./utils/url.ts";
import CopyButton from "./components/CopyButton.tsx";
import LongStringDisplay from "./components/LongStringDisplay.tsx";
import FeatherIcon from "feather-icons-react";

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
			<div className="h-fit flex flex-col gap-2 py-10">
				<div className="text-base">{currentTitle}</div>
				<div className="text-xs">
					<LongStringDisplay text={currentURL} />
				</div>
				<div>
					<p className="text-sm py-2">Hash Removed</p>
					<div className="text-xs">
						<LongStringDisplay text={rHashedURL} />
					</div>
					<div className="flex flex-row w-fit mr-0 ml-auto mt-1 gap-2">
						<CopyButton text={rHashedURL} />
						<button type="button" onClick={removeHashReload} className="p-1">
							<FeatherIcon icon={"rotate-cw"} size={16} />
						</button>
					</div>
				</div>
				<div>
					<p className="text-xs py-2">Markdown</p>
					<LongStringDisplay
						text={makeMarkdownLink(currentTitle, currentURL)}
					/>
					<div className="w-fit mr-0 ml-auto mt-1">
						<CopyButton text={makeMarkdownLink(currentTitle, currentURL)} />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
