var httpReq = new XMLHttpRequest(); //Nuevo objeto de HttpRequest

var callBackLogin = function () {
    document.getElementById("imgLoader").className = "imgLoadingVisible";
    if (httpReq.readyState === 4) { //Acá hay respuesta del servidor!!      
        if (httpReq.status == 200) { //Codigo de que todo está bien.
            document.getElementById("imgLoader").className = "imgLoadingInvisible";
            console.log(httpReq.responseText);
            window.open("./index.html", "_self");
            //var personas = JSON.parse(httpReq.responseText);   
            localStorage.setItem("preferencias",httpReq.responseText);                  
        }
        else {
            console.log("Ocurrió un error en el servidor. Código: " + httpReq.status);
        }
    }
}

var callBackPost = function () {
    document.getElementById("imgLoading").className = "imgLoadingVisible";
    if (httpReq.readyState === 4) { //Acá hay respuesta del servidor!!      
        if (httpReq.status == 200) { //Codigo de que todo está bien.
            document.getElementById("imgLoading").className = "imgLoadingInvisible";
            console.log(httpReq.responseText);
            var response = JSON.parse(httpReq.responseText);
            var post = `<article>
                            <h2 class="titlePost">`+response.title+`</h2>   
                            <h3 class="headerPost">`+response.header+`</h3>
                            <h4 class="postedBy">Posted by `+response.author+` on `+response.date+`</h4>
                            <p class="textoPost">`+response.posttext+`</p>
                            <hr class="hrPost">
                        </article>`;
            document.getElementById("SeccionPosts").innerHTML += post;            
        }
        else {
            console.log("Ocurrió un error en el servidor. Código: " + httpReq.status);
        }
    }
}

function ajax(metodo, url, parametros, tipo, callback) {
    httpReq.onreadystatechange = callback;
    if (metodo === "GET") {
        httpReq.open("GET", url, tipo); //abre la conexión con el servidor
        httpReq.send();
    }
    else {
        httpReq.open("POST", url, tipo); //abre la conexión con el servidor
        //httpReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); //string
        httpReq.setRequestHeader("Content-Type", "application/json"); //string
        httpReq.send(parametros);
    }
}

function loguear() {
    if(validarLogin()){
        var email = document.getElementById("txtUser").value;
        var pass = document.getElementById("txtPass").value;
        var login = { email: email, password: pass };
        localStorage.setItem("Usuario", JSON.stringify(login));
        ajax("POST", "http://localhost:1337/login", JSON.stringify(login), true, callBackLogin);
    }    
}

function Postear(){
    if(validarPost()){
        document.getElementById("divNuevoPost").className = "divNuevoPost divNuevoPostInvisible";
        var title = document.getElementById("txtTitle").value;
        var header = document.getElementById("txtHeader").value;
        var posttext = document.getElementById("txtContenido").value;
        var usuario = JSON.parse(localStorage.getItem("Usuario"));
        var email = usuario.email;
        var request = { title: title, header: header, posttext: posttext, author: email }

        ajax("POST", "http://localhost:1337/postearNuevaEntrada", JSON.stringify(request), true, callBackPost);
    }    
}

function newPost(){
    var divNuevoPost = document.getElementById("divNuevoPost");
    if (divNuevoPost.className == "divNuevoPost divNuevoPostVisible"){
        divNuevoPost.className = "divNuevoPost divNuevoPostInvisible";
    }
    else{
        divNuevoPost.className = "divNuevoPost divNuevoPostVisible";
    }
}

function validarLogin(){
    var email = document.getElementById("txtUser").value;
    var pass = document.getElementById("txtPass").value;
    var retorno = true;

    if(email === "" || pass === ""){
        alert("ERROR: Debe llenar los campos.");
        retorno = false;
    }
    
    return retorno;
}

function validarPost() {
    var title = document.getElementById("txtTitle").value;
    var header = document.getElementById("txtHeader").value;
    var posttext = document.getElementById("txtContenido").value;
    var retorno = true;

    if (title === "" || header === "" || posttext === "") {
        alert("ERROR: Debe llenar los campos.");
        retorno = false;
    }

    return retorno;
}