
import{
    CREATE_PERSONA
} from './actions/types';

const estadoInicial={
    listPersons:{}
};

const reducer=(estado=estadoInicial, actions)=>{
    switch (actions.type) {
        case CREATE_PERSONA:
            return {
                ...estadoInicial,
                listPersons:actions.payload
            }    
        default:
            return estado;
    }
}

export default reducer;