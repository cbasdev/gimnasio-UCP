import React, { useState } from 'react'
import './Login.scss'

export default function Login() {
  const [formData, setFormData] = useState(defaultFormData)

  const onSubmit = () => {
    console.log(formData)
  }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className='screen' onClick={onSubmit}>
      PAGINA DE LOGIN...
      <div className='card'>
        <div>Ingresa al portal administrativo :v</div>
        <form>
          <div className='title-input'>Email</div>
          <input
            type='text'
            placeholder='Email'
            className='form-control'
            onChange={handleInputChange}
            name='email'
          />
          <div className='title-input'>Contraseña</div>
          <input
            type='text'
            placeholder='Password'
            className='form-control'
            onChange={handleInputChange}
            name='password'
          />
          <button>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  )
}

const defaultFormData = () => {
  return {
    email: '',
    password: '',
  }
}
