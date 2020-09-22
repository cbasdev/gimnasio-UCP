import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'
import img1 from '../../../assets/4.jpg'

export default function Home() {
  return (
    <div className='screen'>
      <div className='left-div'>
        <h2>Horarios</h2>
        <div className='text-days'>
          <div className='dark-red'>Lunes a Viernes</div>
          <div>06:00 am a 09:00 pm</div>
          <div className='dark-red'>Sábado</div>
          <div>08:00 am a 12:00 pm</div>
        </div>
        <Link to='/plans'>
          <button className='btnPlans'>Ver Planes</button>
        </Link>
      </div>
      <div className='right-div'>
        <img src={img1} alt='deportista' />
      </div>
    </div>
  )
}
