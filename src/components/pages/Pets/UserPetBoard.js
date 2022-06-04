import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Pet from "./Pet"
import NavBar from '../NavBar'
import AddPet from './AddPet'
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    orderBy,
  } from 'firebase/firestore'
import { db } from '../../firebase'
import { useStorage } from '../../context/StorageContext'
import { Button, Card, CardActions, CardContent, CardMedia, FormLabel, TextField, Typography } from "@mui/material"


export default function UserPetBoard( ) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const { pets, users } = useStorage([])

  const userData = users.map((data) => {
    if (data.id === currentUser.uid){
      return (
      <div>
        <h1 key={data.id}>{data.name} {data.lastName}</h1>
        <h3 key={data.id}>{data.email}</h3>
      </div>
      
      )
    }
  })
  


  const handleEdit = async ( pet, title ) => {
    await updateDoc(doc(db, 'pets', pet.id), {title: title})
  }

  const toggleComplete = async ( pet ) => {
    await updateDoc(doc(db, 'pets', pet.id), {
      completed: !pet.completed
    })
  }

  const handleDelete = async ( pet ) => {
    await deleteDoc(doc(db, 'pets', pet.id))
  }

  const about = async ( pet ) => {
    await doc(db, 'pets', pet.id)
  }

  const userAvatar = users.map((data) => {
    if (data.id === currentUser.uid){
      return data.photoURL
    }
  })

  const currentUserPet = pets.map((pet) => {
    if (pet.email === currentUser.email){
      return (
        <Pet
            key={pet.id}
            pet={pet}
            toggleComplete={toggleComplete}
            about={about}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
      )
    }
  })



  return (
    <div
      style={{
        height: '100vh',
        background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzuU6uzZgHhkmAGcJvrWZybCPFBLhcfBEyGw&usqp=CAU)',
        
      }}
    >
      <NavBar/>
      <div
      style={{
        display: 'flex',
         justifyContent: 'space-between',
         alignItems: 'center',
         margin: '0 auto',
         padding: '0 15px',
         marginTop: '5px',
         width: '90%',
         textAlign: 'start',
         border: '1px solid blue',
         borderRadius: '10px',
         backgroundColor: '#ebf3fa',
         color: '#000'
         }}>

        {userData}

        <Button variant="contained">
            <Link
                style={{
                    fontSize: '16px',
                     color: '#fff'
                }}
                to='/pet-board'
            >
              Pet-board
            </Link>
        </Button>

        <FormLabel style={{textAlign: 'center', cursor: 'pointer'}}>
          <TextField style={{margin: '10px', display: 'none'}} type='file' />

          <img src={`${userAvatar}`} alt='avatar' style={{borderRadius: '50%', maxWidth: '100px', height: '100px', margin: '10px', backgroundSize: 'cover'}}/>
        </FormLabel>
      </div>
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 50px',
          
        }}
      >
        <AddPet/>
      </div>
      {currentUserPet}
      
      
    </div>
  )
}

