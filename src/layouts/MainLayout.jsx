import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header style={{ padding: '1rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <nav>
          <strong>Slide Ranking</strong>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
