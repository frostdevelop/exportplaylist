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
      for(let i = 1;i<arr.length;i++){
          document.getElementById('bstarti').addEventListener("click",(e)=>{
              sendMessageToAcriveTab({ 
                  type: "import",
                  data: {
                      name: listname,
                      url: arr[i];
                      next: arr[i+1];
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

function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, message);
  // TODO: Do something with the response.
}

function startImport(){
    
}

document.getElementById('bsdown').addEventListener("click",(e)=>{
    sendMessageToAcriveTab({
        type: "scrolldown",
        data: {
            
        }
    });
},false)

document.getElementById('beplay').addEventListener("click",(e)=>{
    sendMessageToAcriveTab({
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
