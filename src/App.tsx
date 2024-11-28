import "./App.css";
import { useState } from "react";

function App() {
	const [urlState, setURL] = useState("");

	// get current tab's url with chrome.tabs.query
	const getCurrentTabURL = () => {
		console.log("getTabURL");
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const tab = tabs[0];
			const url = tab.url;
			console.log(url);
			if (!url) {
				return;
			}
			setURL(url);
		});
	};

	return (
		<>
			<div>
				<button type="button" onClick={getCurrentTabURL}>
					GetParsedURL
				</button>
				<div>{urlState}</div>
			</div>
		</>
	);
}

export default App;
