import React from "react";
import './Searchhelp.css'

import './Search.css';

const SearchPage = () => {
  return (
   <div className="searchplasma">
     <div className="searchbar">
      <input type="search" className="searchfield" placeholder="Search by City"></input>
     </div>
     <p>Search by city name across Maharashtra eg : Chandrapur, Nagpur...</p>
     <h3 className="searchpla">Search</h3>

   </div>
  );
}

export default SearchPage;