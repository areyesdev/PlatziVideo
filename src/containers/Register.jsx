import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {registerRequest} from '../actions';
import '../assets/styles/components/Register.scss';

const Register = props => {
    const [form, setValues] = useState({
        email: '',
        name: '',
        password: '',
    });
    const handleInput = ev => {
        setValues({
            ...form,
            [ev.target.name]: ev.target.value
        })
    }
    const handleSubmit = ev => {
        ev.preventDefault();
        props.registerRequest(form);
        props.history.push('/');
    }
    return (
        <section className="register" onSubmit={handleSubmit}>
            <section className="register__container">
                <h2>Regístrate</h2>
                <form className="register__container--form">
                    <input
                        name="name"
                        className="input"
                        type="text"
                        placeholder="Nombre"
                        onChange={handleInput}
                    />
                    <input
                        name="correo"
                        className="input"
                        type="text"
                        placeholder="Correo"
                        onChange={handleInput}
                    />
                    <input
                        name="password"
                        className="input"
                        type="password"
                        placeholder="Contraseña"
                        onChange={handleInput}
                    />
                    <button className="button">Registrarme</button>
                </form>
                <Link to="/login">
                    Iniciar sesión
                    </Link>
            </section>
        </section>
    )
};

const mapDispatchToProps = {
    registerRequest,
};

export default connect(null, mapDispatchToProps)(Register);