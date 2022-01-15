import { compose, style } from '@mui/system'
import React, { useState, useEffect } from 'react'
import './Hosp.css'
import Popup from './Popup'
import { useTranslation } from 'react-i18next'
import SocialDistanceIcon from '@mui/icons-material/SocialDistance'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import * as htmlToImage from 'html-to-image'
import { RWebShare } from 'react-web-share'
import ShareIcon from '@mui/icons-material/Share'
import Share from '@mui/icons-material/Share'

function Hosp(props) {
  const [curlat, setcurrlat] = useState()
  const [curlong, setcurrlong] = useState()
  const [dist, setdistance] = useState()
  const [url, seturl] = useState()
  const [img, setimage] = useState()

  useEffect(() => {
    getimage()
  }, [])

  const getimage = () => {
    var node = document.getElementById('share')
    htmlToImage.toPng(node).then(function (dataUrl) {
      var img = new Image()
      img.src = dataUrl
      setimage(img)
      seturl(dataUrl)
    })
  }

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

  // calculate the result
  var d = c * r

  useEffect(() => {
    getcurrentlocation()
  }, [])

  const { t, i18n } = useTranslation()

  const [trig, settrig] = useState(false)

  var date1 = new Date(props.time)
  var date2 = new Date()
  console.log(date2)
  console.log(typeof date1)
  console.log(date1)

  var res = Math.abs(date2 - date1) / 1000
  var hours = Math.floor(res / 3600) % 24
  var minutes = Math.floor(res / 60) % 60

  return (
    <div className='hosp'>
      <div id='share'>
        <div className='hosp__info'>
          <h2>{props.hospitalname}</h2>
          <div className='hosp__dis'>
            <LocationOnIcon className='loca' />
            <h2 className='dist'>
              {t('Nearly')} {parseFloat(d).toFixed(2)} {t('Kms away')}
            </h2>
          </div>
        </div>
        <h3 className='mobno'>{props.phoneno}</h3>
        <h4 className='address'>{props.address.toUpperCase()}</h4>

        <div className='dir'>
          <h3
            className='dirbutton'
            onClick={() => {
              window.open(
                'https://maps.google.com?q=' + props.lati + ',' + props.longi
              )
            }}
          >
            {t('Directions')}
          </h3>

          {/* {hours === 0 ? (
            <h3 className='dirbutton1'>
              {minutes} {t('minutes ago')}
            </h3>
          ) : (
            <h3 className='dirbutton1'>
              {hours}
              {' ' + t('hours') + ' '} {minutes} {' ' + t('minutes ago')}
            </h3>
          )} */}
        </div>
        <hr></hr>

        <div className='charge'>
          <h3 className='design'>
            {props.type === 'government' ? t('Government') : t('Private')}
          </h3>
          <h3 className='design1'>
            {props.type === 'government'
              ? t('Non Chargeable')
              : t('Chargeable')}
          </h3>
        </div>

        <div className='oxygen'>
          <div>
            <h3 className='format'>{t('With Oxygen')}</h3>
            <h3 className='format1'>
              <span>{props.oxy}</span>/{props.twithoxy}
            </h3>
          </div>

          <div className='shift'>
            <h3 className='format'>{t('Without Oxygen')}</h3>
            <h3 className='format1'>
              <span>{props.withoutoxy}</span>/{props.twithoutoxy}
            </h3>
          </div>
        </div>

        <div className='ventilators'>
          <div>
            <h3 className='format'>{t('ICU With Ventilators')}</h3>
            <h3 className='format1'>
              <span>{props.icuventi}</span>/{props.ticuventi}
            </h3>
          </div>

          <div>
            <h3 className='format'>{t('ICU Without Ventilators')}</h3>
            <h3 className='format1'>
              <span>{props.icunonventi}</span>/{props.ticunonventi}
            </h3>
          </div>
        </div>
      </div>

      <div className='repshare'>
        <div>
          <h7 className='reportss' onClick={() => settrig(true)}>
            {t('Report Error')}
          </h7>
          <Popup
            trigger={trig}
            strig={settrig}
            hospitalname={props.hospitalname}
            address={props.address}
            phoneno={props.phoneno}
          ></Popup>
        </div>

        <div className='share'>
          <RWebShare
            data={{
              text: `Hospital Name : ${props.hospitalname.toUpperCase()}
          Address : ${props.address}
          Phone No :  ${props.phoneno}
          Bed Availability Details :  
          Updated - "${hours}  hours  ${minutes}  minutes ago   
          With Oxygen -  ${props.oxy}
          Without Oxygen -  ${props.withoutoxy}
          ICU With Ventilators -  ${props.icuventi}
          ICU Without Ventilators  ${props.icunonventi}
          `,
              title: `Hospital Name : ${props.hospitalname.toUpperCase()} 
          Address :  ${props.address}
          Phone No :  ${props.phoneno}
          Availability Details :  
          Updated - ${hours}  hours  ${minutes}  minutes ago   
          With Oxygen -  ${props.oxy}
          Without Oxygen -  ${props.withoutoxy}
          ICU With Ventilators -  ${props.icuventi}
          ICU Without Ventilators  ${props.icunonventi}`,
            }}
          >
            <div className='iconna'>
              <ShareIcon className='icc1' />
              <h7 className='icc'>{t('Share')}</h7>
            </div>
          </RWebShare>
        </div>
      </div>
    </div>
  )
}

export default Hosp
