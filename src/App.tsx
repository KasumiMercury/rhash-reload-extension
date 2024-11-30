import "./App.css";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import CopyButton from "./components/CopyButton.tsx";
import LongStringDisplay from "./components/LongStringDisplay.tsx";
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

	const makeMarkdownLink = (title: string, url: string) => {
		return `[${title}](${url})`;
	};

	return (
		<>
			<div className="flex h-fit flex-col gap-2 pt-5 pb-10">
				<button
					type="button"
					className="mr-0 ml-auto p-2 focus:outline-none"
					onClick={() => {
						window.close();
					}}
				>
					<FeatherIcon icon={"x"} size={16} />
				</button>
				<div className="text-base">{currentTitle}</div>
				<div className="text-xs">
					<LongStringDisplay text={currentURL} />
				</div>
				<div>
					<p className="py-2 text-sm">Hash Removed</p>
					<div className="text-xs">
						<LongStringDisplay text={rHashedURL} />
					</div>
					<div className="mt-1 mr-0 ml-auto flex w-fit flex-row gap-2">
						<CopyButton text={rHashedURL} />
						<button
							type="button"
							onClick={removeHashReload}
							className="p-1 focus:outline-none"
						>
							<FeatherIcon icon={"rotate-cw"} size={16} />
						</button>
					</div>
				</div>
				<div>
					<p className="py-2 text-xs">Markdown</p>
					<LongStringDisplay
						text={makeMarkdownLink(currentTitle, currentURL)}
					/>
					<div className="mt-1 mr-0 ml-auto w-fit">
						<CopyButton text={makeMarkdownLink(currentTitle, currentURL)} />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
