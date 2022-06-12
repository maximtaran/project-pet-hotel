import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useStorage } from '../../context/StorageContext'

const ProfilePannel = () => {
    const { currentUser } = useAuth()
    const { users } = useStorage([])
    const [photoURL, setPhotoURL] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
      users.map((data) => {
        if (data.id === currentUser.uid){
          return setUserData(
          <div className="profile-pannel-inner" key={data.id}>
            <h1>{data.name} {data.lastName}</h1>
            <h3>Email: {currentUser.email}</h3>
            <h3>Phone Number: {data.phone}</h3>
            <h3>Country: {data.country}</h3>
          </div>
          
          )
        }
    })
    }, [users])
    

      useEffect(() => {
        users.map((data) => {
         if (data.id === currentUser.uid){
           return setPhotoURL(data.photoURL)
         }
       })
     }, [users])

  return (
    <div
        className="profile-pannel"
      >
        <div
          style={{minHeight: '150px'}}
        >
          {userData}

          <Link
          style={{marginRight: '20px'}}
            className="btn-link"
            to='/pet-board'
          >
            Pet-board
          </Link>

          <Link
            className="btn-link"
            to='/user-pet-board'
          >
            User Pet-board
          </Link>
        </div>

        <img
          src={photoURL}
          alt='avatar'
          style={{
            borderRadius: '50%',
            maxWidth: '100px',
            height: '100px',
            margin: '10px',
            backgroundSize: 'cover'
          }}
        />
      </div>
  )
}

export default ProfilePannel