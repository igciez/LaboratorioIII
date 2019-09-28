import db from '../db';
import{
    CREATE_PERSONA
} from './types';

export const crearPersona=(formValues)=>{
    let response= db.post('/personas',formValues);
    console.dir(response);
    return({
        type: CREATE_PERSONA,
        payload:response
    });
}