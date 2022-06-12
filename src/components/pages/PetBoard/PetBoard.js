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
import { Accordion, AccordionDetails, AccordionSummary, Button, FormGroup, FormLabel, TextField, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfilePannel from "../Profile.js/Profile-pannel"

export default function PetBoard( ) {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [photoURL, setPhotoURL] = useState()
  const [searchValue, setSearchValue] = useState('')
  const [searchBy, setSearchBy] = useState(false)
  const { pets, users } = useStorage([])


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
      <div style={{width: '90%', margin: '0 auto'}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography><i class="fa-solid fa-magnifying-glass"></i></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>

              <div className='search-wrapper'>
                <FormGroup>
                  <h2>Search by country</h2>
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

            </Typography>
          </AccordionDetails>
        </Accordion>

        <div style={{height: '20px'}}></div>
        
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
      <div style={{width: '90%', margin: '0 auto'}}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography><i class="fa-solid fa-magnifying-glass"></i></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              
              <div className="search-wrapper">
                <FormGroup>
                  <h2>Search by title</h2>
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

            </Typography>
          </AccordionDetails>
        </Accordion>

        <div style={{height: '20px'}}></div>

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

