import React from 'react'
import './Navbar.css'
import GTranslateIcon from '@mui/icons-material/GTranslate'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
function Navbar(props) {
  const { t, i18n } = useTranslation()

  const changelang = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className='navbar'>
      <div className='heading'>
        {/* <img
            className='nav_img'
            src='https://wallpapercave.com/wp/wp6687365.jpg'
            alt=''
          /> */}
        <Link to='/'>
          <img
            className='nav_photo'
            src={require('./photo/home.svg').default}
            alt=''
          />
        </Link>
        <h4>{t('MAHARASHTRA COVID HELPER')}</h4>

        <ul className='nav_list'>
          <button
            className='nav_button'
            title='Change language'
            onClick={(e) => {
              e.preventDefault()
              changelang('en')
            }}
          >
            English
          </button>
          <button
            className='nav_button'
            title='Change language'
            onClick={(e) => {
              e.preventDefault()
              changelang('hin')
            }}
          >
            Marathi
          </button>
          <a href='https://mail.google.com/'>
            <li className='nav_mail_button'>
              <MailOutlineIcon />
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
