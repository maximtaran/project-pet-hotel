import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useStorage } from '../context/StorageContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const { users } = useStorage()
  const [photoURL, setPhotoURL] = useState()


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    try {
      await logout()
      navigate("/sign-in")
    } catch {
      
    }
  }

  useEffect(() => {
    users.map((data) => {
     if (data.id === currentUser.uid){
       return setPhotoURL(data.photoURL)
     }
   })
 }, [users])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Link style={{color: '#fff'}} to='/'>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <i class="fa-solid fa-house"></i>
          </IconButton>
        </Link>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{color: '#3d5afe', background: '#ffee33', padding: '5px', borderRadius: '10px'}}>
              #standUpWithUkraine
            </span>
          </Typography>
          
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Remy Sharp"
                src={photoURL}
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to='/user-pet-board'>User Pet-board</Link>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link to='/edit-profile'>Profile-edit</Link>
              </MenuItem>

              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
