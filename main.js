const fileInput = document.getElementById('inputfile');
let title = false;
let listname = "";

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    const fr=new FileReader();
    fr.onload = () =>{
      let data = fr.result;
      let arr = data.split('\n');
      for(let i=1;i<arr.length;i++){
        let w = window.open(arr[i]);
      }
    }
    fr.readAsText(files[0]);
});

function grey(id){
    document.getElementById(id).classList.add("disabled");
}

function ungrey(id){
    document.getElementById(id).classList.remove("disabled");
}

document.getElementById('bsdown').addEventListener("click",(e)=>{
    chrome.tabs.sendMessage()
},false)

document.getElementById('beplay').addEventListener("click",(e)=>{
    chrome.tabs.sendMessage()
},false)

document.getElementById('cexti').addEventListener("change",(e)=>{
    title = !title;
},false)

document.getElementById('listname').addEventListener("change",(e)=>{
    listname = document.getElementById('listname').value;
},false)

document.getElementById('bstarti').addEventListener("click",(e)=>{
    chrome.tabs.sendMessage()
},false)

chrome.runtime.onMessage.addListener((obj, sender, res)=>{
    
}
