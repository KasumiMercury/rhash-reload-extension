export const getCurrentUrl = (): Promise<string> => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab || !tab.url) {
                resolve("");
                return;
            }
            resolve(tab.url);
        });
    });
};

export const getHashRemovedURL = (url: string) => {
    let urlObj: URL;
    try {
        urlObj = new URL(url);
    } catch (e) {
        console.error("Invalid URL", url);
        return "";
    }

    urlObj.hash = "";
    return urlObj.toString();
};
