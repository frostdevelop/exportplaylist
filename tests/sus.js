let classes = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button";

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

waitForElm('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]').then(()=>{
  let bar = document.querySelector('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]');
  let exportb = document.createElement('button');
  exportb.className = classes;
  exportb.onclick = ()=>document.querySelector('yt-formatted-string[class="style-scope yt-dynamic-sizing-formatted-string yt-sans-28"]').innerHTML = "Among Us";
  let buttonrenderer = document.createElement("ytd-button-renderer");
  buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
  bar.appendChild(buttonrenderer);
  let tooltip = buttonrenderer.querySelector('tp-yt-paper-tooltip');
  tooltip.innerHTML = '<div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip">Sus</div>';
  let shape = buttonrenderer.querySelector('yt-button-shape');
  shape.appendChild(exportb); 
  let icondiv = document.createElement("div");
  icondiv.className = 'yt-spec-button-shape-next__icon';
  let yticon = document.createElement("yt-icon");
  let yticonshape = document.createElement("yt-icon-shape");
  yticonshape.className = "style-scope yt-icon";
  exportb.appendChild(icondiv);
  icondiv.appendChild(yticon);
  yticon.appendChild(yticonshape);
  yticonshape.innerHTML = '<icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M25.965,21.1733C25.9756,21.1149,26,21.0615,26,21v-6.0309c0.62-0.8327,1-1.8535,1-2.9691   c0-1.389-0.5712-2.6455-1.4888-3.5525C24.4882,5.8477,21.9582,4,19,4h-4c-3.8594,0-7,3.1401-7,7H7c-1.6543,0-3,1.3457-3,3v8   c0,1.6543,1.3457,3,3,3h1.1011c0.4647,2.2793,2.4845,4,4.8989,4h4c0.7711,0,1.468-0.3005,2-0.7803   c0.0171,0.0154,0.0358,0.0289,0.0532,0.0439C19.171,28.6848,19.5409,29,20,29h5c1.6543,0,3-1.3457,3-3v-2   C28,22.6852,27.1445,21.5776,25.965,21.1733z M8,23H7c-0.5518,0-1-0.4487-1-1v-8c0-0.5513,0.4482-1,1-1h1V23z M25,12   c0,1.6543-1.3457,3-3,3h-4c-1.6543,0-3-1.3457-3-3s1.3457-3,3-3h4C23.6543,9,25,10.3457,25,12z M26,26c0,0.5513-0.4482,1-1,1h-4   c-0.5518,0-1-0.4487-1-1v-2c0-1.6543-1.3457-3-3-3h-1c-0.5527,0-1,0.4478-1,1s0.4473,1,1,1h1c0.5518,0,1,0.4487,1,1v2   c0,0.5513-0.4482,1-1,1h-4c-1.6543,0-3-1.3457-3-3V12v-1c0-2.7568,2.2432-5,5-5h4c1.1193,0,2.1489,0.3755,2.9824,1H18   c-2.7568,0-5,2.2432-5,5s2.2432,5,5,5h4c0.7118,0,1.3864-0.1545,2-0.4238V21h-1c-0.5527,0-1,0.4478-1,1s0.4473,1,1,1h2   c0.5518,0,1,0.4487,1,1V26z M22,11c0-0.5523,0.4477-1,1-1s1,0.4477,1,1c0,0.5522-0.4477,1-1,1S22,11.5522,22,11z M18,10h2   c0.5527,0,1,0.4478,1,1s-0.4473,1-1,1h-2c-0.5527,0-1-0.4478-1-1S17.4473,10,18,10z"/></svg></div></icon-shape>';
  console.warn('Warning: "Sex" drive not found.');
  console.error('Class Sex has not been implemented');
})
