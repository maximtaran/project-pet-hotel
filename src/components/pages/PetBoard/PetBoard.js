import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Pet from "../Pets/Pet"
import NavBar from '../NavBar'
import AddPet from '../Pets/AddPet'
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


export default function PetBoard( ) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const { pets, users } = useStorage([])

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
                to='/user-pet-board'
            >
                User Pet-board
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
      </div>

      {pets.map((pet) => (
        <Pet
            key={pet.id}
            pet={pet}
            toggleComplete={toggleComplete}
            about={about}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
      ))}
      
      
    </div>
  )
}

