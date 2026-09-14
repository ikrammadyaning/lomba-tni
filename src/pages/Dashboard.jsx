import React from 'react'
import Card from '../components/ui/Card'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Selamat datang di Slide Ranking.</p>
      <Card>
        <p>Konten dashboard utama akan muncul di sini.</p>
      </Card>
    </div>
  )
}

export default Dashboard
