import React, { useEffect, useState } from 'react'
import './Searchplasma.css'
import { useAuth } from './AuthContext'
import { db } from './Firebase'
import Plasmadatails from './Plasmadetails.js'
import { useTranslation } from 'react-i18next'
import './Search.css'

const SearchPage = () => {
  const { t } = useTranslation()
  const [hospitals, sethospitals] = useState([])
  const [city, setcity] = useState()
  const [alldata, setalldata] = useState([])
  const [orignaldata, setorignaldata] = useState([])

  const [updated, setupdated] = useState(false)
  const [ap, setap] = useState(false)
  const [an, setan] = useState(false)
  const [abp, setabp] = useState(false)
  const [abn, setabn] = useState(false)
  const [op, setop] = useState(false)
  const [on, seton] = useState(false)

  const getalldata = async () => {
    const hosp = []
    await db
      .collection('hospitals')
      .get()
      .then((snapshot) => {
        snapshot.forEach((element) => {
          hosp.push(element.data())
        })
      })

    setalldata(hosp)
  }

  useEffect(() => {
    getalldata()
  }, [])

  const applyfilter = () => {
    if (updated) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) => {
        return new Date(b.time1) - new Date(a.time1)
      })

      console.log(hospitals)
      sethospitals([...hospitals])
    } else if (ap) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) =>
        parseInt(a.apositive) < parseInt(b.apositive) ? 1 : -1
      )
      sethospitals([...hospitals])
    } else if (an) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) =>
        parseInt(a.anegative) < parseInt(b.anegative) ? 1 : -1
      )
      sethospitals([...hospitals])
    } else if (abp) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) =>
        parseInt(a.abpositive) < parseInt(b.abpositive) ? 1 : -1
      )
      sethospitals([...hospitals])
    } else if (abn) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) =>
        parseInt(a.abnegative) < parseInt(b.abnegative) ? 1 : -1
      )
      sethospitals([...hospitals])
    } else if (op) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) =>
        parseInt(a.opositive) < parseInt(b.opositive) ? 1 : -1
      )
      sethospitals([...hospitals])
    } else if (on) {
      sethospitals([...orignaldata])
      hospitals.sort((a, b) =>
        parseInt(a.negative) < parseInt(b.onegative) ? 1 : -1
      )
      sethospitals([...hospitals])
    }
  }

  const searchplasma = (e) => {
    const newarray = alldata.filter((data) => {
      return data.city.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    })
    setorignaldata(newarray)
    sethospitals(newarray)
  }

  return (
    <div>
      <div className='searchpp'>
        <div className='searchbar'>
          <input
            type='search'
            className='searchfield'
            onChange={searchplasma}
            placeholder={t('Search by City or hospital name')}
          ></input>
        </div>
        <p>
          {t(
            'Search by city name across Maharashtra eg: Akola, Chandrapur, Nagpur...'
          )}
        </p>

        <div className='filter'>
          <div className='fil'>
            <h3
              className='hospital_namefilter'
              // style={updated ? { backgroundColor: 'red' } : null}
              style={updated ? { backgroundColor: 'pink' }  : null}
              onClick={() => {
                setupdated(!updated)
                setan(false)
                setap(false)
                setabp(false)
                setabn(false)
                setop(false)
                seton(false)
              }}
            >
              {t('Recently Updated')}
            </h3>

            <h3
              className='hospital_namefilter'
              style={ap ? { backgroundColor: 'pink' }  : null}
              onClick={() => {
                setupdated(false)
                setan(false)
                setap(!ap)
                setabp(false)
                setabn(false)
                setop(false)
                seton(false)
              }}
            >
              {t('A+ve')}
            </h3>
            <h3
              className='hospital_namefilter'
              style={an ? { backgroundColor: 'pink' }  : null}
              onClick={(e) => {
                setupdated(false)
                setan(!an)
                setap(false)
                setabp(false)
                setabn(false)
                setop(false)
                seton(false)
              }}
            >
              {t('A-ve')}
            </h3>
            <h3
              className='hospital_namefilter'
              style={abp ? { backgroundColor: 'pink' }  : null}
              onClick={() => {
                setupdated(false)
                setan(false)
                setap(false)
                setabp(!abp)
                setabn(false)
                setop(false)
                seton(false)
              }}
            >
              {t('AB+ve')}
            </h3>
            <h3
              className='hospital_namefilter'
              style={abn ? { backgroundColor: 'pink' }  : null}
              onClick={() => {
                setupdated(false)
                setan(false)
                setap(false)
                setabp(false)
                setabn(!abn)
                setop(false)
                seton(false)
              }}
            >
              {t('AB-ve')}
            </h3>

            <h3
              className='hospital_namefilter'
              style={op ? { backgroundColor: 'pink' }  : null}
              onClick={() => {
                setupdated(false)
                setan(false)
                setap(false)
                setabp(false)
                setabn(false)
                setop(!op)
                seton(false)
              }}
            >
              {t('O+ve')}
            </h3>
            <h3
              className='hospital_namefilter'
              style={on ? { backgroundColor: 'pink' }  : null}
              onClick={() => {
                setupdated(false)
                setan(false)
                setap(false)
                setabp(false)
                setabn(false)
                setop(false)
                seton(!on)
              }}
            >
              {t('O-ve')}
            </h3>
          </div>
        </div>
        
        <div className='hospital_filter_alll'>
          <div className='clearfilterrrr'>
            <h3 className='hospital_applyFilter' onClick={applyfilter}>
              {t('Apply ')}
            </h3>
          </div>
          <div className='clearfilterrrr'>
            <h3
              className='hospital_cf'
              onClick={() => {
                sethospitals([...orignaldata])
                setupdated(false)
                setan(false)
                setap(false)
                setabp(false)
                setabn(false)
                setop(false)
                seton(false)
              }}
            >
              {t('Clear ')}
            </h3>
          </div>
        </div>

      </div>

      <div className='plasmadet'>
        {hospitals.length === 0
          ? null
          : hospitals.map((val, key) => {
              return (
                <Plasmadatails
                  key={key}
                  hospitalname={val.hospitalname}
                  address={val.address}
                  phoneno={val.phoneno}
                  type={val.type}
                  lati={val.latitude}
                  longi={val.longitude}
                  op={val.opositive}
                  on={val.onegative}
                  ap={val.apositive}
                  an={val.anegative}
                  abp={val.abpositive}
                  abn={val.abnegative}
                  time1={val.time1}
                ></Plasmadatails>
              )
            })}
      </div>
    </div>
  )
}

export default SearchPage
