import React from 'react'

const Card = ({ children, style, ...props }) => {
  return (
    <div 
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        padding: '1.5rem',
        border: '1px solid var(--border)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
