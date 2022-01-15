import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useTranslation } from 'react-i18next'
import './Centers.css'

function Centers(props) {
  const [curlat, setcurrlat] = useState()
  const [curlong, setcurrlong] = useState()
  const { t } = useTranslation()

  const getcurrentlocation = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setcurrlat(position.coords.latitude)
      setcurrlong(position.coords.longitude)
    })
  }

  var lon1 = (Number(props.longi) * Math.PI) / 180
  var lon2 = (curlong * Math.PI) / 180
  var lat1 = (Number(props.lati) * Math.PI) / 180
  var lat2 = (curlat * Math.PI) / 180

  let dlon = lon2 - lon1
  let dlat = lat2 - lat1
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2)

  let c = 2 * Math.asin(Math.sqrt(a))

  let r = 6371
  var d = c * r

  useEffect(() => {
    getcurrentlocation()
  }, [])

  return (
    <div>
      <div className='designplasma1111'>
        <div className='ndist'>
          <h2>{props.name}</h2>
          <div className='inside'>
            <LocationOnIcon className='loca' />
            <h2 className='dist'>
              {t('Nearly')} {parseFloat(d).toFixed(2)} {t('Kms away')}
            </h2>
          </div>
        </div>
        <h3 className='mobno'>Center ID : {props.id}</h3>
        <h4 className='address'>
          {props.address} , {props.city} , {props.state} , {props.pin}
        </h4>

        <div className='dir'>
          <h3
            className='dirbutton'
            onClick={(e) => {
              window.open(
                'https://maps.google.com?q=' + props.lati + ',' + props.longi
              )
            }}
          >
            {t('Directions')}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Centers
