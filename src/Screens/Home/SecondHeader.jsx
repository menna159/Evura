import React from 'react';

export const SecondHeader = () => {
  const HeaderElements = [ 'Makeup', 'SkinCare', 'Hair', 
    'Tools & Brushes', 'Bath & Body', 'Sale & Offers'
  ];

  return (
    <div className='bg-dark w-100 d-flex flex-wrap p-3 justify-content-around mt-5'>
      {HeaderElements.map((element, index) => (
        <a key={index} className='text-white me-4 m-0' style={{cursor:"pointer",textDecoration:"none"}}>{element}</a>
      ))}
    </div>
  );
};
