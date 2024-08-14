document.addEventListener("DOMContentLoaded",()=>{
    const imgs = document.getElementsByClassName("img");
    const caroulsels = document.getElementsByClassName("carousel");
    let positions = [];
    let velocities = [];
    let sizes = [];
  
    for(let i=0; i<imgs.length; i++){
      imgs[i].addEventListener("contextmenu", (e)=>{
        e.preventDefault();
      })
      sizes.push([imgs[i].offsetWidth,imgs[i].offsetHeight])
      imgs[i].addEventListener("mousemove", (e)=>{
        let middlex = sizes[i][0]/2;
        let middley = sizes[i][1]/2;
        let x = (e.offsetX - middlex)/middlex;
        let y = (e.offsetY - middley)/middley;
        imgs[i].style = `transform: perspective(400px) translateZ(50px) rotate3d(${y}, ${-x}, 0, 15deg);`;
        //console.log(imgs[i].style.tranform);
      })
      imgs[i].addEventListener("mouseleave", (e)=>{
        imgs[i].style = "";
      })
  
    }
  
    /*
  function expon(i, time){
    if(velocities[i] != 0) {
      console.log("expon")
      const sign = Math.sign(velocities[i]);
      velocities[i] -= Math.sign(velocities[i])*amounts[i];
      amounts[i] *= 1.01;
      if(Math.sign(velocities[i])==sign){
        positions[i] += velocities[i];
        caroulsels[i].style.transform = `translate(${positions[i]}px,0)`;
        setTimeout(time, expon(i, time));
      } else {
        return
      }
    } else {
      return
    }
  }
  */
  
    var starttime = 0;
  
    function expon(i, time, duration, start=false){
      if(start) starttime = time;
      const target = velocities[i];
      const progress = time - starttime;
      let falloff = 1-(progress/duration);
      if(falloff < 0) falloff = 0;
      positions[i] += target*falloff;
      positions[i] = Math.max(-(caroulsels[i].offsetWidth)+400, Math.min(positions[i], 0));
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
      caroulsels[i].style.width = `${caroulsels[i].children.length*480}px`;
      console.log(caroulsels[i].style.width)
      caroulsels[i].addEventListener("mousedown", (e)=>{
        caroulsels[i].classList.add("clicked");
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
          positions[i] += e.movementX/1.2;
          //console.log(e.movementX)
          velocities[i] = e.movementX/1.2;
          positions[i] = Math.max(-(caroulsels[i].offsetWidth)+400, Math.min(positions[i], 0));
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