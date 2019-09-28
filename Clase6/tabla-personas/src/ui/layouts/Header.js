import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    return(<div className='ui secondary pointing menu'>
        <NavLink to='/persona/new' className="item">Nueva Persona</NavLink>
        <div className="right menu">
            <NavLink to='/' activeClassName="" className='item'>Tablas</NavLink>
        </div>
    </div>)
}

export default Header;