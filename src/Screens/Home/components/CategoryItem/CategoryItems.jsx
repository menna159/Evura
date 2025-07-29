import React from 'react';
import './CategoryItems.css'; // Make sure to import the CSS if using a separate file

function CategoryItems({ Items }) {
  return (
    <div className="category-wrapper  px-3 py-4">
      {Items.map((item, index) => (
        <div key={index} className="category-item  ">
        <p>  {item}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryItems;
