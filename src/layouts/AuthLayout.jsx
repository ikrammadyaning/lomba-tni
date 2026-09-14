import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="auth-layout" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-main)' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2rem', 
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
