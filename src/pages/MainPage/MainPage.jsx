import axios from 'axios';
import {React, useState, useContext, useCallback, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext'

import './MainPage.scss';

const MainPage = () => {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);
    const {userId} = useContext(AuthContext);

    const getTodos = useCallback(async () => {
        try {
            await axios.get('/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then(res => setTodos(res.data));
        } catch (err) {
            console.log('Get Todos error:', err);
        }
    }, [userId]);

    const createTodo = useCallback(async () => {
        if(!text) return null

        try {
            await axios.post('/api/todo/add', {text, userId}, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(() => {
                setText('');
                getTodos();
            });
        } catch (err) {
            console.log('Create Todo error:', err);
        }
    }, [text, userId, getTodos]);

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(() => getTodos());
        } catch (err) {
            console.log('Delete Todo error:', err);
        }
    }, [getTodos]);

    const completeTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/complete/${id}`, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(() => getTodos());
        } catch (err) {
            console.log('Complete Todo error', err);
        }
    }, [getTodos]);

    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`/api/todo/important/${id}`, {
                headers: {'Content-Type': 'application/json'}
            })
            .then(() => getTodos());
        } catch (err) {
            console.log('Important Todo error', err);
        }
    }, [getTodos]);

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    return (
        <div className="container">
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form className="form form-login" autoComplete="off" onSubmit={e => e.preventDefault()}>
                    <div className="row row-input">
                        <div className="input-field col s12">
                            <input
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                            <label htmlFor="input">Задача:</label>
                        </div>
                    </div>

                    <div className="row">
                        <button
                            className="waves-effect waves-light btn blue"
                            onClick={createTodo}
                        >
                            Добавить
                        </button>
                    </div>
                </form>
                
                <h4 className="header-todos">Активные задачи</h4>
                <div className="todos">
                    {   todos.length
                        ?   todos.map((todo, index) => {
                            let cls = ['row flex todos-item'];

                            if (todo.completed) {
                                cls.push('completed')
                            }

                            if (todo.important) {
                                cls.push('important')
                            }

                            return (
                                <div className={cls.join(' ')} key={todo._id}>
                                    <div className="col todos-num">{index + 1}</div>
                                    <div className="col todos-text">{todo.text}</div>
                                    <div className="col todos-buttons">
                                        <i className="material-icons blue-text" onClick={() => completeTodo(todo._id)}>check</i>
                                        <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                                        <i className="material-icons red-text" onClick={() => removeTodo(todo._id)}>delete</i>
                                    </div>
                                </div>
                            );
                        })
                        :   <h5 className="no-todos-placeholder">Нет задач</h5>
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;
