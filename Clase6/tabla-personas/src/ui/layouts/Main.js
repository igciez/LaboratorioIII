import React from 'react';
import { Route, Switch } from "react-router-dom";
import ListaPersonas from '../paginas/ListaPersonas';
import CrearPersona from '../paginas/CrearPersona';
//import EditarPersona from '../paginas/EditarPersona';
//import BorrarPersona from '../paginas/BorrarPersona';

class Main extends React.Component  {
    render(){
        return (
            <Switch>
                <Route path='/' exact component={ListaPersonas} />
                <Route path='/persona/new' exact component={CrearPersona} />
                {/* <Route path='/persona/new' exact component={EditarPersona} />
                <Route path='/persona/new' exact component={BorrarPersona} /> */}
            </Switch>
        )
    }
}

export default Main;