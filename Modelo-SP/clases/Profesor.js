import Persona from "./Persona.js";

class Profesor  extends Persona {
    
    constructor(nombre, apellido){
        this.nombre= nombre;
        this.apellido= apellido;    
    }
    
}

export default Profesor;