

import React from "react";
import { Col, Button } from "reactstrap";

export const ChatDmUsersList = (props) => {
    const users = props.dmUsers.filter(u => u.id !== props.currUser.id);
    // console.log(typeof(users));
  const { dmSelect } = props;
  console.log("FROM CHATDMUSERSLIST ");
  console.log(users);
    const userList = users.map((value, index) => {
        return (
            <Col key={index}>
                <Button color="link"
                    onClick={() => dmSelect(value.id)}
                    id={value.users[0].id}>
                    <b>{value.users[0].name}</b>
                </Button>
                <br></br>
            </Col>
        );
    });


    return (
      <div>
      <h3>Direct Message</h3>

        {userList}
      </div>
    )
};

export default ChatDmUsersList;
