const fileInput = document.getElementById('inputfile');
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    const fr=new FileReader();
    fr.onload = () =>{
      let data = fr.result;
      let arr = data.split('\n');
      for(let i=0;i<arr.length;i++){
        let w = window.open(arr[i]);
      }
    }
    fr.readAsText(files[0]);
});
