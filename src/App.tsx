
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import GetStartedPage from './components/GetStartedPage'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element=<LandingPage /> />
          <Route path="/getStarted" element=<GetStartedPage /> />
        </Routes>
      </Router>

    </>
  )
}

export default App
