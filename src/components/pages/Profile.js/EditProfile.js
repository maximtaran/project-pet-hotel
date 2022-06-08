import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../NavBar'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useStorage, upload } from '../../context/StorageContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, FormLabel, Stack } from '@mui/material';



const theme = createTheme();

export default function EditProfile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { users } = useStorage()
  const [photoURL, setPhotoURL] = useState()
  const [photo, setPhoto] = useState(null)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
      setLoading(true)
    }
  }

  const handleClick = () => {
    upload(photo, currentUser, setLoading)
  }

  const handleEdit = async (id, name, lastName) => {
    await updateDoc(doc(db, 'users', id),
    {name: name, lastName: lastName})
  }


  useEffect(() => {
      users.map((data) => {
      if (data.id === currentUser.uid){
        return (setPhotoURL(data.photoURL))
      }
    })
  }, [users])

  


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

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
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
            <Typography component="h1" variant="h3">
              {userName}{'  '+userLastName}
            </Typography>

            <FormLabel style={{textAlign: 'center', cursor: 'pointer'}}>
              <TextField style={{margin: '10px', display: 'none'}} type='file'  onChange={ handleChange }/>

              <img
              src={photoURL}
              alt='avatar'
              style={{
                borderRadius: '50%',
                maxWidth: '100px',
                height: '100px',
                margin: '10px',
                backgroundSize: 'cover'
              }}/>
            </FormLabel>
            
            <Button disabled={!loading} onClick={ handleClick } >Avatar Add</Button>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label='Email'
                  defaultValue={currentUser.email}
                  name="email"
                  autoComplete="email"
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
