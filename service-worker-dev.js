'use strict';

async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// do something with response here, not outside the function
	return response;
}
  
async function startimport(arr, listname) {
	const tab = chrome.tabs.create({url: arr[1]});
  
	//[tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	console.log(arr)
    function sendimport(tabid, info, tab){
        if (tabid == tab.id && info.status == "complete" && tab.url === arr[1]) {
            chrome.tabs.sendMessage(tab.id,{
                type: "startimport",
                data: {
                    name: listname,
                    arr: arr,
                }
            })
            chrome.tabs.onUpdated.removeListener(sendimport);
            return
        }
    }
    //await chrome.tabs.update(tab.id, { url: arr[1] })
    chrome.tabs.onUpdated.addListener(sendimport);
	//Use local for browser support
	let activeimports = await chrome.storage.local.get(["imports"]);
	activeimports = activeimports.imports;
	if(activeimports == undefined) {
		await chrome.storage.local.set({"imports": [tab.id]});
	} else {
		await chrome.storage.local.set({"imports": [...activeimports, tab.id]});
	}
	/*
    for(let i = 1;i<arr.length && run === true;++i){
		  console.log(i);
		  await chrome.tabs.update(tab.id, { url: arr[i] })
			let waitupdate = new Promise((res)=>{
			  chrome.tabs.onUpdated.addListener(async (tabid, info)=>{
				  if (tabid == tab.id && info.status == "complete") {
					  chrome.tabs.sendMessage(tab.id,{
						  type: "import",
						  data: {
							  name: listname
						  }
					  }
					  );
					  const waitfinish = new Promise((resolve)=>{
						  chrome.runtime.onMessage.addListener((obj,sender,res)=>{
							  if(obj.type === "finishimport"){
								  resolve();
							  };
						  });
					  });
					  await waitfinish;
					  res();
				  };
			  });
		  });
			await waitupdate;
	  }
	  chrome.tabs.remove(tab.id);
	  if(run == true){
		  console.log("Import Successful!")
	  } else if (run == false) {
		  console.log("Import Stopped")
	  } else {
		  console.error("ERROR: Invalid run value at 52")
	  }
      */
}
  
//chrome.tabs.onUpdated.addListener((tabId, info, tab) => {})

chrome.runtime.onInstalled.addListener((d) => {
    if (d.reason === "install"){chrome.tabs.create({ url:"welcome.html" })}else if(d.reason === "update"){chrome.tabs.create({ url:"https://github.com/frostdevelop/exportplaylist/releases" })};
});
chrome.runtime.setUninstallURL("https://chromewebstore.google.com/detail/exportplaylist/llckehcoicgfpdcjmkjgcfnbbgpalofn");

chrome.tabs.onRemoved.addListener(async tabId=>{
	let activeimports=await chrome.storage.local.get(["imports"]);
	activeimports = activeimports.imports;
	const index = activeimports.indexOf(tabId);
	if(index != -1){
		activeimports.splice(index, 1);
		await chrome.storage.local.set({"imports": activeimports});
	}
})

chrome.runtime.onMessage.addListener(async (obj, sender, res)=>{
	const {
		type,
		data
	} = obj;
	console.log(type);
	if(type === "startimport"){
	  startimport(data.arr, data.name);
	  console.log("Starting import");
	}
	if(type === "importdone"){
		await chrome.tabs.remove(sender.tab.id);
		console.log("Import finished", data.name);
	}
	if(type === "stopimport"){
		let activeimports = await chrome.storage.local.get(["imports"]);
		activeimports = activeimports.imports;
		console.log(activeimports);
		if(activeimports != undefined){
			for(let i=0; i<activeimports.length; i++){
				try{
					await chrome.tabs.remove(activeimports[i]);
				} catch(e) {
					console.error("Tab removing error:", e)
				}
			}
			await chrome.storage.local.set({"imports": []});
		}
	}
});
