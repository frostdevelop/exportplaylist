document.addEventListener("DOMContentLoaded",()=>{
  const imgs = document.getElementsByClassName("img");
  const caroulsels = document.getElementsByClassName("carousel");
  let positions = [];
  let velocities = [];
  let sizes = [];
  for(let i=0; i<imgs.length; i++){
    const imgshine = imgs[i].getElementsByClassName('img-shine')[0];
    imgs[i].addEventListener("contextmenu", (e)=>{
      e.preventDefault();
    })
    const halfshinex = imgshine.offsetWidth/2;
    const halfshiney = imgshine.offsetHeight/2;
    sizes.push([imgs[i].offsetWidth,imgs[i].offsetHeight])
    imgs[i].addEventListener("mousemove", (e)=>{
      let middlex = sizes[i][0]/2;
      let middley = sizes[i][1]/2;
      let x = (e.offsetX - middlex)/middlex;
      let y = (e.offsetY - middley)/middley;
      imgs[i].style.transform = `perspective(400px) translateZ(50px) rotate3d(${y}, ${-x}, 0, 15deg)`;
      //console.log(imgs[i].style.tranform);
      //imgshine.style.backgroundImage = `radial-gradient(circle at ${sizes[i][0]-e.offsetX}px ${sizes[i][1]-e.offsetY}px, rgba(255,255,255,255) 0%,rgba(255,255,255,0.5) 35%,rgba(255,255,255,0) 100%)`;
      imgshine.style.backgroundPosition = `${sizes[i][0]-e.offsetX-halfshinex}px ${sizes[i][1]-e.offsetY-halfshiney}px`;
      imgshine.style.opacity = '1';
    })
    imgs[i].addEventListener("mouseleave", (e)=>{
      imgs[i].style = "";
      imgshine.style.opacity = '0';
    })

  }

  var starttime = 0;

  function expon(i, time, duration, start=false){
    if(start) starttime = time;
    const target = velocities[i];
    const progress = time - starttime;
    let falloff = 1-(progress/duration);
    if(falloff < 0) falloff = 0;
    positions[i] += target*falloff;
    positions[i] = Math.max(-(caroulsels[i].offsetWidth)+window.innerWidth, Math.min(positions[i], 0));
    caroulsels[i].style.transform = `translate(${positions[i]}px,0)`;
    if(progress < duration) {
      window.requestAnimationFrame((tim)=>{
        expon(i, tim, duration)
      });
    } else {
      velocities[i] = 0;
    }
  }

  for(let i=0; i<caroulsels.length; i++){
    positions.push(0);
    console.log(caroulsels[i].style.width)
    caroulsels[i].addEventListener("mousedown", (e)=>{
      caroulsels[i].classList.add("clicked");
	  velocities[i] = 0;
    })
    caroulsels[i].addEventListener("mouseup", (e)=>{
      caroulsels[i].classList.remove("clicked");
      starttime = 0;
      window.requestAnimationFrame((time)=>{
        expon(i, time, 1000, true)
      });
    })
    caroulsels[i].addEventListener("mouseleave", (e)=>{
      caroulsels[i].classList.remove("clicked");
      starttime = 0;
      window.requestAnimationFrame((time)=>{
        expon(i, time, 1000, true)
      });
    })
    caroulsels[i].parentElement.addEventListener("mousemove", (e)=>{
      if(caroulsels[i].classList.contains("clicked")){
		const movement = e.movementX/1.2;
        positions[i] += movement;
        velocities[i] = Math.abs(velocities[i]) > Math.abs(movement) ? velocities[i] : movement;
        positions[i] = Math.max(-(caroulsels[i].offsetWidth)+window.innerWidth, Math.min(positions[i], 0));
        caroulsels[i].style.transform = `translate(${positions[i]}px,0)`;
      }
    })
  }
  
  const buttons = document.getElementsByClassName("github");
  for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("mousemove", (e)=>{
      buttons[i].style.background = `radial-gradient(circle at ${e.offsetX}px ${e.offsetY}px, #404040 0%, #121212 110%)`;
    })
    buttons[i].addEventListener("mouseleave", ()=>{
      buttons[i].style = "";
    })
  }
})