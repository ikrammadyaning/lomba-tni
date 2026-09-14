import React from 'react'

const Input = ({ label, type = 'text', placeholder, value, onChange, style, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          outline: 'none',
          ...style
        }}
        {...props}
      />
    </div>
  )
}

export default Input
