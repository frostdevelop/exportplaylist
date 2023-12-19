async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // do something with response here, not outside the function
  return response;
}

async function startimport(arr, listname) {
  for(let i = 1;i<arr.length;i++){
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        await chrome.tabs.update(tab.id, { url: arr[i] })
	  	const waitupdate = new Promise((res)=>{
			chrome.tabs.onUpdated.addListener((tabid, info)=>{
				if (tabid == tab.id && info.status == "complete") {
                	await sendMessageToActiveTab({
                    	type: "import",
                		data: {
                        	name: listname
										}
                	});
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
