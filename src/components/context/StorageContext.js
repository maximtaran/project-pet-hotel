import React, { useContext, useEffect, useState} from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
  } from 'firebase/firestore'
  import { db, storage } from '../firebase'

const StorageContext = React.createContext()

export function useStorage() {
    return useContext(StorageContext)
}


export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, 'avatars/' + currentUser.uid)
  setLoading(true)

  const snapshot = await uploadBytes(fileRef, file)
  
  const photoURL =await getDownloadURL(fileRef)

  updateDoc(doc(db, 'users', currentUser.uid), {photoURL: photoURL})

  updateProfile(currentUser, { photoURL })

  setLoading(false)
}



export async function uploadPetPhoto(file, pet, setLoading){
  const fileRef = ref(storage, 'petPhotos/' + pet.id)
  setLoading(true)

  const snapshot = await uploadBytes(fileRef, file)
  
  const petPhotoURL =await getDownloadURL(fileRef)
  
  updateDoc(doc(db, 'pets', pet.id), {photoURL: petPhotoURL})

  setLoading(false)
}



export function StorageProvider({children}) {
    const [pets, setPets] = useState([])
    const [users, setUsers] = useState([])
  
  useEffect(() => {
    const q = query(collection(db, 'pets'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let petsArray = []
      querySnapshot.forEach((doc) => {
        petsArray.push({ ...doc.data(), id: doc.id })
      })
      setPets(petsArray)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'users'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      let usersArray = []
      querySnapshot.forEach((doc) => {
        usersArray.push({ ...doc.data(), id: doc.id })
      })
      setUsers(usersArray)
    })
    return () => unsub()
  }, [])


  const value = {
    pets,
    users
  }
  
  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  )
}

 