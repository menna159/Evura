import React from 'react';

function Card({ title, number, color }) {
  return (
    <div
      className="p-4 rounded shadow-sm d-flex flex-column"
      style={{ backgroundColor: color, color: '#fff', minHeight: '150px' }}
    >
      <h5>{title}</h5>
      <h2 className='align-self-end'>{number}</h2>
    </div>
  );
}

export default Card;
