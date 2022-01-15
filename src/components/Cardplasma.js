import React from 'react'
import './Cardplasma.css'
function Cardplasma(props) {
    return (
        <div className="cccard">
        <h2 className="ccheading">{props.title}</h2>
        <h1 className="cnumbers"><span>{props.val}</span></h1>
        
    </div>
    )
}

export default Cardplasma
