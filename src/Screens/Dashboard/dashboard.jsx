import React from 'react'
import Card from './components/card'

function Dashboard() {
  return (
    <div className='d-flex flex-row'>

    <div className='d-flex flex-column col-4'>
        <h2>Dashboard</h2>
         <ul style={
            {
                listStyle:"none",
                height:"100vh",
            }
         }>
            <li> <a href="">Order</a></li>
            <li><a href="">Products</a></li>
            <li><a href="">Shipping</a></li>
            <li><a href="">Payments</a></li>
         </ul>
    </div>
    <div className='d-flex flex-column col-8'>
         <div > 
            <h2>Total Revenue</h2>
            <h2>45,000 EGP</h2>
         </div>
         <div className='d-flex flex-row gap-4'>
            <Card title='Shipped Orders' number="65" color="#6BAAFC"/>
            <Card title='New Orders' number='7' color='#F0ADFF'/>
        </div>
        </div>
        </div>
  )
}

export default Dashboard