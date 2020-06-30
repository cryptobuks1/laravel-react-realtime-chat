
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
    } from 'reactstrap';
    import Echo from 'laravel-echo'

const Chat = () => {

    const [state, dispatch] = useContext(Context);

    const myToken = localStorage.getItem("LRC_Token");
    const fakeGeneralChannel = { "id": 5, "type": "channel"};
    const headers = {
      headers: {
        "Authorization":"Bearer "+myToken
      }
    };

      useEffect(()=> {
        axios
        .get("/api/auth/user",headers)
        .then(res => {
            // if(res.status === 201) {
            console.log(res.data);
            dispatch({ type: "IS_AUTH", payload: res.data });
            // }
        })
        .catch(err => {});


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

        axios.get("/api/dmUsers", headers)
          .then((res) =>{
            dispatch({ type: "GET_DM_USERS", payload: res.data });
            })
            .catch((err) => {
            });

            channelSelect(fakeGeneralChannel);
    }, []);

      const messageList = () => {
        const messages = state.messages;
        // console.log(typeof(messages));
        const messagelist = messages.map((value, index) => {
          // console.log(value)
          if(value.status === true) {
            return <Col className="my-3" key={index} sm="6" md={{size: 8, offset: 3}}><strong>{value.user.name}</strong> has <span className="text-primary">{value.message}</span> the channel</Col>
          } else {
            return <Col key={index}><b>{value.user.name }  &lt; { value.user.email }  &gt;  :</b> <br></br> {value.message}</Col>
          }
        });

        return messagelist;
      };


      const userList = () => {
        const users = state.usersInRoom;
        // console.log(typeof(users));

        const userList = users.map((value, index) => {
          console.log(value)
          return <li key={index}><b>{value.name }</b></li>
        });

        return userList;
      }

      const allUserList = () => {
        console.log("CURRENT USER BELOW ");
        console.log(state.currUser);
        const users = state.dmUsers.filter(u => u.id !== state.currUser.id);
        // console.log(typeof(users));

        const userList = users.map((value, index) => {
          return <Col key={index}> <Button onClick={dmSelect.bind(this, value.id)} id={value.id} ><b>{value.name }</b></Button>
          <br></br>
          </Col>
        });

        return userList;
      }

      const dmSelect = (id, event ) => {
        event.stopPropagation();
        console.log(id);
        window.Echo.leave('chat.channel.5');
        const body = `{ "receiver": ${id} }`;

        const headers = {
          headers: {
            "Content-Type": "application/json"
          }
        };


        axios.defaults.headers.common["Authorization"] =
        "Bearer " + myToken;

        console.log(body);
        axios
          .post("/api/directmessage", body, headers)
          .then((res) =>{
             console.log(res.data);
             dispatch({type:"SET_SELECTED_CHANNEL", payload: res.data})
             dispatch({type:"CLEAR_MESSAGES", payload: []})
             getMessages();
             window.Echo.join(`chat.dm.${state.selectedChannel.id}`)
            .listen("MessageSent", (event) => {
                console.log(event);
                const message = {
                  user: event.user,
                  message: event.message.message
                }
                dispatch({type:"ADD_MESSAGE", payload: message})
           });
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map( error => {
              console.log(error.toString());
            });
          });
      }

      const channelSelect = (selectedChannel, event) => {
        if(event !== undefined) {
          event.stopPropagation();
        }
        dispatch({type:"SET_SELECTED_CHANNEL", payload: selectedChannel})
        dispatch({type:"CLEAR_MESSAGES", payload: []})
        getMessages();
          console.log("SELECTED CHANNEL IN channelSelect()");
          console.log(state.selectedChannel);
          window.Echo.join(`chat.channel.${state.selectedChannel.id}`)
          .here(users => {
            dispatch({type:"GET_USERS_IN_ROOM", payload: users})
            })
            .joining(user => {
              dispatch({type:"ADD_USER_TO_ROOM", payload: user})

                const message = {
                  user: user,
                  message: "Joined",
                  status:true
                }
                if(state.selectedChannel.type === "channel")
                 {
                  dispatch({type:"ADD_MESSAGE", payload: message})

                  }
                })
            .leaving(user => {
              dispatch({type:"USER_LEAVES_ROOM", payload: user})

                const message = {
                  user: user,
                  message: "Left",
                  status:true
                }
                if(state.selectedChannel.type === "channel")
                {
                  dispatch({type:"ADD_MESSAGE", payload: message})
                }
            })
            .listen("MessageSent", (event) => {
            console.log(event);
            const message = {
              user: event.user,
              message: event.message.message
            }
            dispatch({type:"ADD_MESSAGE", payload: message})
          });
      }

      const onLogout = () => {

            const headers = {
              headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer "+myToken
              }
            };

            axios.get("/api/auth/logout", headers)
              .then((res) =>{
                if(res.status === 200) {
                  window.Echo.disconnect();
                  localStorage.removeItem("LRC_Token");
                  // setState({
                  //   redirect: true
                  // })
                  props.history.push("/login");
                 }
              })
              .catch((err) => {
              });
      }

      const onChange = (e) => {
        dispatch({type:"SET_MESSAGE", payload: e.target.value});
      };

      // Calls action to register user
      const sendMessage = (e) => {
        e.preventDefault();

        const message = state.message;
        const channel_id = state.selectedChannel.id;
        console.log(state.selectedChannel.id);
        const body = JSON.stringify({ message, channel_id });

        const headers = {
          headers: {
            "Content-Type": "application/json"
          }
        };


        axios.defaults.headers.common["Authorization"] =
        "Bearer " + myToken;

        console.log(body);
        axios
          .post("/api/messages", body, headers)
          .then((res) =>{
             console.log(res);
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            console.log(errors);
            Object.values(errors).map( error => {
              console.log(error.toString());
            });
          });

      };

      const getMessages = () => {
        const headers = {
          headers: {
            "Authorization":"Bearer "+myToken
          }
        };

        console.log("CURRENTLY SELECTED CHANNEL BELOW");
        console.log(state.selectedChannel.id)

        axios.get(`/api/messages/${state.selectedChannel.id}`, headers)
          .then((res) =>{

            console.log("GET MESSAGES OUTPUT BELOW");
            console.log(res.data);
            const messages = res.data;
            dispatch({type:"GET_MESSAGES", payload: messages})

          })
          .catch((err) => {
          });
      }


        return (
          <div>
          <Container fluid="true">
             <Row>
            <Col xs="3">
              <h3>Channels</h3>
               <Col> <Button onClick={channelSelect.bind(this, fakeGeneralChannel)} id="5" key="5"><b> General</b></Button>
          <br></br>
          </Col>
                <h3>Direct Message</h3>
                  {allUserList}
              </Col>
              <Col xs="6">
                <h1>Chat Homepage</h1>
                <Button onClick={onLogout}>Logout</Button>
                {messageList}
                <InputGroup>
                <Input onChange={onChange} id="message" name="message" />
                  <InputGroupAddon addonType="append"><Button onClick={sendMessage}>Send </Button></InputGroupAddon>
                </InputGroup>
              </Col>
              <Col xs="3">
                <h3>Users in this Room</h3>
                <ul>
                  {userList}
                </ul>
              </Col>
            </Row>
          </Container>
          </div>
        )
    }

    export default Chat