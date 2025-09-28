import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './sideBar.css';

function SideBar() {
  const links = [
    { name: 'Orders', path: '/Dashboard/OrdersAdmin' },
    { name: 'Add Products', path: '/Dashboard/AddProduct' },
    {name:  'Show and Update Products' , path:'/Dashboard/productsDashboard'},
    {name:"Categories Panel",path:"/Dashboard/CategoriesPanel"}
  ];

  return (
 <aside className="col-md-3 bg-dark text-white py-4 px-3 shadow-sm">
      <h3 className="mb-4 text-center fw-bold">My Dashboard</h3>
      <ul className="nav flex-column gap-3">
        {links.map((item, i) => (
          <li key={i} className="nav-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link fw-medium px-2 py-1 rounded hover-link ${
                  isActive ? 'active-link' : 'text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;
