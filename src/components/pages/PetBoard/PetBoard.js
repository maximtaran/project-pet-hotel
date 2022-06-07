import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import Pet from "../Pets/Pet"
import NavBar from '../NavBar'
import {
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useStorage } from '../../context/StorageContext'


export default function PetBoard( ) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [photoURL, setPhotoURL] = useState()

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

  useEffect(() => {
    users.map((data) => {
     if (data.id === currentUser.uid){
       return setPhotoURL(data.photoURL)
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
      <div
        className="profile-pannel"
      >
        <div
          style={{minHeight: '150px'}}
        >
          {userData}

          <Link
            className="btn-link"
            to='/user-pet-board'
          >
            User Pet-board
          </Link>
        </div>

        <img src={photoURL} alt='avatar' style={{borderRadius: '50%', maxWidth: '100px', height: '100px', margin: '10px', backgroundSize: 'cover'}}/>
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

