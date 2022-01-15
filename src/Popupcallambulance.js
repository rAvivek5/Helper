import React, { useState, useEffect } from 'react'
import { db } from './Firebase'
import './Popupcallambulance.css'
import firebase from '@firebase/app'
import CloseIcon from '@mui/icons-material/Close'

function Popupcallambulance(props) {
  const getlocation = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude)
      setlong(position.coords.longitude)
    })
  }

  const [name, setname] = useState()
  const [phoneno, setphoneno] = useState()
  const [address, setaddress] = useState()
  const [lat, setlat] = useState()
  const [long, setlong] = useState()
  const [check, setcheck] = useState(false)

  const bookambulance = async () => {
    try {
      await db.collection('patientscall').doc().set({
        uid: props.uid,
        name: name,
        address: address,
        phoneno: phoneno,
        lat: lat,
        long: long,
        time: firebase.firestore.Timestamp.now().toDate().toString(),
        check: check,
      })

      alert('Ambulance booked successfully')
    } catch (e) {
      alert(e.message)
    }
  }

  useEffect(() => {
    getlocation()
  }, [])

  return props.trigger === false ? null : (
    <div className='pop'>
      <CloseIcon
        className='cancel'
        onClick={() => props.strig(false)}
      ></CloseIcon>
      <div className='dett'>
        <h2 className='nom'>
          {props.hospitalname} - {props.phoneno}
        </h2>
        <h2 className='nom'> Ambulance Number - {props.ambulanceno}</h2>

        <input
          type='text'
          className='txt1'
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder='Enter your name'
        />
        <input
          type='text'
          className='txt2'
          value={phoneno}
          onChange={(e) => setphoneno(e.target.value)}
          placeholder='Enter your Phone No'
        ></input>
        <br></br>
        <input
          type='text'
          className='txt3'
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          placeholder='Enter your address'
        ></input>
        <br />
        <label>
          <input
            type='checkbox'
            onChange={(e) => setcheck(!check)}
            value={check}
          />
          Come to my current location
        </label>
        <br />
        <br />
        <br />
        <br />
        <button className='call' onClick={bookambulance}>
          Call Ambulance
        </button>
      </div>
    </div>
  )
}

export default Popupcallambulance
