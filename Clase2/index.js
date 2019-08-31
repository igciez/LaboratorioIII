var primerValor = document.getElementById("primerValor");
var segundoValor = document.getElementById("segundoValor");
var resultado = document.getElementById("resultado");
var btnSumar = document.getElementById("btnSumar");
var row = document.getElementById("row");


btnSumar.addEventListener("click", e => {
    resultado.value = parseInt(primerValor.value) + parseInt(segundoValor.value);
    row.innerHTML += "<td>" + primerValor.value + "</td>" + "<td>" + segundoValor.value + "</td>" +
        "<td>" + resultado.value + "</td>";
})

function $(id) {
    return document.getElementById(id)
}