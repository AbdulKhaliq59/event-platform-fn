import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import SigninPage from './Pages/SigninPage.tsx'
import SignupPage from './Pages/SignupPage.tsx'
import Events from './Pages/Events.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import { isAuthenticated } from './utils/ProtectedRoute.tsx'
import EventsTable from './Pages/dashboard/Events.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/events' element={<Events />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <Dashboard />
            ) : (
              <Navigate to="/signin" />
            )
          }
        >
          <Route path="events" element={<EventsTable />} />

        </Route>

      </Routes>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
)
