import React, { useEffect, useContext } from "react";
import { Context } from "../../Store";
import {
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import ChatDmList from './ChatDmList';
import Echo from 'laravel-echo'


const MainChat = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
      const myToken = localStorage.getItem("LRC_Token");

      window.Pusher = require('pusher-js');

        window.Echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.MIX_PUSHER_APP_KEY,
            wsHost: window.location.hostname,
            wsPort: 6001,
            disableStats: true,
            forceTLS: false
        });

        window.Echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + myToken
        window.Echo.options.auth = {
          headers: {
              Authorization: 'Bearer ' + myToken,
          },
        }
        window.Echo.join('chat');
    }, []);

    return (
        <div>
            <Container fluid="true">
              <ChatDmList echo={window.Echo}/>
            </Container>
        </div>
    );
};

export default MainChat;
