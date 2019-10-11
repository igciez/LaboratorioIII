function cargarLista(){
    var tipoUsuario = localStorage.getItem("tipo");
    var notas = JSON.parse(localStorage.getItem("notas"));
    var count = Object.keys(notas).length;
    var tablaHTML = "<caption></caption>\
    <thead>\
        <tr>\
            <th>Legajo</th>\
            <th>Nombre</th>\
            <th>Materia</th>\
            <th>Nota</th>";
            if(tipoUsuario === "Admin"){
                tablaHTML += "<th>Acción</th>";
            }            
        tablaHTML += "</tr>\
    </thead>\
    <tbody>";    
    for(i = 0; i < count; i++){
        if(notas[i].nota >= 4){
            tablaHTML += "<tr>"
        }
        else{
            tablaHTML += "<tr class='desaprobado'>"
        }
        tablaHTML += "<td>"+notas[i].legajo+"</td>\
        <td>"+notas[i].nombre+"</td>\
        <td>"+notas[i].materia+"</td>\
        <td>"+notas[i].nota+"</td>";
        if(tipoUsuario === "Admin"){
            tablaHTML += "<td><a onclick='editar("+i+",event)' href='#'>Editar</a></td></tr>"; 
        }            
        else{
            tablaHTML += "</tr>"
        }                      
    } 
    tablaHTML += "</tbody>";
    $("#tabla").html(tablaHTML);
}

function pedirNotas(){
    $("#divNuevoPost").hide();
    $("#imgLoading").show();
    $.ajax({
        url:"http://localhost:3000/notas",
        success:function(result){
            $("#imgLoading").hide();
            localStorage.setItem("notas",JSON.stringify(result));   
            cargarLista();    
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            alert("Ocurrió un error en el servidor. Código: " + jqXHR.status);
            $("#imgLoading").hide();
        }
    });
} 

function editar(i){
    var notas = JSON.parse(localStorage.getItem("notas"))[i];
    $("#txtLegajo").val(notas.legajo);
    $("#txtNombre").val(notas.nombre);
    $("#txtMateria").val(notas.materia);
    $("#txtNota").val(notas.nota);
    $("#indexAlumno").val(i);
    $("#divNuevoPost").show();
}

function Cerrar(){
    $("#divNuevoPost").hide();
}

function Guardar(){
    var indexAlumno = $("#indexAlumno").val();
    var notas = JSON.parse(localStorage.getItem("notas"));
    notas[indexAlumno].legajo = parseInt($("#txtLegajo").val());
    notas[indexAlumno].nombre = $("#txtNombre").val();
    notas[indexAlumno].materia = $("#txtMateria").val();
    notas[indexAlumno].nota = parseInt($("#txtNota").val());

    $("#imgLoading").show();

    $.ajax({
        type:"POST",
        url:"http://localhost:3000/editarNota",
        datatype: "json",
        data: notas[indexAlumno],
        success:function(result){
            $("#imgLoading").hide();
            $("#divNuevoPost").hide();
            console.log(result);         
            if(result.type == "error"){
                alert(result.message);
            }
            else{
                pedirNotas();
            }   
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            alert("Ocurrió un error en el servidor. Código: " + jqXHR.status);
            $("#imgLoading").hide();
            $("#divNuevoPost").hide();
        }
    });
}

window.onload = pedirNotas;
