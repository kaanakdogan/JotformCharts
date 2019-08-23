import React from 'react'

export const AuthContext = React.createContext(false);

export function AuthProvider({children}) {
  const [isAuth, setAuth] = React.useState(false)

  return(
    <AuthContext.Provider value={[isAuth,setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}