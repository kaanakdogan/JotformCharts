import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    const prom = new Promise((resolve, reject) => {
      global.JF.getUser(res => {
        if(res){
          resolve(res)
        } else {
          reject(false)
        }
      })
    })
  
    prom
    .then(() => this.isAuthenticated = true)
    .then(cb)
    .catch((err) => { this.isAuthenticated = false })
  }
};



export function Login(){
  const [state, setState] = useState(false);

  useEffect(() => { Auth.authenticate(() => setState(true))}, [])
  if(state){
    return <Redirect to="/" />
  } else {
    return <div></div>
  }
}
