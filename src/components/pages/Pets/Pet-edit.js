import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { uploadPetPhoto, useStorage } from '../../context/StorageContext'
import { Link } from 'react-router-dom'

import { Box, Button, FormLabel, Input, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


const PetEdit = ({ pet, handleDelete, handleEdit}) => {

  const [newTitle, setNewTitle] = useState(pet.title)
  const { currentUser } = useAuth()
  const { pets } = useStorage()
  const [loading, setLoading] = useState(false)
  const [petPhotoUrl, setPetPhotoUrl] = useState('')
  const [petPhoto, setPetPhoto] = useState('')

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPetPhoto(e.target.files[0])
      setLoading(true)
    }
  }

  const handleClick = () => {
    uploadPetPhoto(petPhoto, pet, setLoading)
  }
  
  useEffect(() => {
    if (pet?.photoURL){
      setPetPhotoUrl(pet.photoURL)
    }else{
      setPetPhotoUrl('https://www.maisonette.gr/wp-content/uploads/2018/01/pet-icon.png')
    }
  }, [pet.photoURL])


  return (
    <Box
      key={pet.id}
      component='form'
      style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '20px'}}
    >

      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          height: 'auto',
          background: '#f9fafb70',
          borderRadius: '20px'
        }}
      >
        
        <div
          style={{width: '35%'}}
        >
          <FormLabel
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              margin: '10px'
            }}
          > 
            {(currentUser.email === pet.email) ?
            (
              <TextField className='input-img' style={{ display: 'none', margin: '0 auto'}} type='file' onChange={ handleChange } />
            )
            :
            ('')
            }
            
            <CardMedia
              className='pet-img'
              component="img"
              src={`${petPhotoUrl}`}
              style={{
                  margin: '5px auto',
                  borderRadius: '5%',
                  width: '100%',
                  maxWidth: '300px',
                  height: '200px',
              }}
            />
            
            {(currentUser.email === pet.email) ?
            (
              <Button
              variant="contained"
              disabled={!loading}
              onClick={() => handleClick(pet)}
              style={{
                width: '90%',
                maxWidth: '300px',
                margin: '0 auto 5px'
              }}
              >
                Add photo
              </Button>
            )
            :
            ('')
            }

          </FormLabel>

        </div>

        <div
          style={{width: '65%', height: '220px'}}
        >
          <CardContent
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              margin: '0 10px',
              padding: '0',
              textAlign: 'left',
              textDecoration: 'none'
            }}
          >
            
            <Typography variant="h5" color="text">
              <Link style={{textDecoration: 'none', color: '#000'}} to=''>
                <h1 className='pet-title'>{pet.title === '' ? newTitle : pet.title}</h1>
              </Link>
            </Typography>
            
            <Link
              className="btn-link"
              to={`/pet-edit/${pet.id}`}
              
            >
              Edit 
            </Link>
            
            <div>
              {currentUser.email === pet.email ? 
                (<CardActions>
                    <Button
                    onClick={() => handleDelete(pet)}
                    >
                    <i
                      style={{
                      padding: '8px',
                      border: '1px solid black',
                      borderRadius: '10px',
                      background: '#b2102f',
                      color: '#fff'
                      }}
                      class="fa-solid fa-trash"
                    >
                      <span style={{marginLeft: '10px'}}>
                        Delete pet
                      </span>
                    </i>
                    </Button>
                  </CardActions>
                ) 
                :
                ('')
              }
            </div>
          </CardContent>
        </div>
      </Card>
    </Box>
  )
}

export default PetEdit