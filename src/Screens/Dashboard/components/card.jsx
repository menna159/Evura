import React from 'react'

function Card({title,number,color}) {
  return (
     <div className="d-flex flex-column" style={{
            borderRaduis:"1rem",
            width:"25%",
            backgroundColor:color,
            padding:"0.5rem"
         }}>
            <h5 style={{alignSelf:"start"}}>{title}</h5>
            <h5 style={{alignSelf:"end"}}>{number}</h5>
         </div>
  )
}

export default Card