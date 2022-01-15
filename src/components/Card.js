import React from 'react'
import './Card.css'

function Card(props) {
    return (
        <div className="ccard">
            <h2 className="cheading">{props.title}</h2>
            <h1 className="numbers"><span>{props.data1}</span>/{props.data2}</h1>
            
        </div>
    )
}

export default Card
