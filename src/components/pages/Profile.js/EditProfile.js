import React, { useEffect, useRef, useState } from 'react';

import NavBar from '../NavBar'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateEmail, updatePassword } from 'firebase/auth';
import { useStorage, upload } from '../../context/StorageContext';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { set, update } from 'firebase/database';
import { Alert, FormLabel, Stack } from '@mui/material';
import { updateProfile } from "firebase/auth"
import { Image, ImageOutlined } from '@mui/icons-material';
import { getDownloadURL, ref } from 'firebase/storage';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const theme = createTheme();

export default function EditProfile() {

    const nameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { users } = useStorage()

    const [photoURL, setPhotoURL] = useState()
    const [photo, setPhoto] = useState(null)

    const handleChange = (e) => {
      if (e.target.files[0]) {
        setPhoto(e.target.files[0])
      }
    }
  
    const handleClick = () => {
      upload(photo, currentUser, setLoading)
    }

    const userAvatar = users.map((data) => {
      if (data.id === currentUser.uid){
        return data.photoURL
      }
    })

    const userName = users.map((data) => {
      if (data.id === currentUser.uid){
        return data.name
      }
    })

    const userLastName = users.map((data) => {
      if (data.id === currentUser.uid){
        return data.lastName
      }
    })



    function handleSubmit(e) {

        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
    
        const promises = []
        setLoading(true)
        setError("")

    
        if (nameRef.current.value !== currentUser.name) {
          promises.push(update(nameRef.current.value))
        } 
        if (lastNameRef.current.value !== currentUser.lastName) {
          promises.push(update(lastNameRef.current.value))
        }
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        } 
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }
        
        Promise.all(promises)
          .then(() => {
            navigate("/")
          })
          .catch(() => {
            setError("Failed to update account")
          })
          .finally(() => {
            setLoading(false)
          })

    }

    
    

  return (
    <ThemeProvider theme={theme}>

        <NavBar/>

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >

          <div style={{display: 'flex', flexDirection: 'column'}}>
            
            <FormLabel style={{textAlign: 'center', cursor: 'pointer'}}>
              <TextField style={{margin: '10px', display: 'none'}} type='file'  onChange={ handleChange }/>

              <img src={ userAvatar } alt='avatar' style={{borderRadius: '50%', maxWidth: '100px', height: '100px', margin: '10px', backgroundSize: 'cover'}}/>
            </FormLabel>
            
            <Button disabled={loading || !photo} onClick={ handleClick } >Avatar Add</Button>
            
          </div>

          <Typography component="h1" variant="h5">
            Edit
          </Typography>

          {error &&
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={userName}
                  autoFocus
                  inputRef={nameRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={userLastName}
                  name="lastName"
                  autoComplete="family-name"
                  inputRef={lastNameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={currentUser.email}
                  name="email"
                  autoComplete="email"
                  // value={currentUser.email}
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordRef}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password-Confirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="repeat-password"
                  inputRef={passwordConfirmRef}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Edit
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
