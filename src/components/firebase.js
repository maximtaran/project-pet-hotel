import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"




const firebaseConfig = {
  apiKey: "AIzaSyBdi0_P4QvY1Kk5qDmZDjLsy0XfCgWvlfk",
  authDomain: "finall-project-6771a.firebaseapp.com",
  databaseURL: "https://finall-project-6771a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finall-project-6771a",
  storageBucket: "finall-project-6771a.appspot.com",
  messagingSenderId: "561672983380",
  appId: "1:561672983380:web:c62a4b29d26fa5a789aec1",
  measurementId: "G-CZV26BC527"
}



export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, 'avatars/' + currentUser.uid)
  setLoading(true)

  const snapshot = await uploadBytes(fileRef, file)
  
  const photoURL =await getDownloadURL(fileRef)
  
  updateProfile(currentUser, { photoURL: photoURL })

  setLoading(false)
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const storage = getStorage();
const storageRef = ref(storage)
const auth = firebaseApp.auth()


export { auth, db, storage, storageRef }

