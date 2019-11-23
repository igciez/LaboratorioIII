import $ from "../node_modules/jquery/dist/jquery.slim";
import Persona from "./Persona.js";

let aux= new Persona("nombre","apellido");

$("#form").submit((event)=>{
    alert( "Handler for .submit() called." );
    event.preventDefault();
})   
      
    

console.log(aux);