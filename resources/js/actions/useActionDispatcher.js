import { useState, useEffect } from 'react';
import {Context} from '../Store';

 export function useActionDispatcher(action) {
  const [state, dispatch] = useContext(Context);
  const stateRef=useRef(state);
  console.log("IN USEACTIONDISPATCHER")
  useEffect(() => {
    stateRef.current = state;
  }, [])

  const actionDispatcher = (action) => {
    dispatch({type:action.type, payload: action.payload});
  }
  return [state, actionDispatcher];

}