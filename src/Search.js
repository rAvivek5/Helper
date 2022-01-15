import React from "react";
import Hosp from "./Hosp";
import Hospitaldata from "./Hospital";
import './Search.css';

const SearchPage = () => {
  return (
   <div className="search">
     <div className="searchbar">
      <input type="search" className="searchfield" placeholder="Search by City"></input>
      <p>Search by city name across Maharashtra eg : Chandrapur, Nagpur...</p>
     </div>

     <div className="filter">
       <div className="fil">
         <h3 className="namefilter">Recently Updated</h3>
         <h3 className="namefilter">With Oxygen</h3>
         <h3 className="namefilter">Without Oxygen</h3>
         <h3 className="namefilter">ICU</h3>
         <h3 className="namefilter">ICU With Ventilator</h3>
       </div>

       <div className="clearfilter">
         <h3 className="cf">Clear Filters</h3>
       </div>


     </div>

     <h3 className="searchpla" onClick={()=>{
            
      
     }}>Search</h3>

     

   </div>
  );
}

export default SearchPage;