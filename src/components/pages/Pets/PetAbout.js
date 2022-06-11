import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate, useParams } from "react-router-dom"
import Pet from "../Pets/Pet"
import NavBar from '../NavBar'
import AddPet from '../Pets/AddPet'
import {
    doc,
    updateDoc,
    deleteDoc,
  } from 'firebase/firestore'
import { db } from '../../firebase'
import { useStorage } from '../../context/StorageContext'
import { FormLabel, TextField } from "@mui/material"
import ProfilePannel from "../Profile.js/Profile-pannel"




export default function PetAbout() {
  const { currentUser, logout } = useAuth()
  const { pets, users } = useStorage([])
  const [photoURL, setPhotoURL] = useState()
  const [phone, setPhone] = useState()
  const {id} = useParams()

  const userData = users.map((data) => {
    if (data.id === currentUser.uid){
      return (
      <div key={data.id}>
        <h1>{data.name} {data.lastName}</h1>
        <h3>{data.email}</h3>
      </div>
      
      )
    }
  })


  useEffect(() => {
    users.map((data) => {
     if (data.id === currentUser.uid){
       return setPhotoURL(data.photoURL)
     }
   })
 }, [users])

  useEffect(() => {
    users.map((data) => {
     if (data.id === currentUser.uid){
       return setPhone(data.phone)
     }
   })
 }, [users])


  return (
    <div
      style={{
        height: '100vh',
        background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuU6uzZgHhkmAGcJvrWZybCPFBLhcfBEyGw&usqp=CAU)',
        overflow: 'scroll',
      }}
    >
      <NavBar/>
      <ProfilePannel/>
     
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 50px',
          
        }}
      >
      </div>

      <div>
        {pets.map((data) => {
          if (id === data.id){
            return (
              <div
                key={data.id}
                className="pet-about-wrapper"
              >
                <div className="pet-about-media-wrapper">
                  <img
                    src= {data.photoURL}
                    className='pet-about-img'
                  />
                  <div>
                    <p>
                      Email: {data.email}
                    </p>

                    <p>
                      Phone: {phone}
                    </p>

                    <p className='country'>
                      <i class="fa-solid fa-location-dot"></i>
                        {data.country}
                    </p>
                  </div>
                  
                </div>
                
                
                <div
                  className="pet-about-text"
                >
                  <h1>{data.title}</h1>
                  <p>{data.about}</p>
                  <p>Lorem Ipsum является текст-заполнитель обычно используется в графических, печать и издательской индустрии для предварительного просмотра макета и визуальных макетах.</p>
                </div>
                
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

