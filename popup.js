const fileInput = document.getElementById('inputfile');
let listname = "";

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    const fr=new FileReader();
    fr.onload = () =>{
      let data = fr.result;
      let arr = data.split('\n');
      listname = arr[0];
      document.getElementById('listname').value = listname;
      document.getElementById('bstarti').addEventListener("click",()=>{
          chrome.runtime.sendMessage({
              type: "startimport",
              data: {
                  arr: arr,
                  name: listname
              }
          });
      },false)
    }
    fr.readAsText(files[0]);
});

function grey(id){
    document.getElementById(id).classList.add("disabled");
}

function ungrey(id){
    document.getElementById(id).classList.remove("disabled");
}

async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // do something with response here, not outside the function
  return { id: tab.id, response: response };
}

document.addEventListener("DOMContentLoaded", () => {
    function update() {
        sendMessageToActiveTab({
            type: "update",
            data: {
                auto: document.getElementById("cauex").checked,
                title: document.getElementById("cexti").checked
            }
        });
    }

    document.getElementById('bsdown').addEventListener("click", async (e) => {
        let res = await sendMessageToActiveTab({
            type: "scroll",
            data: {}
        });
        chrome.action.setBadgeText({ tabId: res.id, text: "0" });

        async function updatebadge() {
            let resp = await sendMessageToActiveTab({ type: "count", data: {} });
            chrome.action.setBadgeText({ tabId: resp.id, text: resp.response.text });
            console.log(resp.response.text)
            if (resp.response.scroll == 'false') {
                clearInterval(updater);
            }
        }

        const updater = setInterval(updatebadge, 1000);
    },false)
    
    document.getElementById('beplay').addEventListener("click",(e)=>{
        sendMessageToActiveTab({
            type: "exportplay",
            data: {}
        });
    },false)
    
    document.getElementById('listname').addEventListener("change",(e)=>{
        listname = document.getElementById('listname').value;
    }, false)

    document.getElementById('cexti').addEventListener("change", update, false);
    document.getElementById('cauex').addEventListener("change", update, false);
})
