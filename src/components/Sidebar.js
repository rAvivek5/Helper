import React, { useEffect, useState } from 'react'
import '../components/Sidebar.css'
import { useHistory } from 'react-router'
import { Sidebardata } from './Sidebardata.js'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { db, auth } from '../Firebase'
import LocalHospital from '@mui/icons-material/LocalHospital'
function Sidebar() {
  const history = useHistory()
  const [userid, setuserid] = useState()
  const { currentuser } = useAuth()
  const [hospital, sethospital] = useState()

  const getdata = async () => {
    setuserid(currentuser.uid)
    await db
      .collection('users')
      .where('uid', '==', currentuser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          sethospital(element.data().hospitalname)
        })
      })
  }

  useEffect(() => {
    getdata()
  }, [])

  const logout = async () => {
    await auth.signOut()
    history.push('/')
  }

  return (
    <div className='sidebar'>
      <div className='compo'>
        {/* <Link to='/'>
          <img
            className='nav_photo'
            src={require('../photo/home.svg').default}
            alt=''
          />
        </Link> */}
        <div className='hosimg'>
          
        </div>
        <h2 className='hd1'>{hospital && hospital.toUpperCase()}</h2>

        <div className='tabsss'>
          {Sidebardata.map((val, key) => {
            return (
              <Link to={val.link}>
                <div className='tabone'>
                  <div className='tabadj'>{val.icon}</div>
                  <h2 className='tabadj'>{val.title}</h2>
                </div>
              </Link>
            )
          })}
          <Link to='/login'>
            <div className='tabone'>
              <div className='tabadj'>
                <LogoutIcon></LogoutIcon>
              </div>

              <h2 className='tabadj'>
                Logout
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
