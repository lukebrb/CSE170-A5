import React from "react"

const Card = props => (
  <div 
    style = {{
      height: '150px',
      margin: '2%',
      border: 'solid',
      borderRadius: '20px',
      backgroundColor: '#fcf9d4',
      display: 'flex',

    }}
  >
    {/* Left side color */}
    <div 
      style = {{
        height: '100%',
        width: '40px',
        backgroundColor: props.color,
        borderRadius: '20px 0 0 20px'
      }}
    />
    
    {/* Main details on the card */}
    <div 
      style = {{
        padding: '3% 4%'
      }}
    >
      <h3>{props.id}</h3>
      <ul>
        <li>Total Time Slots: {props.totalSlots}</li>
        <li>Available Time Slots: {props.availSlots}</li>
      </ul>
      
    </div>
  </div>
)

export default Card;