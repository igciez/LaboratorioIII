let xhr = new XMLHttpRequest();
let spin = `<img  class="imgLoading" src="./img/InternetSlowdown_Day.gif" alt="no foto" height="42" width="42">`;

document.addEventListener("DOMContentLoaded", () => {

    let auxPersona;

    xhr.open("GET", "http://localhost:3000/personas", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {

            let response = JSON.parse(xhr.responseText);
            console.dir(response)
            if (response.type === "error") {
                console.log("No anda");
            }
            else {
                console.log("entra al servidor");
                response.forEach(element => {
                    auxPersona = `<article class="article" id="article" onclick="selectedCard(this)" >
                    <img class="imgUser" src="./img/user.png" alt="no imagen" height="42" width="42"/>
                    <div class="content-tex" >
                    <h2 class="txt" >${element.nombre}</h2>   
                    <h3 class="txt">${element.apellido}</h3>
                    <h4 class="txt" >${element.sexo} </h4>
                    </div>
                    </article>`;
                    document.getElementById("cards").innerHTML += auxPersona;
                });
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

});

const selectedCard = (e) => {
    let datos = {
        nombre: e.childNodes[3].childNodes[1].innerText,
        apellido: e.childNodes[3].childNodes[3].innerText,
        sexo: e.childNodes[3].childNodes[5].innerText
    }
    console.dir(datos);
    let form = `<section id="form" class="form" >
    <label class="lbltxt">Nombre</label>
    <input type="text" name="nombre" id="nombrePost" class="texto" value="${datos.nombre}" />
    <label class="lbltxt">Apellido</label>
    <input type="text" name="apellido" id="apellidoPost" class="texto" value="${datos.apellido}"/>
    <label class="lbltxt">Sexo</label>
    <input type="radio" name="sexo" value="femenino" ${datos.sexo === "Female" ? "checked" : ""}>
    <label for="sexo" class="textolbl">Femenino</label>
    <input type="radio" name="sexo" value="masculino" ${datos.sexo === "Male" ? "checked" : ""}>
    <label for="sexo" class="textolbl">Masculino</label>
    <button id="eliminar" class="btnSingIn" onclick="modificar(this)">Eliminar</button>
    <button id="modificar" class="btnSingIn" onclick="borrar(this)">Modificar</button>
    </section>`;
    document.getElementById("cards").innerHTML += form;
    
}

const modificar=(e)=>{
    let datos = {
        nombre: document.getElementById("nombrePost").value,
        apellido: document.getElementById("apellidoPost").value,
        sexo:"Male"
    }

    console.dir(datos);

    if (validarPost(datos)) {
        document.getElementById("form").innerHTML = spin;
        xhr.open("POST", "http://localhost:3000/editar", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                console.dir(response)
                if (response.type === "error") {
                    console.log("No anda");
                }
                else {
                    console.log("entra al servidor:POST");
                    console.dir(response);
                }
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(datos));
    }
}

const validarPost = (datosPost) => {
    if (datosPost.nombre === "" || datosPost.apellido === "" ) {
        alert("ERROR: Debe llenar los campos.");
        return false;
    }
    return true;
}


