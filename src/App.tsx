import "./App.css";
import { useState } from "react";
import {getActiveTabInfo, getHashRemovedURL} from "./utils/url.ts";

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
			</div>
		</>
	);
}

export default App;
