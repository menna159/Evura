import React, { useState, useRef, useEffect } from 'react';
import CategoryItems from '../../../Screens/Home/components/CategoryItem/CategoryItems';
import './SecondHeader.css';

export const SecondHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeBrand, setActiveBrand] = useState(null);
  const dropdownRef = useRef(null);

  const HeaderElements = [
    {
      title: 'Makeup',
      categories: [
        { name: 'MAC', subCategory: ['Lips', 'Face', 'Eyes'] },
        { name: 'TM', subCategory: ['Lips', 'Face', 'Eyes'] },
        { name: 'Makeup Forever', subCategory: ['Lips', 'Face', 'Eyes'] }
      ]
    },
    {
      title: 'SkinCare',
      categories: [
        { name: 'Neutrogena' },
        { name: 'The Ordinary' }
      ]
    },
    {
      title: 'Hair',
      categories: [
        { name: "L'Oreal" },
        { name: 'Pantene' }
      ]
    },
    {
      title: 'Tools & Brushes',
      categories: [
        { name: 'Brush Set' },
        { name: 'Blender' }
      ]
    },
    {
      title: 'Bath & Body',
      categories: [
        { name: 'Shower Gel' },
        { name: 'Scrub' }
      ]
    },
    {
      title: 'Sale & Offers',
      categories: [
        { name: '50% Off' },
        { name: 'Clearance' }
      ]
    }
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveIndex(null);
        setActiveBrand(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="second-header-wrapper mt-5">
      <div className="second-header-bar" ref={dropdownRef}>
        {HeaderElements.map((element, index) => (
          <div key={index} className="mainContainer">
            <span
              className="category-title"
              onClick={() => {
                setActiveIndex(activeIndex === index ? null : index);
                setActiveBrand(null);
              }}
            >
              {element.title}
            </span>

            {activeIndex === index && (
              <div className="dropdown-wrapper">
                <div className="categoryDropdown">
                  {element.categories.map((cat, i) => (
                    <div
                      key={i}
                      className={`brand-item ${activeBrand === cat.name ? 'active' : ''}`}
                      onClick={() =>
                        setActiveBrand(activeBrand === cat.name ? null : cat.name)
                      }
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>

                {activeBrand && (() => {
                  const selectedBrand = element.categories.find(
                    (cat) => cat.name === activeBrand
                  );
                  if (selectedBrand?.subCategory) {
                    return (
                      <div className="subCategoryDropdown">
                        <CategoryItems Items={selectedBrand.subCategory} />
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
