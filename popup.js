const fileInput=document.getElementById("inputfile");let listname="",filearr="";function grey(e){document.getElementById(e).classList.add("disabled")}function ungrey(e){document.getElementById(e).classList.remove("disabled")}async function sendMessageToActiveTab(e){let[t]=await chrome.tabs.query({active:!0,lastFocusedWindow:!0}),a=await chrome.tabs.sendMessage(t.id,e);return{id:t.id,response:a}}fileInput.addEventListener("change",e=>{let t=e.target.files,a=new FileReader;a.onload=()=>{listname=(filearr=a.result.split("\n"))[0],document.getElementById("listname").value=listname},a.readAsText(t[0])}),document.getElementById("bstarti").addEventListener("click",()=>{""!=filearr?chrome.runtime.sendMessage({type:"startimport",data:{arr:filearr,name:listname}}):alert("Err: No file input")},!1),document.addEventListener("DOMContentLoaded",()=>{function e(){sendMessageToActiveTab({type:"update",data:{auto:document.getElementById("cauex").checked,title:document.getElementById("cexti").checked}})}document.getElementById("bsdown").addEventListener("click",async e=>{let t=await sendMessageToActiveTab({type:"scroll",data:{}});async function a(){let e=await sendMessageToActiveTab({type:"count",data:{}});chrome.action.setBadgeText({tabId:e.id,text:e.response.text}),console.log(e.response.text),"false"==e.response.scroll&&clearInterval(n)}chrome.action.setBadgeText({tabId:t.id,text:"0"});let n=setInterval(a,1e3)},!1),document.getElementById("beplay").addEventListener("click",e=>{sendMessageToActiveTab({type:"exportplay",data:{}})},!1),document.getElementById("listname").addEventListener("change",e=>{listname=document.getElementById("listname").value},!1),document.getElementById("bstopi").addEventListener("click",()=>{chrome.runtime.sendMessage({type:"stopimport",data:{}})},!1),document.getElementById("cexti").addEventListener("change",e,!1),document.getElementById("cauex").addEventListener("change",e,!1)}),chrome.runtime.onMessage.addListener((e,t,a)=>{let{type:n,data:s}=e;"notsupported"===n&&alert("Your browser is not supported."),"importinactive"===n&&alert("Import is not active.")});