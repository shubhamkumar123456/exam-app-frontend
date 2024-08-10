import React, { useState } from 'react'
import UserContext from './UserContext'

const UserState = (props) => {
    const details = JSON.parse(localStorage.getItem('user_details'))
    const [user, setuser] = useState({
        login:details?details.login:false,
        user:details?details.user:""
    });
  return (
 
    <UserContext.Provider value={{user,setuser}}>
        {props.children}
    </UserContext.Provider>
  )
}
export default UserState
