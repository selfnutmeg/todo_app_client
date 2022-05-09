import {React, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext'

export const Login = () => {
    const {login} = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const loginHandler = async () => {
        try {
            await axios.post('/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => login(res.data.token, res.data.userId));
        } catch (err) {
            console.log('Login handle error', err);
        }
    }

    return (
        <>
            <h3>Авторизация</h3>
            <form className="form form-login"  onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            type="email"
                            name="email"
                            className="validate"
                            onChange={changeHandler}
                            value={form.email}
                        />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field col s12">
                        <input
                            type="password"
                            name="password"
                            className="validate"
                            onChange={changeHandler}
                            value={form.password}
                        />
                        <label htmlFor="password">Пароль</label>
                    </div>
                </div>

                <div className="row">
                    <button
                        className="wawes-effect wawes-light btn blue"
                        onClick={loginHandler}
                    >
                        Войти
                    </button>

                    <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
                </div>
            </form>
        </>
    );
}
