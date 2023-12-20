//Export
console.log("Tab Initializing")
var url = location.href.split("?")[0];
var page;
var title = false;

function exportPlay() {
    let videos = [];
    videos.push(document.querySelector('div[class="dynamic-text-container style-scope yt-dynamic-sizing-formatted-string"]').querySelector('yt-formatted-string').innerHTML);
    const links = document.querySelectorAll('a[id="video-title"]');
    for (const link of links) {
        link.href = link.href.split('&list=')[0];
        videos.push(title ? link.title + ',' + link.href : link.href);
    }
    let data = videos.join('\n');
    let blob = new Blob([data], {
        type: 'text/csv'
    });
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = videos[0].replace(/\s/g, '') + '.csv';
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

function savePlaylist(listname) {
    waitForElm('[aria-label="Save to playlist"]').then((e) => {
        e.click()
        waitForElm('tp-yt-paper-dialog').then(() => {
            let checks = document.querySelectorAll('tp-yt-paper-checkbox');
            let found = false;
            for (let i = 0; i < checks.length; i++) {
                if (checks[i].children[1].children[0].children[0].children[0].title == listname) {
                    console.log(checks[i].checked);
                    if (checks[i].checked === false) {
                        checks[i].click();
                    };
                    if (checks[i].checked === true) {
                        console.log("checked")
                        chrome.runtime.sendMessage({
                            type: "finishimport"
                        });
                    };
                    found = true;
                    console.log("found");
                }
            }
            console.log("aftercheck")
            if (found == false) {
                console.log("notfound")
                waitForElm('ytd-add-to-playlist-create-renderer').then(() => {
                    document.getElementsByClassName("ytd-add-to-playlist-create-renderer")[0].click();
                    console.log("clicked");
                    let elm = document.getElementsByClassName("tp-yt-paper-input")[3];
                    elm.value = listname;
                    elm.parentElement.dispatchEvent(new Event("input"));
                    document.querySelectorAll('button[aria-label="Create"]')[1].click();
                });
            }
            const waitNotif = new MutationObserver(mutations => {
                let notifs = document.querySelectorAll("tp-yt-paper-toast");
                for (let i = 0; i < notifs.length; i++) {
                    if (notifs[i].children[1].firstElementChild.firstElementChild && notifs[i].children[1].firstElementChild.firstElementChild.innerHTML === "Saved to ") {
                        chrome.runtime.sendMessage({
                            type: "finishimport"
                        });
                        waitNotif.disconnect();
                    }
                }
            });

            waitNotif.observe(document.querySelector("ytd-popup-container"), {
                childList: true,
                subtree: true
            });
        });
    });
}

function injectplaylist(title) {
    if (document.getElementById('scrollb')) {
        return
    }
    let classes = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button";
    waitForElm('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]').then(() => {
        function scroll() {
            console.log("scrolling...");
            if (document.querySelector('div[id="contents"][class=" style-scope ytd-playlist-video-list-renderer style-scope ytd-playlist-video-list-renderer"]').querySelector('ytd-continuation-item-renderer') === null) {
                exportPlay();
                scrollb.click();
            } else {
                document.querySelector('div[id="contents"][class=" style-scope ytd-playlist-video-list-renderer style-scope ytd-playlist-video-list-renderer"]').querySelector('ytd-continuation-item-renderer').scrollIntoView();
                let scrolldown = new MutationObserver(mutations => {
                    if (document.querySelector('div[id="contents"][class=" style-scope ytd-playlist-video-list-renderer style-scope ytd-playlist-video-list-renderer"]').querySelector('ytd-continuation-item-renderer') === null) {
                        scrolldown.disconnect();
                        if (scrollb.getAttribute("auto") == 'true') {
                            exportPlay();
                        }
                        scrollb.click();
                    } else {
                        document.querySelector('div[id="contents"][class=" style-scope ytd-playlist-video-list-renderer style-scope ytd-playlist-video-list-renderer"]').querySelector('ytd-continuation-item-renderer').scrollIntoView();
                    }
                });
                scrolldown.observe(document.querySelector('div[id="contents"][class=" style-scope ytd-playlist-video-list-renderer style-scope ytd-playlist-video-list-renderer"]'), {
                    childList: true,
                    subtree: true
                });
                scrollb.addEventListener("click", () => {
                    scrolldown.disconnect();
                    scrollb.addEventListener("click", scroll, {
                        once: true
                    });
                    scrollb.setAttribute("scroll", false);
                }, {
                    once: true
                });
                scrollb.setAttribute("scroll", true);
            }
        };

        let bar = document.querySelector('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]');
        let menuelm = bar.querySelector('ytd-menu-renderer');

        let scrollb = document.createElement('button');
        scrollb.className = classes;
        scrollb.id = "scrollb";
        scrollb.setAttribute("auto", true);
        scrollb.addEventListener("click", scroll, {
            once: true
        });

        let buttonrenderer = document.createElement("ytd-button-renderer");
        buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
        bar.insertBefore(buttonrenderer, menuelm);
        let shape = buttonrenderer.querySelector('yt-button-shape');
        shape.appendChild(scrollb);
        let tooltip = buttonrenderer.querySelector('tp-yt-paper-tooltip');
        tooltip.innerHTML = '<div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip">Export</div>';
        let icondiv = document.createElement("div");
        icondiv.className = 'yt-spec-button-shape-next__icon';
        let yticon = document.createElement("yt-icon");
        let yticonshape = document.createElement("yt-icon-shape");
        yticonshape.className = "style-scope yt-icon";
        scrollb.appendChild(icondiv);
        icondiv.appendChild(yticon);
        yticon.appendChild(yticonshape);
        yticonshape.innerHTML = '<icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg width="24" height="24" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M16,1A15,15,0,1,0,31,16,15.007,15.007,0,0,0,16,1Zm0,2A13,13,0,1,1,3,16,13.006,13.006,0,0,1,16,3Z" transform="translate(-1 -1)" fill-rule="evenodd"/><path d="M21.293,12.293,16,17.586l-5.293-5.293a1,1,0,0,0-1.414,1.414l6,6a1,1,0,0,0,1.414,0l6-6a1,1,0,1,0-1.414-1.414Z" transform="translate(-1 -1)" fill - rule="evenodd"/></svg></div></icon-shape>';

        delete bar
        delete menuelm
        delete buttonrenderer
        delete shape
        delete tooltop
        delete icondiv
        delete yticon
        delete yticonshape
        delete classes

        const titlechange = new MutationObserver(mutations => {
            console.log("locationchange");
            if (scrollb.getAttribute('scroll') == 'true') {
                scrollb.click();
            }
            start();
        })
        titlechange.observe(document.querySelector('div[class="dynamic-text-container style-scope yt-dynamic-sizing-formatted-string"]').querySelector('yt-formatted-string'), {
            childList: true,
            subtree: true
        });
    });
}

function start() {
    if (url === "https://www.youtube.com/playlist") {
        page = "playlist";
        injectplaylist(false);
    } else if (url === "https://www.youtube.com/watch") {
        page = "video";
    } else {
        page = null;
    }
}

start();

chrome.runtime.onMessage.addListener((obj, sender, res) => {
    const {
        type,
        data
    } = obj;
    if (type === "exportplay") {
        if (page != "playlist") {
            alert("This page is not a playlist");
        } else {
            exportPlay();
        }
    } else if (type === "scroll") {
        if (page != "playlist") {
            alert("This page is not a playlist");
        } else {
            document.getElementById("scrollb").click();
        }
    } else if (type === "import") {
        if (page != "video") {
            alert("This page is not a video");
        } else {
            savePlaylist(data.name);
        }
    } else if (type === "update") {
        console.log("updated")
        document.getElementById("scrollb").setAttribute("auto", data.auto);
        title = data.title;
    } else if (type === "count") {
        res({ text: document.querySelectorAll('a[id="video-title"]').length.toString(), scroll: document.getElementById('scrollb').getAttribute('scroll') })
    }
})
