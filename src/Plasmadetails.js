import React from "react";
import "./Plasmadetails.css";
import {useTranslation} from 'react-i18next'
import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';

function Hosp(props) {

    var date1 = new Date(props.time1);
  var date2=new Date();
  console.log(date2);
  console.log(typeof(date1))
  console.log(date1);

  const{t}=useTranslation();


  var res = Math.abs(date2 - date1) / 1000;
  var hours = Math.floor(res / 3600) % 24;       
  var minutes = Math.floor(res / 60) % 60;

  return (
    <div className="designplasma">
      <h2>{props.hospitalname}</h2>
      <h3 className="mobno">{props.phoneno}</h3>
      <h4 className="address">
      {props.address.toUpperCase()}
      </h4>

      <div className="dir">
        <h3 className="dirbutton" onClick={()=>{
             window.open("https://maps.google.com?q="+props.lati+","+props.longi );
        }}>{t("Directions")}</h3>

        {/* {
            hours===0?<h3 className="dirbutton1">{minutes}{ t("minutes ago")}</h3> :
        <h3 className="dirbutton1">{hours} {t("hours")} {minutes} {t("minutes ago")}</h3>
} */}
      </div>
      <hr></hr>

      <div className="row1">
          <div className="box">
              <div className="group">
                  <h4 className="grp">O-ve</h4>
              </div>

              <div className="qty">
                  <h4 className="grp">{props.on}</h4>

              </div>

          </div>


          <div className="box">
              <div className="group">
                  <h4 className="grp">O+ve</h4>
              </div>

              <div className="qty">
                  <h4 className="grp">{props.op}</h4>

              </div>

          </div>

          <div className="box">
              <div className="group">
                  <h4 className="grp">A+ve</h4>
              </div>

              <div className="qty">
                  <h4 className="grp">{props.ap}</h4>

              </div>

          </div>


      </div>

      <div className="row1">
          <div className="box">
              <div className="group">
                  <h4 className="grp">A-ve</h4>
              </div>

              <div className="qty">
                  <h4 className="grp">{props.an}</h4>

              </div>

          </div>


          


          <div className="box">
              <div className="group">
                  <h4 className="grp">AB+ve</h4>
              </div>

              <div className="qty">
                  <h4 className="grp">{props.abp}</h4>

              </div>

          </div>



          <div className="box">
              <div className="group">
                  <h4 className="grp">AB-ve</h4>
              </div>

              <div className="qty">
                  <h4 className="grp">{props.abn}</h4>

              </div>

          </div>

      </div>

        <RWebShare
        data={{
          text: `Hospital Name : ${props.hospitalname.toUpperCase()}
          Address : ${props.address}
          Phone No :  ${props.phoneno}
          Plasma Availability Details :  
          Updated - "${hours}  hours  ${minutes}  minutes ago   
          A+ -  ${props.ap}
          A- -  ${props.an}
          AB+ -  ${props.abp}
          AB- - ${props.abn}
          O+ - ${props.op}
          O- - ${props.on}
          ` ,
          title: `Hospital Name : ${props.hospitalname.toUpperCase()} 
          Address :  ${props.address}
          Phone No :  ${props.phoneno}
          Plasma Availability Details :  
          Updated - ${hours}  hours  ${minutes}  minutes ago   
          A+ -  ${props.ap}
          A- -  ${props.an}
          AB+ -  ${props.abp}
          AB- - ${props.abn}
          O+ - ${props.op}
          O- - ${props.on}
          
          `,
        }}
      >
        <div className="icon">
          <ShareIcon className="icc1"/>
        <h7 className="icc" >{t("Share")}</h7>
        </div>
      </RWebShare>
      </div>

  );
}

export default Hosp;
