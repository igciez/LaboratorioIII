let xhr = new XMLHttpRequest();
let spin = `<img  class="imgLoading" src="./img/InternetSlowdown_Day.gif" alt="no foto" height="42" width="42">`;
let data = [];

document.addEventListener("DOMContentLoaded", () => {

    xhr.open("GET", "http://localhost:3000/personas", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);

            if (response.type === "error") {
                console.log("No anda");
            }
            else {
                console.log("entra al servidor");
                data = response;
                cargarPersona(data);
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
});

const cargarPersona = (argData) => {
    let auxPersona;
    document.getElementById("cards").innerHTML = "";
    argData.forEach(element => {
        auxPersona = `<article class="article" id="article" onclick="selectedCard(this, '${element.nombre}','${element.apellido}','${element.sexo}','${element.id}' )" >
        <img class="imgUser" src="./img/user.png" alt="no imagen" height="42" width="42"/>
        <div class="content-text" >
        <h2 class="txt" >${element.nombre}</h2>   
        <h3 class="txt">${element.apellido}</h3>
        <h4 class="txt" >${element.sexo} </h4>
        </div>
        </article>`;
        document.getElementById("cards").innerHTML += auxPersona;
    });
}

const selectedCard = (e, name, lastName, sexo, id) => {
    let datos = {
        nombre: name,
        apellido: lastName,
        sexo: sexo,
        id: id
    }
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
    <button id="eliminar" class="btnSingIn" onclick="modificarPersona(this, '${datos.id}')">Modificar</button>
    <button id="modificar" class="btnSingIn" onclick="borrarPersona(this, '${datos.id}')">Eliminar</button>
    </section>`;
    document.getElementById("cards").innerHTML += form;
}

const modificarPersona = (e, id) => {
    let auxData = [];
    let auxDatos = {
        nombre: document.getElementById("nombrePost").value,
        apellido: document.getElementById("apellidoPost").value,
        sexo: "Male",
        id: id
    };

    if (validarPost(auxDatos)) {
        document.getElementById("form").innerHTML = spin;
        xhr.open("POST", "http://localhost:3000/editar", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                
                if (response.type === "error") {
                    console.log("No anda");
                }
                else {
                    console.log("entra al servidor:POST");
                    auxData = data.filter(element => {
                        if (parseInt(element.id) === parseInt(auxDatos.id)) {
                            return (
                                element.nombre = auxDatos.nombre,
                                element.apellido = auxDatos.apellido,
                                element.sexo = auxDatos.sexo,
                                element.id = auxDatos.id
                            );
                        } else {
                            return true;
                        }
                    });
                    cargarPersona(auxData);
                }
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(auxDatos));
    }
}

const borrarPersona = (e, id) => {
    let auxData = data.filter(element => (
        parseInt(element.id) !== parseInt(id)
    ));
    data=auxData;
    cargarPersona(auxData);
}

const validarPost = (datosPost) => {
    if (datosPost.nombre === "" || datosPost.apellido === "") {
        alert("ERROR: Debe llenar los campos.");
        return false;
    }
    return true;
}


