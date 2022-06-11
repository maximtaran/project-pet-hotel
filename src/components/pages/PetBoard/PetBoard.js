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
import { Button, FormGroup, FormLabel, TextField } from "@mui/material"
import ProfilePannel from "../Profile.js/Profile-pannel"

export default function PetBoard( ) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [photoURL, setPhotoURL] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState(true)
  const [searchVisible, setSearchVisible] = useState(false)

  const { pets, users } = useStorage([])

  const userData = users.map((data) => {
    if (data.id === currentUser.uid){
      return (
      <div className="profile-pannel-inner" key={data.id}>
        <h1>{data.name} {data.lastName}</h1>
        <h3>Email: {data.email}</h3>
        <h3>Phone Number: {data.phone}</h3>
        <h3>Country: {data.country}</h3>
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

  const filteredPetsByCountry = pets.filter((pet) => {
    return pet.country.toLowerCase().includes(searchValue.toLocaleLowerCase())
  })

  const filteredPetsByTitle = pets.filter((pet) => {
    return pet.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  })

  const handleSearch = () => {
    
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

    <ProfilePannel/>

    {searchBy ?
    ( 
      <div>
        <h2>Search by country</h2>
        <div className="search-wrapper">
          <FormGroup>
              <TextField
                  type='text'
                  onChange={(e) => setSearchValue(e.target.value)}
                  label='Search by country'
              />
          </FormGroup>

          <div className="filters">
            <Button
              variant="outlined"
              onClick={(e) => setSearchBy(true)}
            >
              By country
            </Button>
            
            <Button
              onClick={(e) => setSearchBy(false)}
            >
              By title
            </Button>
          </div>
          
        </div>
        {filteredPetsByCountry.map((pet) => (
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
    :
    ( 
      <div>
      <h2>Search by title</h2>
      <div className="search-wrapper">
        <FormGroup>
            <TextField
                type='text'
                onChange={(e) => setSearchValue(e.target.value)}
                label='Search by title'
            />
        </FormGroup>

        <div className="filters">
          <Button
            onClick={(e) => setSearchBy(true)}
          >
            By country
          </Button>
          
          <Button
            variant="outlined"
            onClick={(e) => setSearchBy(false)}
          >
            By title
          </Button>
        </div>
      </div>
      {filteredPetsByTitle.map((pet) => (
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

      
      
    </div>
  )
}

