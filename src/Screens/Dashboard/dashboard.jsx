import React from 'react';
import Card from './components/card';
import SideBar from './components/sideBar/sideBar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        
        {/* Sidebar */}
       
       <SideBar/>
        {/* Main Content */}
        <main className="col-9 px-5 py-4 bg-light">
             <Outlet />
          {/* <section className="mb-5">
            <h2 className="fw-bold mb-1">Total Revenue</h2>
            <h4 className="text-success">45,000 EGP</h4>
          </section>

          <section className="row g-4">
            <div className="col-md-6">
              <Card title="Shipped Orders" number="65" color="#6BAAFC" />
            </div>
            <div className="col-md-6">
              <Card title="New Orders" number="7" color="#F0ADFF" />
            </div>
          </section> */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
