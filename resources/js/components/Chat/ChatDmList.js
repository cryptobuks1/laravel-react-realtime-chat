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
import selectRecepient from "./helpers/selectRecepient"

const ChatDmList = (props) => {
    const [state, dispatch] = useContext(Context);
    const token = localStorage.getItem("LRC_Token");

    const postHeaders = {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }
    };

    const getHeaders = {
        headers: {
            Authorization: "Bearer " + token
        }
    };
    useEffect(() => {
        axios
            .get("/api/allusers", getHeaders)
            .then(res => {
                dispatch({ type: "GET_DM_USERS", payload: res.data });
            })
            .catch(err => {});
    }, []);

    const DirectMessageUserList = () => {
        console.log("CURRENT USER BELOW ");
        console.log(state.currUser);
        const users = state.dmUsers.filter(u => u.id !== state.currUser.id);
        // console.log(typeof(users));

        const userList = users.map((value, index) => {
            return (
                <Col key={index}>
                    {" "}
                    <Button
                        onClick={dmSelect.bind(this, value.id)}
                        id={value.id}
                    >
                        <b>{value.name}</b>
                    </Button>
                    <br></br>
                </Col>
            );
        });

        return userList;
    };

    const dmSelect = (id, event) => {
        event.stopPropagation();
        console.log(id);
        window.Echo.leave("chat.channel.5");
        const body = `{ "receiver": ${id} }`;

      <SelectRecepient></SelectRecepient>
    };

    return (
        <div>
            <Col>
                <h3>Direct Message</h3>
                {DirectMessageUserList()}
            </Col>
        </div>
    );
};

export default ChatDmList;
