import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Test from './test'
import Login from './login'
import Register from './Register'
import AdminRoute from './AdminRoot'
import AdminDashboard from './AdminDashboard'
import AdminUsers from './AdminUsers'


function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        {/* Page d'accueil */}
        <Route
          path="/"
          // element={token ? <Navigate to="/test" /> : <Navigate to="/register" />}
          element={token ? <Navigate to="/test" /> : <Navigate to="/register" />}
        />

        {/* Routes accessibles seulement si non connecté */}
        {!token && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Route accessible seulement si connecté */}
        {/* {token && <Route path="/test" element={<Test />} />} */}
        {token && <Route path="/test" element={<Test />} />}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* Redirection pour toute autre route */}
        <Route
          path="*"
          element={token ? <Navigate to="/test" /> : <Navigate to="/register" />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
