import React, { useState } from 'react'
import './Login.css'
import EmailIcon from '@mui/icons-material/Email'
import GoogleIcon from '@mui/icons-material/Google'
import { Link, useHistory } from 'react-router-dom'
import { auth, db, googleProvider } from './Firebase'
import { useAuth } from './AuthContext'

function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState(null)
  const history = useHistory()
  const { login } = useAuth()

  const signin = async () => {
    try {
      await login(email, password)
      history.push('/dashboard')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const res = await auth.signInWithPopup(googleProvider)
      const user = res.user
      const query = await db
        .collection('users')
        .where('uid', '==', user.uid)
        .get()
      if (query.docs.length === 0) {
        await db.collection('users').add({
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        })
      }

      history.push('/dashboard')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  return (
    <div className='pag'>
      <div className='page'>
        <h5 className='he1'>New? Registered here!</h5>
        <Link to='/signup'>
          <h2 className='alcenter2'>Sign up</h2>
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

      <div className='login'>
        <h2 className='heh'>Sign In</h2>
        <div className='fiel'>
          <div className='div'>
            <input
              className='des1'
              type='email'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></input>
          </div>

          <div className='div'>
            <input
              className='des2'
              type='password'
              placeholder='Enter password'
              onChange={(e) => setpassword(e.target.value)}
            ></input>
          </div>
        </div>
        <h2 className='alcenter ' onClick={signin}>
          Login
        </h2>
        {/* <div className='google'>
          <GoogleIcon />
          <h3 className='btnsub1' onClick={signInWithGoogle}>
            Sign In with Google
          </h3>
        </div> */}
      </div>
    </div>
  )
}

export default Login
