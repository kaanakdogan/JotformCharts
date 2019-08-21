import React from 'react';

export const FormsContext = React.createContext();

export default function FormsProvider({children}){
  const [forms, setForms] = React.useState([]);

  return(
    <FormsContext.Provider value={[forms, setForms]}>
      {children}
    </FormsContext.Provider>
  )
}