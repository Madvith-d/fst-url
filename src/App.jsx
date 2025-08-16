import { useEffect, useState } from 'react'

import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import supabase from './Supabase/supabaseClient.js'

import Landing from './pages/landing.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Home from './pages/home.jsx'
import Redirect from './pages/redirect.jsx'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" replace />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" replace />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/s/:shortCode" element={<Redirect />} />
      </Routes>
    
    </>
  )
}

export default App
