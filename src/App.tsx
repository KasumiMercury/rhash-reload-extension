import "./App.css";
import { useState } from "react";

function App() {
	const [currentURL, setCurrentURL] = useState("");
	const [rHashedURL, setRHashedURL] = useState("");

	// get current tab's url
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const tab = tabs[0];
		if (!tab.url) {
			return;
		}

		setCurrentURL(tab.url);

		// get hash removed url
		setRHashedURL(getHashRemovedURL(tab.url));
	});

	const getHashRemovedURL = (url: string) => {
		const urlObj = new URL(url);
		const hash = urlObj.hash;
		if (hash) {
			urlObj.hash = "";
		}
		return urlObj.href;
	};

	return (
		<>
			<div>
				<div>{currentURL}</div>
				<div>{rHashedURL}</div>
			</div>
		</>
	);
}

export default App;
