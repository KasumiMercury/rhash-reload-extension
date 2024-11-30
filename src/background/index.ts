chrome.commands.onCommand.addListener((command) => {
	switch (command) {
		case "remove_hash_reload": // 設定したショートカット名
			console.log("Run");
			break;
	}
});
