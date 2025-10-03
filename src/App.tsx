
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import GetStartedPage from './components/GetStartedPage'
import SellerDashboard from './components/seller/Dashboard'
import ProductLists from './components/seller/ProductLists'


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element=<LandingPage /> />
          <Route path="/getStarted" element=<GetStartedPage /> />
          <Route path="/sellerDashboard" element=<SellerDashboard /> />
          <Route path="/products" element=<ProductLists /> />
        </Routes>
      </Router>

    </>
  )
}

export default App
