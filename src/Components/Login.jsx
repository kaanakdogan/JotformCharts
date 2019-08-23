import React, { useEffect } from 'react';
import {promisify} from '../Utils'
import { AuthContext } from '../Contexts/AuthContext';

export function Login(){
  const [state, setState] = React.useContext(AuthContext);
  
  useEffect(() => {
    promisify(global.JF.getUser)
    .then(() =>  {
      setState(true)
    })
    .catch(() => setState(false))
   }, [])

  if(state){
    return null
  } else {
    return <div></div>
  }
}
