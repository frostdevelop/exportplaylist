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

waitForElm('[aria-label="Save to playlist"]').then(() => {
    document.querySelector('[aria-label="Save to playlist"]').click()
    waitForElm('tp-yt-paper-dialog').then(() => {
        let checks = document.querySelectorAll('tp-yt-paper-checkbox[class="style-scope ytd-playlist-add-to-option-renderer"]')
        let found = false;
        for (let i = 0; i < checks.length; i++) {
            if (checks[i].childNodes[2].children[0].children[0].children[0].title == listname) {
                checks[i].click();
                found = true;
                console.log("found");
            }
        }
        console.log("aftercheck")
        if (found == false) {
            console.log("notfound")
            waitForElm('tp-yt-paper-item[class="style-scope ytd-compact-link-renderer"]').then(() => {
                document.querySelector('tp-yt-paper-item[class="style-scope ytd-compact-link-renderer"]').click();
                console.log("clicked")
                let elm = document.querySelector('input[placeholder="Enter playlist title..."]');
                elm.value = listname;
                let ev = new Event("input");
                elm.parentElement.dispatchEvent(ev);
                document.querySelectorAll('button[aria-label="Create"]')[1].click();
            });
        }
    });
});
