import {React, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

export const Registration = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const registerHandler = async () => {
        try {
            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate("/", { replace: true });
        } catch (err) {
            console.log('Register error:', err)
        }
    } 

    return (
        <>
            <h3>Регистрация</h3>
            <form className="form form-login" autoComplete="off" onSubmit={e => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <input
                            type="email"
                            name="email"
                            className="validate"
                            autoComplete="false"
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
                            autoComplete="false"
                            onChange={changeHandler}
                            value={form.password}
                        />
                        <label htmlFor="password">Пароль</label>
                    </div>
                </div>

                <div className="row">
                    <button
                        className="waves-effect waves-light btn blue"
                        onClick={registerHandler}  
                    >
                        Регистрация
                    </button>

                    <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                </div>
            </form>
        </>
    );
}
