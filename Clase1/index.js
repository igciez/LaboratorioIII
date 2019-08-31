var btn=document.getElementById("btn");

window.onload=cargar();

function cargar(){
    console.log("boton");
}

btn.addEventListener("click",e=>{    
    console.dir(e);
    e.preventDefault();
})
