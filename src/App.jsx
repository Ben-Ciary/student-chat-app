import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from './context/AuthContext'
import { logoutUser } from './services/authService'

import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import './App.css'

function AppContent() {
  const { currentUser, loading } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await logoutUser()
      navigate('/')
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Navigate to="/chat" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={currentUser ? <Navigate to="/chat" replace /> : <Register />}
      />

      <Route
        path="/chat"
        element={
          currentUser ? (
            <Chat currentUser={currentUser} onSignOut={handleSignOut} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
