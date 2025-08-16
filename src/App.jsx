import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Routes , Route ,Navigate, Router} from 'react-router'
import { supabase } from './Supabase/supabaseClient'
import { useEffect } from 'react'
import { useState } from 'react'
import landing from './pages/landing'
import login from './pages/login'
import signup from './pages/signup'
import home from './pages/home'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    const { data: { listener } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
      </Routes>
    </Router>
     
    </>
  )
}

export default App
