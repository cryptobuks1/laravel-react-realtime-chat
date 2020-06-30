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

const MainChat = () => {
    const [state, dispatch] = useContext(Context);

    return (
        <div>
            <Container fluid="true"></Container>
        </div>
    );
};

export default MainChat;
