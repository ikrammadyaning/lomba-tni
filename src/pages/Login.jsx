import React from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const Login = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Masuk</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '1rem' }}>
          <Input label="Email" type="email" placeholder="nama@email.com" />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <Input label="Kata Sandi" type="password" placeholder="••••••••" />
        </div>
        <Button style={{ width: '100%' }}>Masuk</Button>
      </form>
    </div>
  )
}

export default Login
