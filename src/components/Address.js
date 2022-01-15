import React, { useState } from 'react'
import { auth, db } from '../Firebase'
import { useAuth } from '../AuthContext'
import './Address.css'
import { Alert } from '@mui/material'

function Address() {
  const [address, setaddress] = useState()
  const [lati, setlati] = useState()
  const [city, setcity] = useState()
  const [longi, setlongi] = useState()
  const { currentuser } = useAuth()
  const [contact, setcontact] = useState()
  const [type, settype] = useState()

  const addata = async (e) => {
    e.preventDefault()

    try {
      await db.collection('hospitals').doc(currentuser.uid).update({
        city: city,
        address: address,
        latitude: lati,
        longitude: longi,
        phoneno: contact,
        type: type,
      })

      alert('💥Data updated Successfully💥')
    } catch (e) {
      alert('💥Something went wrong!! Please try adding all fields again💥')
    }
  }

  console.log(city)

  return (
    <div>
      <div className='dashhome'>
        <label className='fname'>Select City </label>
        <select
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className='inptext'
          placeholder='Enter city'
        >
          <option>Select Hospital Region</option>
          <option value='akola'>Akola</option>
          <option value='bhandara'>Bhandara</option>
          <option value='chandrapur'>Chandrapur</option>
          <option value='japan'>Japan</option>
          <option value='jalgoan'>Jalgoan</option>
          <option value='mumbai'>Mumbai</option>
          <option value='nashik'>Nashik</option>
          <option value='nagpur'>Nagpur</option>
          <option value='pune'>Pune</option>
          <option value='yavatmal'>Yavatmal</option>
          <option value='europa'>Europa</option>
          <option value='europa'>Other</option>
        </select>

        <label className='fname'>Hospital Type</label>
        <select
          value={type}
          onChange={(e) => settype(e.target.value)}
          className='inptext'
          placeholder='Select type'
        >
          <option>Select Hospital Type</option>

          <option value='government'>Government</option>
          <option value='private'>Private</option>
        </select>

        <label className='fname'>Enter Hospital Address</label>
        <input
          type='text'
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className='inptext'
          placeholder='Enter address'
        />

        <label className='fname'>Enter Latitude</label>
        <input
          type='text'
          value={lati}
          onChange={(e) => setlati(e.target.value)}
          className='inptext'
          placeholder='Enter Latitude'
        />

        <label className='fname'>Enter longitude </label>
        <input
          type='text'
          id='lname'
          value={longi}
          onChange={(e) => setlongi(e.target.value)}
          className='inptext'
          name='lastname'
          placeholder='Enter Longitude'
        />

        <label className='fname'>Enter Contact Number</label>
        <input
          type='text'
          id='lname'
          value={contact}
          onChange={(e) => setcontact(e.target.value)}
          className='inptext'
          name='lastname'
          placeholder='Enter Contact Number'
        />

        <input
          type='submit'
          onClick={addata}
          className='subbtn'
          value='Submit'
        />
      </div>
    </div>
  )
}

export default Address
