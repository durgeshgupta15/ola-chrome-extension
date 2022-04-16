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
        <div className='card-container'>
          <div className="card">
            <h4><b>Total Rides</b></h4>
            <div className="container">
              <p>{totalRides.length}</p>
            </div>
          </div>

          <div className="card">
            <h4><b>Completed Rides</b></h4>
            <div className="container">
              <p>{completedRides.length}</p>
            </div>
          </div>

          <div className="card">
            <h4><b>Uncompleted Rides</b></h4>
            <div className="container">
              <p>{uncompletedRides.length}</p>
            </div>
          </div>

          <div className="card">
            <h4><b>Total Money Spent</b></h4>
            <div className="container">
              <p>₹ {totalSpentAmount}</p>
            </div>
          </div>

          <div className="card">
            <h4><b>Total Bike Ride Taken</b></h4>
            <div className="container">
              <p>{totalBikeTaken.length}</p>
            </div>
          </div>

          <div className="card">
            <h4><b>Total Mini Ride Taken</b></h4>
            <div className="container">
              <p>{totalMiniTaken.length}</p>
            </div>
          </div>

          <div className="card">
            <h4><b>Total Sedan Ride Taken</b></h4>
            <div className="container">
              <p>{totalSedanTaken.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
