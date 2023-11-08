chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if(tab.url && (tab.url.includes("youtube.com/watch")){
    chrome.tabs.sendMessage(tabId, {
      type: "video",
      url: tab.url,
    });
  }
  else if(tab.url && (tab.url.includes("youtube.com/playlist")){
    chrome.tabs.sendMessage(tabId, {
      type: "playlist",
      url: tab.url,
    });
  }
}
