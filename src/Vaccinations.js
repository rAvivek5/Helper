import { cardMediaClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import Centers from './Centers'

import './Vaccinations.css'

function Vaccinations() {
  const { t } = useTranslation()
  const [show, setshow] = useState(false)
  const [lat, setlat] = useState()
  const [long, setlong] = useState()
  const [centers, setcenters] = useState([])
  const [data, setdata] = useState([])
  const [loading, setloadig] = useState(true)

  const getlocation = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude)
      setlong(position.coords.longitude)
    })
  }

  const getdata = async () => {
    await axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${lat}&long=${long}`
      )
      .then((data) => {
        setcenters(data.data.centers)
        console.log(data.data)
      })
  }

  useEffect(() => {
    getlocation()
  }, [lat, long])

  return (
    <div className='color'>
      <div className='vac'>
        <h7 className='vacci' onClick={getdata}>
          {t('Get Vaccination Centers')}
        </h7>
      </div>
      {centers.length === 0 ? null : (
        <h6 className='noof'>
          Found {centers.length - 2}+ Vaccination Centers Near You{' '}
        </h6>
      )}
      {centers.length === 0 ? null : <div className='void'></div>}
      <div className='centers'>
        {centers.map((val, key) => {
          return (
            <Centers
              name={val.name}
              id={val.center_id}
              address={val.location}
              city={val.block_name}
              state={val.state_name}
              pin={val.pincode}
              lati={val.lat}
              longi={val.long}
            ></Centers>
          )
        })}
      </div>
    </div>
  )
}

export default Vaccinations
