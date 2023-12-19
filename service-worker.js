async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // do something with response here, not outside the function
    return response;
}

chrome.tabs.onUpdated.addListener((tabId, tab) => {})
chrome.runtime.onMessage.addListener(obj, sender, res) {
  const {
      type,
      data
  } = obj;
  if(type === "startimport"){
    console.log("Starting import");
  }
}
