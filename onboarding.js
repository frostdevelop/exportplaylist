document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementsByClassName("img"),t=document.getElementsByClassName("carousel"),s=[],n=[],a=[];for(let l=0;l<e.length;l++)e[l].addEventListener("contextmenu",e=>{e.preventDefault()}),a.push([e[l].offsetWidth,e[l].offsetHeight]),e[l].addEventListener("mousemove",t=>{let s=a[l][0]/2,n=a[l][1]/2,o=(t.offsetX-s)/s,i=(t.offsetY-n)/n;e[l].style=`transform: perspective(400px) translateZ(50px) rotate3d(${i}, ${-o}, 0, 15deg);`}),e[l].addEventListener("mouseleave",t=>{e[l].style=""});var o=0;function i(e,a,l,r=!1){r&&(o=a);let d=n[e],m=a-o,$=1-m/l;$<0&&($=0),s[e]+=d*$,s[e]=Math.max(-t[e].offsetWidth+400,Math.min(s[e],0)),t[e].style.transform=`translate(${s[e]}px,0)`,m<l?window.requestAnimationFrame(t=>{i(e,t,l)}):n[e]=0}for(let r=0;r<t.length;r++)s.push(0),t[r].style.width=`${480*t[r].children.length}px`,console.log(t[r].style.width),t[r].addEventListener("mousedown",e=>{t[r].classList.add("clicked")}),t[r].addEventListener("mouseup",e=>{t[r].classList.remove("clicked"),o=0,window.requestAnimationFrame(e=>{i(r,e,1e3,!0)})}),t[r].addEventListener("mouseleave",e=>{t[r].classList.remove("clicked"),o=0,window.requestAnimationFrame(e=>{i(r,e,1e3,!0)})}),t[r].parentElement.addEventListener("mousemove",e=>{t[r].classList.contains("clicked")&&(s[r]+=e.movementX/1.2,n[r]=e.movementX/1.2,s[r]=Math.max(-t[r].offsetWidth+400,Math.min(s[r],0)),t[r].style.transform=`translate(${s[r]}px,0)`)});let d=document.getElementsByClassName("github");for(let m=0;m<d.length;m++)d[m].addEventListener("mousemove",e=>{d[m].style.background=`radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, #404040 0%, #121212 110%)`}),d[m].addEventListener("mouseleave",()=>{d[m].style=""})});