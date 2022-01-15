import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { useAuth } from '../AuthContext'
import './DashHome.css'
import Requests from './Requests'
import Card from './Card'
import Cardplasma from './Cardplasma'
import { Link } from 'react-router-dom'
import PlacesAutocomplete from 'react-places-autocomplete'
import { fontWeight } from '@mui/system'
import { colors } from '@mui/material'

function DashHome() {
  const { currentuser } = useAuth()
  const [city, setcity] = useState()
  const [lati, setlati] = useState()
  const [longi, setlongi] = useState()
  const [address, setaddress] = useState()
  const [type, settype] = useState()
  const [rat, setrat] = useState()

  const [oxy, setoxy] = useState()
  const [nonoxy, setnonoxy] = useState()
  const [contact, setcontact] = useState()

  const [twithoxy, settwithoxy] = useState()
  const [twithoutoxy, settwithoutoxy] = useState()

  const [icuventi, seticuventi] = useState()
  const [icunonventi, seticunonventi] = useState()

  const [ticuventi, setticuventi] = useState()
  const [ticunonventi, setticunonventi] = useState()

  const [ap, setap] = useState()
  const [an, setan] = useState()
  const [abp, setabp] = useState()
  const [abn, setabn] = useState()
  const [op, setop] = useState()
  const [on, seton] = useState()

  const [ambulancerequests, setambulancereq] = useState([])

  const [ambdata, setambdata] = useState([])

  const getdata = async () => {
    await db
      .collection('hospitals')
      .where('uid', '==', currentuser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          setrat(element.data().rat)
          settype(element.data().type)
          setcity(element.data().city)
          setcontact(element.data().phoneno)
          setaddress(element.data().address)
          setlati(element.data().latitude)
          setlongi(element.data().longitude)
          setoxy(element.data().oxy)
          setnonoxy(element.data().withoutoxy)
          settwithoxy(element.data().twithoxy)
          settwithoutoxy(element.data().twithoutoxy)

          seticuventi(element.data().icuventi)
          seticunonventi(element.data().icunonventi)

          setticuventi(element.data().ticuventi)
          setticunonventi(element.data().ticunonventi)

          setap(element.data().apositive)
          setan(element.data().anegative)
          setabp(element.data().abpositive)
          setabn(element.data().abnegative)
          setop(element.data().opositive)
          seton(element.data().onegative)
        })
      })
  }

  const getambulancedata = async () => {
    const temparray = []

    await db
      .collection('ambulance')
      .doc(currentuser.uid)
      .collection('ambulance1')
      .get()
      .then((snapshot) => {
        snapshot.forEach((data) => {
          temparray.push(data.data())
        })
      })

    setambdata(temparray)
  }

  console.log(ambdata)

  const getambreq = async () => {
    const temp = []
    await db
      .collection('patientscall')
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          if (item.data().uid === currentuser.uid) {
            temp.push(item.data())
          }
        })
      })
    setambulancereq(temp)
  }

  console.log(ambdata)

  useEffect(() => {
    getdata()
    getambulancedata()
    getambreq()
  }, [])

  return (
    <div className='homepage'>
      <h2 className='addetail'>Ambulance Requests</h2>
      <p>(Requests put 15 min or earlier will be visible)</p>

      <div className='requests'>
        {ambulancerequests.length === 0 ? (
          <h2 style={{ fontWeight: 100 }}>No data </h2>
        ) : (
          ambulancerequests.map((val, key) => {
            return (
              <Requests
                name={val.name}
                phoneno={val.phoneno}
                address={val.address}
                lat={val.lat}
                long={val.long}
                time={val.time}
                hosplat={lati}
                hosplong={longi}
                check={val.check}
              ></Requests>
            )
          })
        )}
      </div>

      <hr className='tag'></hr>

      <h2 className='addetail'>Address Details</h2>

      <div className='dashhome'>
        <label className='fname'>City Where hospital located</label>
        <input
          type='text'
          className='inptext'
          placeholder={city && city.toUpperCase()}
          readOnly
        />

        <label className='fname'>Hospital Address</label>
        <input
          type='text'
          className='inptext'
          placeholder={address && address.toUpperCase()}
          readOnly
        />

        <label className='fname'>Latitude</label>
        <input type='text' className='inptext' placeholder={lati} readOnly />

        <label className='fname'>Longitude </label>
        <input
          type='text'
          id='lname'
          className='inptext'
          name='lastname'
          placeholder={longi}
          readOnly
        />

        <label className='fname'>Contact Info </label>
        <input
          type='text'
          id='lname'
          className='inptext'
          name='lastname'
          placeholder={contact}
          readOnly
        />

        <label className='fname'>Hospital Type</label>
        <input
          type='text'
          id='lname'
          className='inptext'
          name='lastname'
          placeholder={type && type.toUpperCase()}
          readOnly
        />

        <Link to='/address'>
          <input type='submit' className='subbtn1' value='Update' />
        </Link>
      </div>

      <hr className='tag'></hr>

      <h2 className='addetail'>Bed Availability Details</h2>
      <div className='dashhome'>
        <div className='card1'>
          <Card title='Oxygen Beds' data1={oxy} data2={twithoxy}></Card>
          <Card
            title='Non Oxygen Beds'
            data1={nonoxy}
            data2={twithoutoxy}
          ></Card>
        </div>

        <div className='card1'>
          <Card
            title='ICU With Ventilators'
            data1={icuventi}
            data2={ticuventi}
          ></Card>
          <Card
            title='ICU Without Ventilators'
            data1={icunonventi}
            data2={ticunonventi}
          ></Card>
        </div>

        <Link to='/beds'>
          <input type='submit' className='subbtn1' value='Update' />
        </Link>
      </div>

      <hr className='tag'></hr>

      <h2 className='addetail'>Plasma Availability Details</h2>
      <div className='dashhome'>
        <div className='card2'>
          <Cardplasma title='A+' val={ap}></Cardplasma>
          <Cardplasma title='A-' val={an}></Cardplasma>
          <Cardplasma title='AB+' val={abp}></Cardplasma>
        </div>

        <div className='card2'>
          <Cardplasma title='AB-' val={abn}></Cardplasma>
          <Cardplasma title='O+' val={op}></Cardplasma>
          <Cardplasma title='O-' val={on}></Cardplasma>
        </div>

        <Link to='/plasma'>
          <input type='submit' className='subbtn1' value='Update' />
        </Link>
      </div>

      <hr className='tag'></hr>

      <h2 className='addetail'>RAT Facility</h2>

      <div className='dashhome'>
        <label className='fname'>IS RAT Facility Available?</label>
        <input
          type='text'
          className='inptext'
          placeholder={rat && rat.toUpperCase()}
          readOnly
        />

        <Link to='/rattest'>
          <input type='submit' className='subbtn1' value='Update' />
        </Link>
      </div>

      <hr className='tag'></hr>

      <h2 className='addetail'>Ambulance</h2>

      <div className='dashhome'>
        {ambdata.length === 0 ? (
          <div>No Data</div>
        ) : (
          ambdata.map((val, key) => {
            return (
              <div className='ambu'>
                <h2>Ambulance Number - {val.ambulancenumber}</h2>
                <h4 className='amb'>Driver Name - {val.name}</h4>
                <h4 className='amb'>Driver Phone Number - {val.phoneno}</h4>
              </div>
            )
          })
        )}

        <Link to='/ambulance'>
          <input type='submit' className='subbtn12' value='Add Ambulance' />
        </Link>
      </div>
    </div>
  )
}

export default DashHome
