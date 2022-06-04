import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'

import NavBar from '../NavBar'
import { useStorage } from '../../context/StorageContext'
import { useAuth } from '../../context/AuthContext'
import AddPet from '../Pets/AddPet'
import Blog from '../Blog/Blog'

const Mainpage = () => {

  const { currentUser } = useAuth()
  const { pets, users } = useStorage()

  

  

  return (
    <div style={{background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuU6uzZgHhkmAGcJvrWZybCPFBLhcfBEyGw&usqp=CAU)'}}>
        <NavBar/>
        <Blog/>
        {/* {userData}
        <AddPet/>
        <PetBoard/> */}
    </div>
  )
}

export default Mainpage