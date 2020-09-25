import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import './Register.scss'

export default function Register() {
  const [formData, setFormData] = useState(defaultFormData)

  const onSubmit = () => {
    console.log(formData)
  }
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className='screenRegister'>
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
            placeholder='Contraseña'
            className='form-control'
            onChange={handleInputChange}
            name='password'
          />
          <input
            type='password'
            placeholder='Repetir Contraseña'
            className='form-control'
            onChange={handleInputChange}
            name='password'
          />
          <button className='btnLogin' onClick={onSubmit}>
            Registrarse
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
