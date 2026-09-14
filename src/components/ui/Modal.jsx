import React from 'react'

const Modal = ({ isOpen, onClose, children, title, style, ...props }) => {
  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      {...props}
    >
      <div 
        style={{
          backgroundColor: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: 'var(--radius)',
          minWidth: '300px',
          maxWidth: '500px',
          position: 'relative',
          ...style
        }}
      >
        <h3 style={{ marginBottom: '1.5rem' }}>{title}</h3>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
