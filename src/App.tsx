import "./App.css";
import { useState } from "react";
import { getCurrentUrl, getHashRemovedURL } from "./utils/url.ts";

function App() {
	const [currentURL, setCurrentURL] = useState("");
	const [rHashedURL, setRHashedURL] = useState("");

	getCurrentUrl().then((url) => {
		setCurrentURL(url);
		setRHashedURL(getHashRemovedURL(url));
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
