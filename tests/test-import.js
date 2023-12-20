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

let listname = "Watch Later";

waitForElm('[aria-label="Save to playlist"]').then((e) => {
    e.click()
    waitForElm('tp-yt-paper-dialog').then(() => {
        let checks = document.querySelectorAll('tp-yt-paper-checkbox');
        let found = false;
        for (let i = 0; i < checks.length; i++) {
            if (checks[i].children[1].children[0].children[0].children[0].title == listname) {
                if(checks[i].checked === false){
                    checks[i].click();
                };
                found = true;
                console.log("found");
            }
        }
        console.log("aftercheck")
        if (found == false) {
            console.log("notfound")
            waitForElm('.ytd-add-to-playlist-create-renderer').then(() => {
                document.getElementsByClassName("ytd-add-to-playlist-create-renderer")[0].click();
                console.log("clicked")
                let elm = document.getElementsByClassName("tp-yt-paper-input")[3];
                elm.value = listname;
                elm.parentElement.dispatchEvent(new Event("input"));
                document.getElementsByClassName("yt-spec-button-shape-next--text yt-spec-button-shape-next--call-to-action")[0].click();
            });
        }
    });
});
