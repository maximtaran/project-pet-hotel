import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { getStorage, ref} from "firebase/storage"


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


const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const storage = getStorage();
const storageRef = ref(storage)
const auth = firebaseApp.auth()


export { auth, db, storage, storageRef }

