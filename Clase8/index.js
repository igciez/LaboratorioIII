// window.addEventListener("load",()=>{
//     console.log("ashrre");
//     //jquery
//     console.log($("p"));
//     console.log($("#btn"));
//     console.log($("#parrafo").html());
//     console.log($("#parrafo").html("gatienso"));
//     $("#btn").click(saludar);
// });

$("document").ready(()=>{
    $("#btn").click(saludar);
    console.log($("#txt").val());
    $("#txt").attr("id"); //attr: retorna el valor del parametro.

    //Ajax con Jquery
    $("#btn").click(()=>{
        $.get("http://localhost:3000/personas",()=>{
            ()=>{
                //todo
            }
        })
        $.post("url",()=>{
            //todo
        })
    })
    
})

function saludar(){
    alert("hola");
}