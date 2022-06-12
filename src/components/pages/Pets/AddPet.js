import React from 'react';
import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useStorage } from '../../context/StorageContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentUser } = useAuth()
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const { users } = useStorage()
  const [country, setCountry] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title !== '') {
        await addDoc(collection(db, 'pets'), {
            title,
            about,
            email: currentUser.email,
            userId: currentUser.uid,
            country: country,
            photoURL: 'https://www.maisonette.gr/wp-content/uploads/2018/01/pet-icon.png',
        })
        setTitle('')
    }
    handleClose()
  }

  useEffect(() => {
    users.map((data) => {
     if (data.id === currentUser.uid){
       return setCountry(data.country)
     }
   })
 }, [users])

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{
          background: '#2196f3',
          border: '1px solid blue',
          width: '300px',
          color: '#fff'
        }}
      >
        <h1>Add+</h1>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          onSubmit={handleSubmit}
        >
          <div style={{}}>
            <TextField
              style={{width: '100%'}}
              margin="normal"
              id="outlined-basic"
              label="Add new pet..."
              variant="outlined"
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              style={{width: '100%', marginBottom: '20px'}}
              margin="normal"
              id="outlined-basic"
              label="About your Pet"
              variant="outlined"
              type='text'
              multiline
              maxRows={10}
              minRows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <Button
              type='submit'
              variant="contained"
              >
                  Add+
            </Button>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
