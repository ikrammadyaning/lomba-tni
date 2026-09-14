import React from 'react'

const Button = ({ children, onClick, type = 'button', style, variant = 'primary', ...props }) => {
  const baseStyle = {
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius)',
    fontWeight: '500',
    transition: 'opacity 0.2s',
    backgroundColor: variant === 'primary' ? 'var(--primary)' : 'var(--secondary)',
    color: 'white',
    ...style
  }

  return (
    <button type={type} onClick={onClick} style={baseStyle} {...props}>
      {children}
    </button>
  )
}

export default Button
