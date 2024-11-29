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
		// currentURL state may not be updated yet, use tab.url instead
		setRHashedURL(getHashRemovedURL(tab.url));
	});

	const getHashRemovedURL: (url: string) => string = (url: string) => {
		const urlObj = new URL(url);
		const hash = urlObj.hash;
		if (hash) {
			urlObj.hash = "";
		}
		return urlObj.href;
	};

	const removeHashReload = () => {
		if (!rHashedURL) {
			return;
		}
		chrome.tabs.update({ url: rHashedURL });
	};

	return (
		<>
			<div>
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
