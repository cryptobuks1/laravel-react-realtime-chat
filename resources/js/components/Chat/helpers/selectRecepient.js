import React, { useEffect, useContext } from "react";
import { Context } from "../../../Store";
// import getMessages from "./getMessages";

const selectReceptient = (body, postHeaders) => {

  const [state, dispatch] = useContext(Context);

  axios
  .post("/api/directmessage", body, postHeaders)
  .then(res => {
      console.log(res.data);
      dispatch({ type: "SET_SELECTED_CHANNEL", payload: res.data });
      dispatch({ type: "CLEAR_MESSAGES", payload: [] });
      getMessages();
      window.Echo.join(`chat.dm.${state.selectedChannel.id}`).listen(
          "MessageSent",
          event => {
              console.log(event);
              const message = {
                  user: event.user,
                  message: event.message.message
              };
              dispatch({ type: "ADD_MESSAGE", payload: message });
          }
      );
  })
  .catch(err => {
      const errors = err.response.data.errors;
      console.log(errors);
      Object.values(errors).map(error => {
          console.log(error.toString());
      });
  });
}

export default selectReceptient;