import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/auth/Login'
import AdminDashboard from './components/dashboard/AdminDashboard'
import POSScreen from './components/pos/POSScreen'
import KitchenDisplay from './components/kitchen/KitchenDisplay'
import InventoryScreen from './components/inventory/InventoryScreen'
import CustomerMenu from './components/customer/CustomerMenu'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/pos" element={<POSScreen />} />
        <Route path="/kitchen" element={<KitchenDisplay />} />
        <Route path="/inventory" element={<InventoryScreen />} />
        <Route path="/menu/:tableId" element={<CustomerMenu />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
