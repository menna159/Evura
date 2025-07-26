import React from 'react'

export const Card = ({source,onClick}) => {
  return (
  <div 
        onClick={onClick}
        className="card border-0"
        style={{
          width: '17rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          cursor:"pointer",
          minHeight:"0.5rem"
        }}
      >
{/* <p className="card-text text-center fw-bold">{title}</p> */}

        <img
  src={source}
  className="card-img-top"
  alt="Cosmetic Product"
  style={{
    width: "100%",
    height: "17rem",
    objectFit: "cover"
  }}
/>

      </div>
  )
}
