import React from 'react'
import './Header.scss'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import HeaderNavigation from '../../navigations/HeaderNavigation'

export default function (props) {
  console.log(props)
  return (
    <Router>
      <nav>
        <ul>
          <Link to='/'> Home</Link>
          <Link to='/plans'>Planes</Link>
          <Link to='/login'>Iniciar Sesión</Link>
          <Link to='/register'>Registrate</Link>
        </ul>
      </nav>

      <HeaderNavigation />
    </Router>
  )
}
