import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Halaman tidak ditemukan.</p>
      <Link to="/">
        <Button>Kembali ke Beranda</Button>
      </Link>
    </div>
  )
}

export default NotFound
