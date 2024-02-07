import React from 'react'
import LoginPage from '../pages/LoginPage';

export const PrivateRoute = ({ children }) => {

    if (!localStorage.getItem('accessToken')) {
        return <LoginPage />
    }
    return children;



}
