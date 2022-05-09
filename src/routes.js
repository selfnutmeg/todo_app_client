import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="*" element={<AuthPage />} />
        </Routes>
    )
};
