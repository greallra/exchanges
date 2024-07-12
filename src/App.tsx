import { useState } from 'react'
import Nav from '@/components/Nav'
import '@/App.css'
// Shell
import AppShell from "@/routes/AppShell";
// Public
import Home from '@/routes/public/Home'
import Login from '@/routes/public/Login'
import SignUp from '@/routes/public/SignUp'
import About from '@/routes/public/About'
import Contact from '@/routes/public/Contact'
// Private / Protected
import Profile from '@/routes/Profile'
import CreateExchange from '@/routes/CreateExchange'
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { AuthProvider } from "@/hooks/useAuth";
import Exchanges from '@/routes/Exchanges'
import ExchangeView from '@/routes/ExchangeView'
import ExchangeEdit from '@/routes/ExchangeEdit'
import Settings from '@/routes/Settings'
// ADMIN
import Admin from '@/routes/admin/Index'
// Other
import Footer from '@/routes/Footer'
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
// react libraries: https://www.robinwieruch.de/react-libraries/

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
              {/* {window.localStorage.user && <Nav></Nav>} */}
              <Routes>
                <Route path="/" element={<PublicRoute><Nav /><AppShell><Home /></AppShell><Footer /></PublicRoute>} />
                <Route path="/about" element={<PublicRoute><Nav /><AppShell><About /></AppShell><Footer /></PublicRoute>} />
                <Route path="/contact" element={<PublicRoute><Nav /><AppShell><Contact /></AppShell><Footer /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Nav /><AppShell><SignUp /></AppShell><Footer /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Nav /><AppShell><Login /></AppShell><Footer /></PublicRoute>} />
                <Route
                  path="/exchanges"
                  element={<ProtectedRoute><Nav /><Exchanges /></ProtectedRoute>}
                />
                <Route
                  path="/exchanges/:exchangeId"
                  element={<ProtectedRoute><Nav /><ExchangeView /></ProtectedRoute>}
                />
                <Route
                  path="/exchanges/edit/:exchangeId"
                  element={<ProtectedRoute><Nav /><ExchangeEdit /></ProtectedRoute>}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute><Nav /><AppShell><Profile /></AppShell></ProtectedRoute>}
                />
                <Route
                  path="/settings"
                  element={<ProtectedRoute><Nav /><Settings /></ProtectedRoute>}
                />
                <Route
                  path="/createexchange"
                  element={<ProtectedRoute><Nav /><CreateExchange /></ProtectedRoute>}
                />
                {/* ADMIN */}
                <Route
                  path="/admin"
                  element={<PublicRoute><Nav /><Admin /></PublicRoute>}
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        {/* </FirebaseProvider> */}
    </MantineProvider>
  )
}

export default App
