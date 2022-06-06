import React from 'react'
import NavBar from '../NavBar'
import Blog from '../Blog/Blog'

const Mainpage = () => {

  return (
    <div
      style={{
        background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuU6uzZgHhkmAGcJvrWZybCPFBLhcfBEyGw&usqp=CAU)'
      }}>
        <NavBar/>
        <Blog/>
    </div>
  )
}

export default Mainpage