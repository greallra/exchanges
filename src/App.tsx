import { useState } from 'react'
import Nav from './components/Nav'
import './App.css'
// Public
import Home from './routes/Home'
import Login from './routes/Login'
import SignUp from './routes/SignUp'
import Users from './routes/Users'
import Profile from './routes/Profile'
import CreateExchange from './routes/CreateExchange'
// Private / Protected
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { AuthProvider } from "./hooks/useAuth";
import Exchanges from './routes/Exchanges'
import ExchangeView from './routes/ExchangeView'
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
// react libraries: https://www.robinwieruch.de/react-libraries/
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";

//https://blog.logrocket.com/handling-user-authentication-redux-toolkit/
function App() {
  return (
    <MantineProvider>
         {/* <FirebaseProvider> */}
          <Notifications position="top-right"/>
          <BrowserRouter>
            <AuthProvider>
              {window.localStorage.user && <Nav></Nav>}
              <Routes>
                <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/users" element={<PublicRoute><Users /></PublicRoute>} />
                <Route
                  path="/exchanges"
                  element={<ProtectedRoute><Exchanges /></ProtectedRoute>}
                />
                <Route
                  path="/exchanges/:exchangeId"
                  element={<ProtectedRoute><ExchangeView /></ProtectedRoute>}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute><Profile /></ProtectedRoute>}
                />
                <Route
                  path="/createexchange"
                  element={<ProtectedRoute><CreateExchange /></ProtectedRoute>}
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        {/* </FirebaseProvider> */}
    </MantineProvider>
  )
}

export default App
