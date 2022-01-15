import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import GoogleIcon from '@mui/icons-material/Google'
import './Signup.css'
import { auth, registerWithEmailAndPassword, db } from './Firebase'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from './AuthContext'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [hospital, setHospital] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, conpassword] = useState('')
  const { signup, currentuser } = useAuth()

  const registeruser = async (e) => {
    e.preventDefault()

    if (password !== confirm) return
    try {
      const res = await signup(email, password)
      const user = res.user
      db.collection('users').add({
        uid: user.uid,
        hospitalname: hospital.toLowerCase(),
        email: email,
      })

      db.collection('hospitals').doc(user.uid).set({
        uid: user.uid,
        city: '',
        hospitalname: hospital,
        address: '',
        latitude: '',
        longitude: '',
        twithoxy: '',
        twithoutoxy: '',
        ticuventi: '',
        ticunonventi: '',
        oxy: '',
        withoutoxy: '',
        icuventi: '',
        icunonventi: '',
        type: '',
        phoneno: '',
        opositive: '',
        onegative: '',
        apositive: '',
        anegative: '',
        abpositive: '',
        abnegative: '',
        rat: '',
        time: '',
        time1: '',
      })

      history.push('/dashboard')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <div className='pag'>
      <div className='page'>
        <h5 className='he1'>Already Registered ??</h5>
        <Link to='/login'>
          <h2 className='alcenter2'>Sign In</h2>
        </Link>
      </div>

      <div className='img1'>
        <Link to='/'>
          <img
            className='photodisp1'
            src={require('./photo/home.svg').default}
            alt=''
          />
        </Link>
      </div>

      <div className='signup'>
        <h2 className='heh'>Sign Up</h2>
        <div className='fiel'>
          <div className='div'>
            <input
              className='des1'
              type='text'
              placeholder='Enter Name of Hospital'
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            ></input>
          </div>

          <div className='div'>
            <input
              className='des1'
              type='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className='div'>
            <input
              className='des2'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className='div'>
            <input
              className='des2'
              type='password'
              placeholder='Confirm password'
              value={confirm}
              onChange={(e) => conpassword(e.target.value)}
            ></input>
          </div>
        </div>

        <h2 className='alcenter' onClick={registeruser}>
          Sign Up
        </h2>
      </div>
    </div>
  )
}

export default Login
