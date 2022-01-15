import React, { useState } from 'react'
import './Hospital.css'
//import './Search.css'
import Hosp from './Hosp'
import { db } from './Firebase'
import { UseState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { green } from '@mui/material/colors'

function Hospitaldata() {
  const { t, i18n } = useTranslation()

  const getlocation = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)
    })
  }

  useEffect(() => {
    getdata()
    getlocation()
  }, [])

  const [recentupdate, setrecentupdate] = useState(false)
  const [oxyfilter, setoxyfilter] = useState(false)
  const [nonoxy, setnonoxy] = useState(false)
  const [venti, setventi] = useState(false)
  const [nonventi, setnonventi] = useState(false)
  const [pri, setprivate] = useState(false)
  const [govt, setgovt] = useState(false)

  const [city, setcity] = useState()
  const [hospital, sethospital] = useState([])
  const [orignaldata, setorignaldata] = useState([])

  const [alldata, setalldata] = useState([])

  const hosp = []
  const applyfilter = async () => {
    sethospital([...orignaldata])

    if (govt) {
      var newarray = []
      newarray = orignaldata.filter((data) => data.type === 'government')

      if (recentupdate) {
        newarray.sort((a, b) => {
          return new Date(b.time) - new Date(a.time)
        })
      } else if (oxyfilter) {
        newarray.sort((a, b) => (parseInt(a.oxy) < parseInt(b.oxy) ? 1 : -1))
      } else if (nonoxy) {
        newarray.sort((a, b) =>
          parseInt(a.withoutoxy) < parseInt(b.withoutoxy) ? 1 : -1
        )
      } else if (venti) {
        newarray.sort((a, b) =>
          parseInt(a.icuventi) < parseInt(b.icuventi) ? 1 : -1
        )
      } else if (nonventi) {
        newarray.sort((a, b) =>
          parseInt(a.icunonventi) < parseInt(b.icunonventi) ? 1 : -1
        )
      }

      sethospital([...newarray])
    } else if (pri) {
      var newarray = []
      newarray = orignaldata.filter((data) => data.type === 'private')
      if (recentupdate) {
        newarray.sort((a, b) => {
          return new Date(b.time) - new Date(a.time)
        })
      } else if (oxyfilter) {
        newarray.sort((a, b) => (parseInt(a.oxy) < parseInt(b.oxy) ? 1 : -1))
      } else if (nonoxy) {
        newarray.sort((a, b) =>
          parseInt(a.withoutoxy) < parseInt(b.withoutoxy) ? 1 : -1
        )
      } else if (venti) {
        newarray.sort((a, b) =>
          parseInt(a.icuventi) < parseInt(b.icuventi) ? 1 : -1
        )
      } else if (nonventi) {
        newarray.sort((a, b) =>
          parseInt(a.icunonventi) < parseInt(b.icunonventi) ? 1 : -1
        )
      }

      sethospital([...newarray])
    } else if (recentupdate) {
      sethospital([...orignaldata])
      hospital.sort((a, b) => {
        return new Date(b.time) - new Date(a.time)
      })
      sethospital([...hospital])
    } else if (nonventi) {
      sethospital([...orignaldata])
      hospital.sort((a, b) =>
        parseInt(a.icunonventi) < parseInt(b.icunonventi) ? 1 : -1
      )
      sethospital([...hospital])
    } else if (venti) {
      sethospital([...orignaldata])
      hospital.sort((a, b) =>
        parseInt(a.icuventi) < parseInt(b.icuventi) ? 1 : -1
      )
      sethospital([...hospital])
    } else if (oxyfilter) {
      sethospital([...orignaldata])
      hospital.sort((a, b) => (parseInt(a.oxy) < parseInt(b.oxy) ? 1 : -1))
      sethospital([...hospital])
    } else if (nonoxy) {
      sethospital([...orignaldata])
      hospital.sort((a, b) =>
        parseInt(a.withoutoxy) < parseInt(b.withoutoxy) ? 1 : -1
      )
      sethospital([...hospital])
    }
  }

  const fetch = (e) => {
    const fetcheddata = alldata.filter((data) => {
      return (
        data.city.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ||
        data.hospitalname.toLowerCase().indexOf(e.target.value.toLowerCase()) >
          -1
      )
    })
    sethospital(fetcheddata)
    setorignaldata(fetcheddata)
  }

  const getdata = async () => {
    await db
      .collection('hospitals')
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          hosp.push(element.data())
        })

        setalldata(hosp)
      })

    if (hosp.length == 0) alert('No data found')
    console.log(hosp)
  }

  return (
    <div className='hospital'>
      <div className='hospital_search'>
        <div className='hospital_searchbar'>
          <input
            type='search'
            value={city}
            className='searchfield'
            onChange={fetch}
            placeholder={t('Search by City or Hospital')}
          ></input>
          <p>
            {t(
              'Search by city name across Maharashtra eg: Akola, Nagpur, Chandrapur...'
            )}
          </p>
        </div>

        <div className='hospital_filter'>
          <div className='hospital_filter_all'>
            <div
              className='hospital_namefilter'
              style={recentupdate ? { backgroundColor: 'lightgray' } : null}
              onClick={() => {
                setoxyfilter(false)
                setrecentupdate(!recentupdate)
                setnonoxy(false)
                setventi(false)
                setnonventi(false)
              }}
            >
              {t('Recently Updated')}
            </div>

            <div
              className='hospital_namefilter'
              style={oxyfilter ? { backgroundColor: 'lightgray' } : null}
              onClick={() => {
                setoxyfilter(!oxyfilter)
                setrecentupdate(false)
                setnonoxy(false)
                setventi(false)
                setnonventi(false)
              }}
            >
              {t('With Oxygen')}
            </div>

            <div
              className='hospital_namefilter'
              style={nonoxy ? { backgroundColor: 'lightgray' } : null}
              onClick={(e) => {
                setoxyfilter(false)
                setrecentupdate(false)
                setnonoxy(!nonoxy)
                setventi(false)
                setnonventi(false)
              }}
            >
              {t('Without Oxygen')}
            </div>

            <div
              className='hospital_namefilter'
              style={venti ? { backgroundColor: 'lightgray' } : null}
              onClick={() => {
                setoxyfilter(false)
                setrecentupdate(false)
                setnonoxy(false)
                setventi(!venti)
                setnonventi(false)
              }}
            >
              {t('ICU With Ventilators')}
            </div>

            <div
              className='hospital_namefilter'
              style={nonventi ? { backgroundColor: 'lightgray' } : null}
              onClick={() => {
                setoxyfilter(false)
                setrecentupdate(false)
                setnonoxy(false)
                setventi(false)
                setnonventi(!nonventi)
              }}
            >
              {t('ICU Without Ventilators')}
            </div>
            {/* goverment and private */}
            <div
              className='hospital_namefilter'
              style={govt ? { backgroundColor: 'lightblue' } : null}
              onClick={() => {
                setgovt(!govt)
                setprivate(false)
                sethospital([...orignaldata])
              }}
            >
              {t('Government')}
            </div>

            <div
              className='hospital_namefilter'
              style={pri ? { backgroundColor: 'lightblue' } : null}
              onClick={(e) => {
                setprivate(!pri)
                setgovt(false)
                sethospital([...orignaldata])
              }}
            >
              {t('Private')}
            </div>
          </div>
        </div>

        {/* <div className='filter_g_p'>
          <div className='hospital_filter_g_p'><h3
              className='hospital_namefilter'
              style={govt ? { backgroundColor: 'lightblue' } : null}
              onClick={() => {
                setgovt(!govt)
                setprivate(false)
                sethospital([...orignaldata])
              }}
            >
              {t('Government')}
            </h3>
            <h3
              className='hospital_namefilter'
              style={pri ? { backgroundColor: 'lightblue' } : null}
              onClick={(e) => {
                setprivate(!pri)
                setgovt(false)
                sethospital([...orignaldata])
              }}
            >
              {t('Private')}
            </h3></div>
        </div> */}
        
        <div className='hospital_filter_all'>
          <div className='clearfilter'>
            <h3
              className='hospital_applyFilter'
              onClick={() => {
                applyfilter()
              }}
            >
              {t('Apply ')}
            </h3>
          </div>

          <div className='clearfilter'>
            <h3
              className='hospital_cf'
              onClick={() => {
                setoxyfilter(false)
                setrecentupdate(false)
                setnonoxy(false)
                setventi(false)
                setnonventi(false)
                setprivate(false)
                setgovt(false)

                sethospital([...orignaldata])
              }}
            >
              {t('Clear ')}
            </h3>
          </div>
        </div>
      </div>

      {hospital.length === 0 ? null : (
        <div className=' '>
          <div className='displaymes'>
            <p className='line1'>
              {t(
                'Data may be delayed or partial. Please verify with the hospital'
              )}
            </p>
          </div>

          <div className='datahosp'>
            {hospital.map((val, key) => {
              return (
                <Hosp
                  key={key}
                  hospitalname={val.hospitalname}
                  phoneno={val.phoneno}
                  address={val.address}
                  lati={val.latitude}
                  longi={val.longitude}
                  oxy={val.oxy}
                  twithoxy={val.twithoxy}
                  withoutoxy={val.withoutoxy}
                  twithoutoxy={val.twithoutoxy}
                  icuventi={val.icuventi}
                  ticuventi={val.ticuventi}
                  icunonventi={val.icunonventi}
                  ticunonventi={val.ticunonventi}
                  type={val.type}
                  time={val.time}
                ></Hosp>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Hospitaldata
