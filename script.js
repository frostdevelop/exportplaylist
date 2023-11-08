let goToBottom = setInterval(() => window.scrollBy(0, 1000), 100);

clearInterval(goToBottom);
let videos = [];
const links = document.querySelectorAll('a');
for (const link of links) {
    if (link.id === "video-title") {
        link.href = link.href.split('&list=')[0];
        videos.push(link.title + ',' + link.href);
    }
}

clearInterval(goToBottom);
let videos = [];
const links = document.querySelectorAll('a');
for (const link of links) {
    if (link.id === "video-title") {
        link.href = link.href.split('&list=')[0];
        videos.push(link.href);
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

// Add import code

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

document.querySelectorAll('[aria-label="Save to playlist"]')[0].click()
waitForElm('tp-yt-paper-dialog').then(()=>{
// document.getElementsByClassName('style-scope ytd-playlist-add-to-option-renderer')[0].click()
let checks = document.querySelectorAll('tp-yt-paper-checkbox[class="style-scope ytd-playlist-add-to-option-renderer"]')
for (let i=0;i<checks.length;i++){
  if(checks[i].childNodes[2].children[0].children[0].children[0].title=="Watch later"){
    checks[i].click()
  }
}
})
