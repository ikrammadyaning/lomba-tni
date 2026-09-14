import React from 'react'

const Loading = ({ size = '2rem', color = 'var(--primary)', style, ...props }) => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        ...style
      }}
      {...props}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid ${color}`,
          borderBottomColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          boxSizing: 'border-box',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  )
}

export default Loading
