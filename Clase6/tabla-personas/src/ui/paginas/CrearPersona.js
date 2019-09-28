import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { crearPersona } from '../../api/actions/index';
import Form from '../widgets/Form';

class CrearPersonas extends React.Component {

    onSubmit=(formValues) =>{
        this.props.crearPersona(formValues);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} buttonName={"Crear Persona"} />
            </div>
        )
    }
}

let mapDispatchProps = dispatch => ({
    crearPersona: bindActionCreators(crearPersona, dispatch)
});

export default connect(null, mapDispatchProps)(CrearPersonas);