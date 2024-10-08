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
import ProfileView from '@/routes/ProfileView'
// ADMIN
import Admin from '@/routes/admin/Index'
// Other
import Footer from '@/routes/Footer'
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { LoadingOverlay } from '@mantine/core';
import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
const theme = createTheme({
  spacing: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Notifications } from '@mantine/notifications';
// react libraries: https://www.robinwieruch.de/react-libraries/

import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
console.log('baseUrl',  import.meta.env.BASE_URL);

const queryClient = new QueryClient()

//https://blog.logrocket.com/handling-user-authentication-redux-toolkit/
function App() {
  const loading = false
  return (
    <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Notifications position="top-right"/>
          <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2, fixed: true }}/>
         
          <BrowserRouter>
            <AuthProvider>
              {/* {window.localStorage.user && <Nav></Nav>} */}
              <Routes>
                <Route path="/" element={<PublicRoute><Nav /><AppShell><Home /></AppShell><Footer /></PublicRoute>} />
                <Route path="/about" element={<PublicRoute><Nav /><AppShell><About /></AppShell><Footer /></PublicRoute>} />
                <Route path="/contact" element={<PublicRoute><Nav /><AppShell><Contact /></AppShell><Footer /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Nav /><AppShell><SignUp /></AppShell><Footer /></PublicRoute>} />
                <Route path="/login" element={<PublicRoute><Nav /><AppShell><Login /></AppShell><Footer /></PublicRoute>} />
                {/* ADMIN */}
                <Route
                  path="/admin"
                  element={<PublicRoute><Nav /><Admin /></PublicRoute>}
                />
                 {/* PRIVATE */}
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
                  path="/profile/:userId"
                  element={<ProtectedRoute><Nav /><AppShell><ProfileView /></AppShell></ProtectedRoute>}
                />
                <Route
                  path="/settings"
                  element={<ProtectedRoute><Nav /><Settings /></ProtectedRoute>}
                />
                <Route
                  path="/createexchange"
                  element={<ProtectedRoute><Nav /><CreateExchange /></ProtectedRoute>}
                />
              
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
