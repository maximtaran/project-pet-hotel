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
import { useStorage, uploadPetPhoto } from '../../context/StorageContext'
import { Button, Card, CardActions, CardContent, CardMedia, FormLabel, TextField, Typography } from "@mui/material"
import ProfilePannel from "../Profile.js/Profile-pannel"




export default function PetEditInner( ) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [editBtnVisible, setEditBtnVisible] = useState(false)
  const { pets, users } = useStorage([])
  const [petPhoto, setPetPhoto] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPetPhoto(e.target.files[0])
      setLoading(true)
    }
  }

  const pet = pets.find((pet) => (pet.id === id))

  const handleClick = (id) => {
    uploadPetPhoto(petPhoto, pet, setLoading)
  }


  const handleEdit = async ( id, title, about ) => {
    await updateDoc(doc(db, 'pets', id), {title, about})
  }

  useEffect(() => {
    users.map((data) => {
     if (data.id === currentUser.uid){
       return setPhotoURL(data.photoURL)
     }
   })
 }, [users])

  useEffect(() => {
    if (pet?.photoURL){
      setPhotoURL(pet.photoURL)
    }else{
      setPhotoURL('https://www.maisonette.gr/wp-content/uploads/2018/01/pet-icon.png')
    }
  }, [])


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
      <div>
        {pets.map((data) => {
          if (id === data.id){
            return (
              <div
                className="pet-about-wrapper"
                key={data.id}
              >
                <div>
                    <FormLabel style={{textAlign: 'center', cursor: 'pointer'}}>
                      <TextField className='input-img' style={{ display: 'none', margin: '0 auto'}} type='file' onChange={ handleChange } />
                      <div className="pet-about-img-wrapper">
                        <img src={data.photoURL} alt='petphoto' className="pet-about-img"/>
                      </div>
                      

                    </FormLabel>

                    <Button
                      variant="contained"
                      disabled={!loading}
                      onClick={() => handleClick(id)}
                      style={{
                        width: '90%',
                        maxWidth: '300px',
                        margin: '0 auto 5px'
                      }}
                    >
                      Add photo
                    </Button>
                </div>

                <div
                  className="pet-about-text"
                >
                  <h1>{data.title}</h1>
                  <p>{data.about}</p>

                  <TextField
                    margin="normal"
                    id="outlined-basic"
                    label='New Title'
                    variant="outlined"
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <TextField
                    style={{width: '80%', height: 'auto'}}
                    margin="normal"
                    id="outlined-basic"
                    label='New About Info'
                    variant="outlined"
                    multiline
                    maxRows={10}
                    minRows={4}
                    type='text'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />

                  <Button
                  // disabled={!editBtnVisible}
                  variant="contained"
                  onClick={() => handleEdit(id, title, about)}
                  >
                    Edit pet
                  </Button>
                </div>
                
              </div>

              
            )
          }
        })}
      </div>
    </div>
  )
}

