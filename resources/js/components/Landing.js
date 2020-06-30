import React, { useEffect, useContext } from "react";
import { Context } from "../Store";

const Landing = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        let token = localStorage.getItem("LRC_Token");
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        axios
            .get("/api/auth/user")
            .then(res => {
                // if(res.status === 201) {
                console.log(res.data);
                dispatch({ type: "IS_AUTH", payload: res.data });
                // }
            })
            .catch(err => {});
    }, []);

    return (
        <div>
            <ul>
                <li>
                    <a href="register">Register</a>
                </li>
                <li>
                    <a href="login">Login</a>
                </li>
                <li>
                    <a href="chat">Start Chatting</a>
                </li>
                <li>{state.currUserName}</li>
            </ul>
        </div>
    );
};

export default Landing;
