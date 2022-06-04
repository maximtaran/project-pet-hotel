import React from "react"
import './App.css'
// import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import SignIn from "./components/auth/Sign-in";
import SignUp from "./components/auth/Sign-up";
import Mainpage from "./components/pages/main-page/Mainpage";
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import ForgotPassword from "./components/auth/ForgotPass";
import { StorageProvider } from "./components/context/StorageContext";
import EditProfile from "./components/pages/Profile.js/EditProfile";
import UserPetBoard from "./components/pages/Pets/UserPetBoard";
import PetBoard from "./components/pages/PetBoard/PetBoard";
import PetAbout from "./components/pages/Pets/PetAbout";


function PrivateRoute () {
  const { currentUser } = useAuth()
  return currentUser ? <Mainpage/> : <Navigate to='/sign-in'/>
}



function App({handlePet}) {
  

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <StorageProvider>
            <Routes>
              
              <Route path="/" element={<PrivateRoute/>}>
                <Route index element={<Mainpage/>}/>
              </Route>
             
              
              <Route path="/user-pet-board" element={<UserPetBoard/>}/>

              <Route path="/pet-board" element={<PetBoard/>}/>
              <Route path="/pet-about" element={<PetAbout/>}/>
              
                
                {/* <Route path="teams" element={<Teams />}>
                  <Route path=":teamId" element={<Team />} />
                  <Route path="new" element={<NewTeamForm />} />
                  <Route index element={<LeagueStandings />} />
                </Route> */}
              

              <Route path="/sign-in" element={<SignIn/>} />
              <Route path="/sign-up" element={<SignUp/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
              <Route path="/edit-profile" element={<EditProfile/>} />

            </Routes>
          </StorageProvider>
          
        </AuthProvider>

      </BrowserRouter>
    </div>
  );
}

export default App;
