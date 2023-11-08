//Export
let url;
let page;

function scroll(){
    var scrolldown = setInterval(() => window.scrollBy(0, 2000), 200);
}

function export(title){
    clearInterval(scrolldown);
    let videos = [];
    videos.push(document.querySelectorAll('yt-formatted-string[class="style-scope yt-dynamic-sizing-formatted-string yt-sans-28"]')[0].innerHTML);
    const links = document.querySelectorAll('a');
    for (const link of links) {
        if (link.id === "video-title") {
            link.href = link.href.split('&list=')[0];
            videos.push(title ? link.title + ',' + link.href : link.href);
        }
    }

    let data = videos.join('\n');
    let blob = new Blob([data], {type: 'text/csv'});
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = 'my_data.csv';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

//Import
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function savePlaylist(listname){
    document.querySelectorAll('[aria-label="Save to playlist"]')[0].click()
    waitForElm('tp-yt-paper-dialog').then(()=>{
    let checks = document.querySelectorAll('tp-yt-paper-checkbox[class="style-scope ytd-playlist-add-to-option-renderer"]')
    let found = false;
    for (let i=0;i<checks.length;i++){
      if(checks[i].childNodes[2].children[0].children[0].children[0].title==listname){
        checks[i].click();
        found = true;
      }
    }
    if(found == false){
        document.querySelectorAll('tp-yt-paper-item[class="style-scope ytd-compact-link-renderer"]')[0].click();
        let elm = document.querySelectorAll('input[placeholder="Enter playlist name..."]')[0];
        elm.value=listname;
        let ev = new Event("input");
        elm.parentElement.dispatchEvent(ev);
        document.querySelectorAll('button[aria-label="Create"]')[1].click();
    }
    }
    );
}

function injectplaylist(){
    bar = document.querySelectorAll('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]')[0];
    export = document.createElement('button');
    export.innerHtml = "Export";
    export.onclick = export(false);
    scroll = document.createElement('button');
    scroll.innerHtml = "Load videos";
    scroll.onclock = scroll();
    bar.appendChild(scroll)
    let buttonrenderer = document.createElement("ytd-button-renderer");
    buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
    bar.appendChild(buttonrenderer);
    let shape = buttonrenderer.querySelectorAll('yt-button-shape')[0];
    shape.appendChild(export);
}

function injectvideo(){
    
}

chrome.runtime.onMessage.addListener((obj, sender, res)=>{
    const { type, value, data } = obj;
    url = link;
    if(type === "playlist"){
        page = "playlist";
        injectplaylist();
    }
    else if(type === "video"){
        page = "video";
        injectvideo();
    }
    else if(type === "exportplay"){
        saveplaylist(data.title);
    }
    else if(type === "scrolldown"){
        scroll();
    }
    else if(type === "stopscroll"){
        clearInterval(scrolldown);
    }
    else if(type === "import"){
        
    }
})
