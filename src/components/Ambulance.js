import React, { useState, useEffect } from 'react'
import './Ambulance.css'
import { db } from '../Firebase'
import { useAuth } from '../AuthContext'

function Ambulance() {
  const { currentuser } = useAuth()
  const [number, setnumber] = useState()
  const [name, setname] = useState()
  const [phoneno, setphoneno] = useState()

  const [hospitalname, sethospitalname] = useState()
  const [address, setaddress] = useState()
  const [city, setcity] = useState()
  const [lat, setlat] = useState()
  const [hospcontact, sethospcontact] = useState()
  const [long, setlong] = useState()

  const gethospitaldata = async () => {
    await db
      .collection('hospitals')
      .where('uid', '==', currentuser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          sethospitalname(element.data().hospitalname)
          setcity(element.data().city)
          sethospcontact(element.data().phoneno)
          setlat(element.data().latitude)
          setlong(element.data().longitude)
          setaddress(element.data().address)
        })
      })
  }

  useEffect(() => {
    gethospitaldata()
  }, [])

  const addambulance = async () => {
    try {
      db.collection('ambulance')
        .doc(currentuser.uid)
        .collection('ambulance1')
        .doc()
        .set({
          ambulancenumber: number,
          name: name,
          phoneno: phoneno,
          uid: currentuser.uid,
        })
      alert('💥New Ambulance Added💥')

      db.collection('ambulanceforpatients').doc().set({
        ambulancenumber: number,
        name: name,
        address: address,
        phoneno: phoneno,
        uid: currentuser.uid,
        city: city,
        hospitalname: hospitalname,
        hospcontact: hospcontact,
        latitude: lat,
        longitude: long,
      })
    } catch (e) {
      alert('💥Something went wrong!! Please try adding all fields again💥')
    }
  }

  return (
    <div>
      <div className='dashhome'>
        <label className='fname'>Enter Ambulance Number</label>
        <input
          type='text'
          value={number}
          onChange={(e) => setnumber(e.target.value)}
          className='inptext'
        />

        <label className='fname'>Enter Driver Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setname(e.target.value)}
          className='inptext'
        />

        <label className='fname'>Enter Driver Number</label>
        <input
          type='text'
          value={phoneno}
          onChange={(e) => setphoneno(e.target.value)}
          className='inptext'
        />
      </div>

      <input
        type='submit'
        onClick={addambulance}
        className='subbtn3'
        value='Add'
      />
    </div>
  )
}

export default Ambulance
