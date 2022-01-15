import React ,{useEffect,useState}from 'react'
import './Ambulance.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Popupcallambulance from './Popupcallambulance';

function Ambulance(props) {

    const [curlat,setcurlat]=useState();
    const [curlong,setcurlong]=useState();
    const [trig,settrig]=useState(false);


    const getlocation=async()=>{
        await   navigator.geolocation.getCurrentPosition(function(position) {
            setcurlat(position.coords.latitude);
            setcurlong(position.coords.longitude);
          });
    }


    var lon1 =  Number(props.long) * Math.PI / 180;
         var  lon2 = curlong* Math.PI / 180;
          var  lat1 = Number(props.lat) * Math.PI / 180;
          var lat2 = curlat* Math.PI / 180;

          let dlon = lon2 - lon1;
          let dlat = lat2 - lat1;
          let a = Math.pow(Math.sin(dlat / 2), 2)
                   + Math.cos(lat1) * Math.cos(lat2)
                   * Math.pow(Math.sin(dlon / 2),2);
                 
          let c = 2 * Math.asin(Math.sqrt(a));
     
          let r = 6371;
    
          var d=c*r;
    useEffect(() => {
      
        getlocation();
    }, [])



    return (
        <div>

<div className="back">
      <div id="share">
      <div className="ndist">
      <h2>{props.hospitalname}</h2>
      <div className="inside">
        <LocationOnIcon className="loca"/>
      <h2 className="dist">Nearly {parseFloat(d).toFixed(2)} kms</h2>
      </div>
      </div>
      <h3 className="mobno">{props.phoneno}</h3>
      <h4 className="address">
      {props.address.toUpperCase()}
      </h4>
      <hr></hr>

      <h2 className="det">Ambulance Details</h2>
      <h4>Ambulance Number - {props.ambulanceno} </h4>
      <h4>Driver Name - {props.name}</h4>
      <h4>Driver Contact - {props.phone}</h4>

      <button className="call" value={trig} onClick={(e)=>settrig(!trig)} >Call to your Location</button>
        <Popupcallambulance 
                trigger={trig} strig={settrig}
                hospitalname={props.hospitalname}
                phoneno={props.phoneno}
                ambulanceno={props.ambulanceno}
                uid={props.uid}
        
        ></Popupcallambulance>


      </div>
      </div>

            
        </div>
    )
}

export default Ambulance
