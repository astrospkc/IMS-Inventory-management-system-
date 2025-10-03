
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import GetStartedPage from './components/GetStartedPage'
import SellerDashboard from './components/seller/Dashboard'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element=<LandingPage /> />
          <Route path="/getStarted" element=<GetStartedPage /> />
          <Route path="/sellerDashboard" element=<SellerDashboard /> />
        </Routes>
      </Router>

    </>
  )
}

export default App
