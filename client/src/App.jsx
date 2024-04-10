import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  //local storage persists
  localStorage.setItem('name', 'Robert')
  console.log(localStorage.getItem('name'))

  // //session storage does not persist
  // // sessionStorage.setItem('name', 'Jane')
  // console.log(sessionStorage.getItem('name'))

  document.cookie = 'name=Bob;'
  document.cookie = 'cat=In the hat; expires = ' + new Date(2025, 0, 1).toUTCString()
  document.cookie = 'thing=one; expires = ' + new Date(2025, 0, 1).toUTCString() + ';secure;samesite=strict'

  //console.log(document.cookie)

  const cookieObject = document.cookie.split('; ').reduce((prev, current) => {
    const [name, ...value] = current.split('=');
    prev[name] = value[0];
    return prev;
  }, {});

  console.log(cookieObject)

  //document.cookie = "cat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";


return (
 <div>
     howdy
 </div>
 );
}

export default App
