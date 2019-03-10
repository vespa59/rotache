import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const goHome = () => {
    window.history.pushState("", document.title, window.location.origin);
}


if (window.location.pathname === "/spotifyCallback/"){
    localStorage.removeItem('spotifyToken');

    if (window.location.hash){
        const paramsArray = window.location.hash.substring(1).split('&');
        let params = {};
        paramsArray.forEach(item => {
            const kv = item.split('=');
            params[kv[0]] = kv[1];
        });

        // make sure the state matches what we sent
        if (params.state !== sessionStorage.getItem('spotifyState'))
            goHome();

        // write the token to localStorage
        localStorage.setItem('spotifyToken', JSON.stringify({
            token: params.access_token,
            expires: Math.floor(Date.now()/1000) + 3600
        }));        

    }
    goHome();
};

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
