var btn=document.getElementById(user);

btn.addEventListener("click",e=>{    
    console.log(btn.value);
    e.preventDefault();
})