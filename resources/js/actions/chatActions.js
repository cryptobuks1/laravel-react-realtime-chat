
import React, {useEffect, useContext} from 'react';
import {Context} from '../Store';

const [state, dispatch] = useContext(Context);

export const isAuth = (token) => {
  axios.defaults.headers.common["Authorization"] =
  "Bearer " + token;

    axios.get("/api/auth/user")
    .then((res) =>{
      // if(res.status === 201) {
        console.log(res.data);
        dispatch({type:'IS_AUTH', payload: res.data});
      // }
    })
    .catch((err) => {

    });

}

export const initEcho = (token) => {
  window.Pusher = require('pusher-js');


  window.Echo = new Echo({
      broadcaster: 'pusher',
      key: process.env.MIX_PUSHER_APP_KEY,
      wsHost: window.location.hostname,
      wsPort: 6001,
      disableStats: true,
      forceTLS: false
  });

  window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + token
  window.Echo.options.auth = {
    headers: {
        Authorization: 'Bearer ' + token,
    },
  }

  window.Echo.join('chat');
}