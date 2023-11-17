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

function exportPlay(title){
    let videos = [];
    videos.push(document.querySelector('yt-formatted-string[class="style-scope yt-dynamic-sizing-formatted-string yt-sans-28"]').innerHTML);
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
window.onload = ()=>{
    let classes = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button";
    waitForElm('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]').then(()=>{
        let bar = document.querySelector('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]');
        let exportb = document.createElement('button');
        exportb.className = classes;
        exportb.onclick = ()=>{exportPlay(false)};
        let buttonrenderer = document.createElement("ytd-button-renderer");
        buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
        bar.appendChild(buttonrenderer);
        let tooltip = buttonrenderer.querySelector('tp-yt-paper-tooltip');
        tooltip.innerHTML = '<div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip">Export</div>';
        let shape = buttonrenderer.querySelector('yt-button-shape');
        shape.appendChild(exportb); 
        let icondiv = document.createElement("div");
        icondiv.className = 'yt-spec-button-shape-next__icon';
        let yticon = document.createElement("yt-icon");
        yticon.setAttribute("style","");
        let yticonshape = document.createElement("yt-icon-shape");
        yticonshape.className = "style-scope yt-icon";
        exportb.appendChild(icondiv);
        icondiv.appendChild(yticon);
        yticon.appendChild(yticonshape);
        yticonshape.innerHTML = '<icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Z"/></svg></div></icon-shape>';
    });
}
