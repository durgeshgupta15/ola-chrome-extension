import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = () => {

  const [totalRides, setTotalRides] = useState([]);
  const [completedRides, setCompletedRides] = useState([]);
  const [uncompletedRides, setUncompletedRids] = useState([]);
  const [totalSpentAmount, setTotalSpentAmount] = useState(0);
  const [totalBikeTaken, setTotalBikeTaken] = useState(0);
  const [totalMiniTaken, setTotalMiniTaken] = useState(0);
  const [totalSedanTaken, setTotalSedanTaken] = useState(0)

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };
    fetch('https://book.olacabs.com/pwa-api/rides', requestOptions)
      .then(response => response.json())
      .then(data => {
        setTotalRides(data.data.rides)
        let complete = data.data.rides.filter(item => item.status == 'COMPLETED')
        let totalBike = complete.filter(item => item.categoryId == 'bike')
        let totalMini = complete.filter(item => item.categoryId == 'mini')
        let totalSedan = complete.filter(item => item.categoryId == 'sedan')
        console.log('totalBike: ', totalBike)
        setTotalBikeTaken(totalBike)
        setTotalMiniTaken(totalMini)
        setTotalSedanTaken(totalSedan)

        setCompletedRides(complete);
        let unComplete = data.data.rides.filter(item => item.status == 'CANCELLED')

        setUncompletedRids(unComplete)

        let totalAmount = 0;
        complete.map(item => {
          let amount = Number(item.totalFare.split("₹")[1])
          totalAmount += amount
        })
        console.log('total amount: ', totalAmount)
        setTotalSpentAmount(totalAmount)
      });
  }, [])


  return (
    <div className="App">
      <div className='card-wrapper'>
        <div className='card'>
          <span>Total Rides</span>
          <span>{totalRides.length}</span>
        </div>
        <div className='card'>
          <span>Completed Rides</span>
          <span>{completedRides.length}</span>
        </div>
        <div className='card'>
          <span>Uncompleted Rides</span>
          <span>{uncompletedRides.length}</span>
        </div>
        <div className='card'>
          <span>Total Money Spent</span>
          <span>{totalSpentAmount}</span>
        </div>
        <div className='card'>
          <span>Total Bike Ride Taken</span>
          <span>{totalBikeTaken.length}</span>
        </div>
        <div className='card'>
          <span>Total Mini Ride Taken</span>
          <span>{totalMiniTaken.length}</span>
        </div>
        <div className='card'>
          <span>Total Sedan Ride Taken</span>
          <span>{totalSedanTaken.length}</span>
        </div>

      </div>
    </div>
  );
};

export default Popup;
