import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { useAuth } from "../AuthContext";

function Requests(props) {
  var lon1 = (Number(props.hosplong) * Math.PI) / 180;
  var lon2 = (Number(props.long) * Math.PI) / 180;
  var lat1 = (Number(props.hosplat) * Math.PI) / 180;
  var lat2 = (Number(props.lat) * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;

  // calculate the result
  var d = c * r;

  var date1 = new Date(props.time);
  var date2 = new Date();

  var res = Math.abs(date2 - date1) / 1000;
  var hours = Math.floor(res / 3600) % 24;
  var minutes = Math.floor(res / 60) % 60;

  return hours>0 || minutes>15?null:(
    <div>
      <div className="r1">
        <div className="infos">
          <h6 className="displa">Requested {minutes} min ago</h6>
          <h6 className="displa1">
            Nearly {parseFloat(d).toFixed(2)} km away from Hospital
          </h6>
        </div>

        <h2 className="stt">Requested By - {props.name}</h2>
        <h2 className="stt">Address - {props.address}</h2>
        <h2 className="stt">Phone No - {props.phoneno}</h2>
      {
        props.check===false?null:(
        <button
          className="dirr"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              "https://maps.google.com?q=" + props.lat + "," + props.long
            );
          }}
        >
          Direction to Patient
        </button>
        )
}
      </div>
    </div>
  );
}

export default Requests;
