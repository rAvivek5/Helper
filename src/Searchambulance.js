import React, { useEffect, useState } from 'react'
import './Searchambulance.css'
import Ambulance from './Ambulance'

import './Search.css'
import { db } from './Firebase'

const SearchPage = () => {
  const [ambdata, setambdata] = useState([])
  const [alldata, setalldata] = useState([])

  const getambulancedata = async () => {
    const temp = []
    await db
      .collection('ambulanceforpatients')
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          temp.push(element.data())
        })
      })

    setalldata(temp)
  }

  const getambulance = (e) => {
    const newarray = alldata.filter((data) => {
      return (
        data.city.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
        data.hospitalname.toLowerCase().indexOf(e.target.value.toLowerCase()) >
          -1
      )
    })
    setambdata(newarray)
  }

  console.log(ambdata)

  useEffect(() => {
    getambulancedata()
  }, [])

  return (
    <div className='searchplasma'>
      <div className='searchbar'>
        <input
          type='search'
          className='searchfield'
          onChange={getambulance}
          placeholder='Search by City'
        ></input>
      </div>
      <p className='mbottom'>
        Search by city name across Maharashtra eg: Akola, Chandrapur, Nagpur...
      </p>

      {ambdata.map((val, key) => {
        return (
          <div >
            {/* <hr className='mbottom'></hr> */}
            <div className='ambbb'>
              <Ambulance 
                hospitalname={val.hospitalname}
                phoneno={val.hospcontact}
                lat={val.latitude}
                long={val.longitude}
                address={val.address}
                ambulanceno={val.ambulancenumber}
                name={val.name}
                phone={val.phoneno}
                uid={val.uid}
              ></Ambulance>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SearchPage
