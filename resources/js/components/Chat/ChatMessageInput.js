import React, { useEffect, useContext } from "react";
import { Context } from "../Store";
import {
    Button,
    InputGroup,
    InputGroupAddon,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";

const ChatMessageInput = () => {
    const [state, dispatch] = useContext(Context);

    return <div></div>;
};

export default ChatMessageInput;
