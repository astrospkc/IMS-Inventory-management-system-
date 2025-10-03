
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import GetStartedPage from './components/GetStartedPage'
import SellerDashboard from './components/seller/Dashboard'
import ProductLists from './components/seller/ProductLists'
import useUserStore from "./store/useUserStore.js"


function App() {
  const { isAuthenticate } = useUserStore();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/getStarted" element={<GetStartedPage />} />

        {isAuthenticate && (
          <>
            <Route path="/sellerDashboard" element={<SellerDashboard />} />
            <Route path="/sellerDashboard/products" element={<ProductLists />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
export default App
