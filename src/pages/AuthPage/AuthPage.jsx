import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Login} from './Login';
import {Registration} from './Registration';

import './AuthPage.scss';

const AuthPage = () => {
    return (
        <React.Fragment>
            <div className="container">
                <div className="auth-page">
                    <Routes>
                        <Route path="login" element={<Login />} />
                        <Route path="registration" element={<Registration />} />
                        <Route
                            path="*"
                            element={<Navigate to="login" replace />}
                        />
                    </Routes>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AuthPage;
