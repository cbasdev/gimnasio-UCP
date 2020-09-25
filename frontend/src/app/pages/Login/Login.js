import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
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
    <div className='screenLogin'>
      PAGINA DE LOGIN...
      <div className='card'>
        <FaUser className='iconUser' />
        <form>
          <input
            type='text'
            placeholder='Email'
            className='form-control'
            onChange={handleInputChange}
            name='email'
          />
          <input
            type='password'
            placeholder='Password'
            className='form-control'
            onChange={handleInputChange}
            name='password'
          />
          <button className='btnLogin' onClick={onSubmit}>
            Iniciar Sesión
          </button>
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
