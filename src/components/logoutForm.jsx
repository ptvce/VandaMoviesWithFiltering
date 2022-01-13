import  { Component, useEffect } from 'react';
import auth from '../services/authService';

function LogoutForm (){
    useEffect(() => {
        auth.logout();
        window.location='/login';
    },[]);
    return null  ;
}

export default LogoutForm;