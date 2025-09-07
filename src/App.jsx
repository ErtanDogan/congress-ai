import { useState, useEffect, React} from 'react'
import './App.css'
import Law from './pages/Law.jsx'
import Home from './pages/Home.jsx'
import LawPage from "./pages/LawPage.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'



function App() {
  const [laws, setLaws] = useState([])

  useEffect(() => {
    fetch('https://bluestarstudios.pythonanywhere.com/')
      .then(res => res.json())
      .then(data => setLaws(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home laws={laws}/>} />
          <Route path="/LawPage" element={<LawPage laws={laws}/>} />
          
        </Routes>

      </Router>
    </>
  )
}

export default App
