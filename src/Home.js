import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className='home'>
        <h2 className='heading'>Covid-19</h2>

        <div className='nav_list'>
          <a href='https://covid-19-tracker-de32e.web.app/'>
            {' '}
            <h4 className='ta'>Tracker</h4>
          </a>
          <Link to='/Hospitals'>
            {' '}
            <h4 className='ta'>Hospitals</h4>
          </Link>
          <Link to='/login'>
            <h4 className='ta'>Hospital Login</h4>
          </Link>
        </div>
      </div>

      <Link to='/'>
        <img
          className='photodisp'
          src={require('./photo/home.svg').default}
          alt=''
        />
      </Link>
      <div className='disp'>
        <h3 className='hea1'>Stay Home,Stay Safe</h3>
        <h1 className='hea2'>
          Protect Yourself
          <br /> From Covid-19
        </h1>
      </div>
    </div>
  )
}

export default Home
