import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormLabel, Input, TextField } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useHistory } from 'react-router-dom'
import { updateCurrentUser } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';
import { uploadPetPhoto, useStorage } from '../../context/StorageContext';

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
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()
  // const history = useHistory();

  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const { pets } = useStorage()

  const [petPhotoUrl, setPetPhotoUrl] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title !== '') {
        await addDoc(collection(db, 'pets'), {
            title,
            about,
            email: currentUser.email,
            id: currentUser.uid,
        })
        setTitle('')
    }
    handleClose()
  }


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
                    style={{width: '100%'}}
                    margin="normal"
                    id="outlined-basic"
                    label="About your Pet"
                    variant="outlined"
                    type='text'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />


                {/* <img src={ petPhotoUrl } alt='avatar' style={{borderRadius: '50%', maxWidth: '100px', height: '100px', margin: '10px', backgroundSize: 'cover'}}/> */}

                {/* <FormLabel style={{display: 'block'}}>
                  
                  <TextField style={{margin: '10px', display: 'none'}} type='file' onChange={ handleChange } />
                  Add pic
                </FormLabel>

                <Button
                    onClick={() => handleClick}
                  >
                    Add photo
                </Button> */}

                

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
