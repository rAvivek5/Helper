import React from "react";
import "./Ratdetails.css";
import {useTranslation} from 'react-i18next';

function Hosp(props) {
  const {t}=useTranslation();

  return (
    <div className="srcrat">
      <h2>{props.hospitalname}</h2>
      <h3 className="mobno">{props.phoneno}</h3>
      <h4 className="address">
      {props.address.toUpperCase()}
      </h4>

      <div className="dir">
        <h3 className="dirbutton" onClick={()=>{
           window.open("https://maps.google.com?q="+props.lati+","+props.longi );
        }}>{t("Directions")}</h3>
       
      </div>

    </div>
  );
}

export default Hosp;
