import Persona from "./Persona.js";

class Alumno extends Persona{
    constructor(legajo){
        super();
        this.legajo=legajo;
    }
}

export default Alumno;