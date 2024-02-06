async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	const response = await chrome.tabs.sendMessage(tab.id, message);
	// do something with response here, not outside the function
	return response;
}
  
async function startimport(arr, listname) {
	let tab = chrome.tabs.create({url: "about:blank"});
	let run = true;
	chrome.runtime.onMessage.addListener((obj, sender, res)=>{
	  if(obj.type === "stopimport"){
		  run = false;
	  };
	});
  
	[tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
	console.log(arr)
    function sendimport(tabid, info){
        if (tabid == tab.id && info.status == "complete") {
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
    await chrome.tabs.update(tab.id, { url: arr[1] })
    chrome.tabs.onUpdated.addListener(sendimport);
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
});
