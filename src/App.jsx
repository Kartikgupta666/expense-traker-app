import Navbar from './components/Navbar'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Graph from './components/Graph'
import { Route, Routes } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Toast from './components/Toast'
function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const userID = localStorage.getItem('userId')
    if (!userID) {
      navigate('/')
    }
    else {
      navigate('/dashboard')
    }
  }, [])
  return (
    <>
      <Navbar />
      <Toast/>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/graph" element={<Graph />} />
      </Routes>

    </>
  )
}

export default App
