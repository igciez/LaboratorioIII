//Apply -> es para bindear el this con persona1

const persona1={
    nombre:"nombre1",
    apellido:"appellido"
}

printName.apply(persona1);

function printName(){
    console.dir(this);
}

const accion=printName();

//Boostrap
/**
 * npm install --save bootstrap  
 */