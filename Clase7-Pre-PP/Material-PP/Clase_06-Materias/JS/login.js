function loguear() {
    if(validarLogin()){
        var email = $("#txtUser").val();
        var pass = $("#txtPass").val();
        var login = { email: email, password: pass };
        localStorage.setItem("email", email);
        $("#imgLoader").show();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/login",
            datatype: "json",
            data: login,
            success:function(result){
                $("#imgLoader").hide();
                console.log(result);         
                if(result.type == "error"){
                    $("#info").html("Debe ingresar un mail y password válido");
                    $("#txtUser").addClass("txtError");
                    $("#txtPass").addClass("txtError");
                }
                else{
                    $("#info").html("");
                    $("#txtUser").removeClass("txtError");
                    $("#txtPass").removeClass("txtError");
                    localStorage.setItem("tipo",result.type);
                    window.open("./index.html", "_self");
                }              
            },
            error: function( jqXHR, textStatus, errorThrown ) {
                alert("Ocurrió un error en el servidor. Código: " + jqXHR.status);
                $("#imgLoader").hide();
            }
        });
    }    
}

function validarLogin(){
    var email = $("#txtUser").val();
    var pass = $("#txtPass").val();
    var retorno = true;

    if(email === "" || pass === ""){
        alert("ERROR: Debe llenar los campos.");
        retorno = false;
    }
    
    return retorno;
}