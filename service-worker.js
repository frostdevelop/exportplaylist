async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // do something with response here, not outside the function
  console.log(response);
}

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if(tab.url && (tab.url.includes("youtube.com/watch"))){
    chrome.tabs.sendMessage(tabId, {
      type: "video",
      data: {
        url: tab.url,
    },
    });
  }
  else if(tab.url && (tab.url.includes("youtube.com/playlist"))){
    chrome.tabs.sendMessage(tabId, {
      type: "playlist",
      data: {
        url: tab.url,
    },
    });
  }
})
