import React, { useEffect, useContext } from "react";
import { Context } from "../../../Store";

const getMessages = (postHeaders) => {

  const [state, dispatch] = useContext(Context);

  axios.get(`/api/messages/${state.selectedChannel.id}`, postHeaders)
          .then((res) =>{

            console.log("GET MESSAGES OUTPUT BELOW");
            console.log(res.data);
            const messages = res.data;
            dispatch({type:"GET_MESSAGES", payload: messages})

          })
          .catch((err) => {
          });
}

export default getMessages;