const fileInput = document.getElementById('inputfile');
let title = false;
let listname = "";

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    const fr=new FileReader();
    fr.onload = () =>{
      let data = fr.result;
      let arr = data.split('\n');
      listname = arr[0];
      document.getElementById('listname').value = listname;
      document.getElementById('bstarti').addEventListener("click",()=>startImport(arr),false)
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
  console.log(response);
}

function startImport(arr){
    for(let i = 1;i<arr.length;i++){
        sendMessageToActiveTab({
            type: "nav",
            data: {
                url: nav[i],
            }
        });
        sendMessageToActiveTab({
            type: "import",
            data: {
                name: listname,
                arr[i+1] ? next: arr[i+1] : next: null,
            }
        });
    } 
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('bsdown').addEventListener("click",(e)=>{
        sendMessageToActiveTab({
            type: "scrolldown",
            data: {
            
            }
        });
    },false)
    
    document.getElementById('beplay').addEventListener("click",(e)=>{
        sendMessageToActiveTab({
            type: "exportplay",
            data: {
                title: title,
            }
        });
    },false)
    
    document.getElementById('cexti').addEventListener("change",(e)=>{
        title = !title;
    },false)
    
    document.getElementById('listname').addEventListener("change",(e)=>{
        listname = document.getElementById('listname').value;
    },false)
})
