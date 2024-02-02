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

let name = "Playlist" + parseInt(Math.random()*100);

async function savePlaylist(listname) {
    let save = await waitForElm("[aria-label='Save to playlist']");
    save.click();
    let createbutton = await waitForElm('#actions > ytd-button-renderer > yt-button-shape > button[class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--call-to-action yt-spec-button-shape-next--size-m"]')
    let listinput = await waitForElm('#name-input');
    let checkboxelm = document.querySelector(`yt-formatted-string[title='${listname}']`);
    if (checkboxelm != null) {
        let checked = checkboxelm.parentElement.parentElement.parentElement.parentElement.checked;
        console.log(checked);
        if (checked === false) {
            checkboxelm.click()
        }
        if (checked === true) {
            console.log("added");
        }
    } else {
        console.log(listname)
        let create = document.getElementById('endpoint');
        create.click();
        listinput.value = listname;
        console.log("changed value to "+ listinput.value)
        listinput.dispatchEvent(new Event("input"));
        createbutton.click();
        console.log(createbutton)
        console.log(listinput)
        console.log(create)
    }
    const waitNotif = new MutationObserver(mutations => {
        let notifs = document.querySelectorAll("tp-yt-paper-toast");
        for (let i = 0; i < notifs.length; i++) {
            if (notifs[i].children[1].firstElementChild.firstElementChild && notifs[i].children[1].firstElementChild.firstElementChild.innerHTML === "Saved to ") {
                console.log("added");
                waitNotif.disconnect();
            }
        }
    });
    waitNotif.observe(document.querySelector("ytd-popup-container"), {
        childList: true,
        subtree: true
    });
}

savePlaylist(name)