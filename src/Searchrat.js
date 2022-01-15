import React, { useState ,useEffect} from "react";
import './Searchrat.css'
import { db } from "./Firebase";
import Ratdetails from './Ratdetails' ;
import { useTranslation } from "react-i18next";

import './Search.css';


const SearchPage = () => {

const [alldata,setalldata]=useState([]);
const [hospital,sethospital]=useState([]);
const [rat,setrat]=useState([]);

const {t}=useTranslation();

useEffect(() => {
  getalldata();
}, [])



  const getalldata=async()=>{

    const temp=[];

    await db.collection("hospitals")
    .get()
    .then((snapshot)=>{
      snapshot.forEach(item => {
            if(item.data().rat=="yes")
            temp.push(item.data());
      });

      setalldata(temp);

    })
  }

  const getdata=(e)=>{

    const newarray = alldata.filter((data) => {
      return data.city.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1||
      data.hospitalname.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
    });
    sethospital(newarray);
  }


  return (

    <div>
   <div className="searchplasma">
     <div className="searchbar">
      <input type="search"  onChange={getdata} className="searchfield" placeholder={t("Search by City or hospital name")}></input>
     </div>
     <p>{t("Search by city name across Maharashtra eg: Akola, Chandrapur, Nagpur...")}</p>

   </div>

    <div className="rat">
      {
        hospital.length===0?null:
        hospital.map((val,key)=>{
          return(
            <Ratdetails 
            key={key} hospitalname={val.hospitalname} 
                    address={val.address} phoneno={val.phoneno} 
                    type={val.type} lati={val.latitude}  longi={val.longitude}

            ></Ratdetails>
          );
        })
      }
      
    

    </div>
   </div>
  );
}

export default SearchPage;