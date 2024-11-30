export interface tabOptions {
    includeUrl?: boolean;
    includeTitle?: boolean;
}

export interface tabInfo {
    url: string;
    title: string;
}

export const getActiveTabInfo = (options: tabOptions = {}): Promise<tabInfo> => {
    const { includeUrl = true, includeTitle = true } = options;
    return new Promise((resolve, reject) => {
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (chrome.runtime.lastError) {
                    console.error("Failed to get active tab info", chrome.runtime.lastError.message);
                    reject(chrome.runtime.lastError.message);
                }

                const tab = tabs[0];
                if (!tab) {
                    console.error("No active tab found");
                    reject("No active tab found");
                }

                const { url, title } = tab;

                const info: tabInfo = {
                    url: includeUrl && url ? url : "",
                    title: includeTitle && title ? title : "",
                };

                resolve(info);
            });
        } catch (e) {
            console.error("Error while getting active tab info", e);
            reject(e);
        }
    });
}

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
