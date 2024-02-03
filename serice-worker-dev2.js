async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// do something with response here, not outside the function
	return response;
}
  
async function startimport(arr, listname) {
	if(!("localStorage" in window)) {
		chrome.runtime.sendMessage({
			type: "notsupported",
			data: {}
		});
		return
	}
	localStorage.setItem("import", "true")
	let tab = chrome.tabs.create({url: "about:blank"});
	[tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	localStorage.setItem("importtab", tab.id)
	localStorage.setItem("importname", listname)
	localStorage.setItem("importdata", JSON.stringify(arr))
	localStorage.setItem("importindex", 1)
	importplaylist(arr[1], listname, tab.id)
}

async function importplaylist(link, listname, tabid) {
	await chrome.tabs.update(tabid, { url: link });
	chrome.tabs.onUpdated.addListener(async (tabid, info)=>{
		if (tabid == tab.id && info.status == "complete") {
			chrome.tabs.sendMessage(tabid,{
				type: "import",
				data: {
					name: listname
				}
			});
		}
	})
}

  
chrome.tabs.onUpdated.addListener((tabId, tab) => {})
chrome.runtime.onMessage.addListener((obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	if(type === "startimport"){
	  startimport(data.arr, data.name);
	  console.log("Starting import");
	}
	if(type === "finishimport"){
		if(localStorage.getItem("import") === "true"){
			let arr = JSON.parse(localStorage.getItem("importdata"));
			let index = localStorage.getItem("importindex");
			let tabid = localStorage.getItem("importtab");
			if(index < arr.length){
				importplaylist(arr[index],localStorage.getItem("importname"),tabid);
			} else if (index >= arr.length){
				localStorage.setItem("import", "false");
				chrome.tabs.remove(tabid);
				console.log("Import Successful!");
			} else {
			async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// do something with response here, not outside the function
	return response;
}
  
async function startimport(arr, listname) {
	if(!("localStorage" in window)) {
		chrome.runtime.sendMessage({
			type: "notsupported",
			data: {}
		});
		return
	}
	localStorage.setItem("import", "true")
	let tab = chrome.tabs.create({url: "about:blank"});
	[tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	localStorage.setItem("importtab", tab.id)
	localStorage.setItem("importname", listname)
	localStorage.setItem("importdata", JSON.stringify(arr))
	localStorage.setItem("importindex", 1)
	importplaylist(arr[1], listname, tab.id)
}

async function importplaylist(link, listname, tabid) {
	await chrome.tabs.update(tabid, { url: link });
	chrome.tabs.onUpdated.addListener(async (tabid, info)=>{
		if (tabid == tab.id && info.status == "complete") {
			chrome.tabs.sendMessage(tabid,{
				type: "import",
				data: {
					name: listname
				}
			});
		}
	})
}

  
chrome.tabs.onUpdated.addListener((tabId, tab) => {})
chrome.runtime.onMessage.addListener((obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	if(type === "startimport"){
	  startimport(data.arr, data.name);
	  console.log("Starting import");
	}
	if(type === "finishimport"){
		if(localStorage.getItem("import") === "true"){
			let arr = JSON.parse(localStorage.getItem("importdata"));
			let index = localStorage.getItem("importindex");
			let tabid = localStorage.getItem("importtab");
			if(index < arr.length){
				importplaylist(arr[index],localStorage.getItem("importname"),tabid);
			} else if (index >= arr.length){
				localStorage.setItem("import", "false");
				chrome.tabs.remove(tabid);
				console.log("Import Successful!");
			} else {
				localStorage.setItem("import", "false");
				console.error("Error with Import at 63");
			}
		}
	}
	if(type === "stopimport"){
		if(localStorage.getItem("import") === "true"){
			localStorage.setItem("import", "false")
			chrome.tabs.remove(localStorage.getItem("importtab"));
			console.log("Import Stopped")
		} else {
			chrome.runtime.sendMessage({
				type: "importinactive",
				data: {}
			})
		}
	}
});
  	localStorage.setItem("import", "false");
				console.error("Error with Import at 63");
			}
		}
	}
	if(type === "stopimport"){
		if(localStorage.getItem("import") === "true"){
			localStorage.setItem("import", "false")
			chrome.tabs.remove(localStorage.getItem("importtab"));
			console.log("Import Stopped")
		} else {
			chrome.runtime.sendMessage({
				type: "importinactive",
				data: {}
			})
		}
	}
});
  