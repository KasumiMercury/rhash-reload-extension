import { getActiveTabInfo, getHashRemovedURL } from "../utils/url.ts";

chrome.commands.onCommand.addListener((command) => {
	switch (command) {
		case "remove_hash_reload":
			getActiveTabInfo().then((info) => {
				console.log("Current URL", info.url);
				chrome.tabs.update({ url: getHashRemovedURL(info.url) });
			});
			break;
	}
});
