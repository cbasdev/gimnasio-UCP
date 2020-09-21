import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Plans from '../pages/Plans/Plans'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

export default function HeaderNavigation() {
  return (
    <Switch>
      <Route path='/plans'>
        <Plans />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}
