import React, { useState, useEffect } from 'react';

export default function Timer({date}){
  const calculateTimeLeft = () => {

    let year = new Date().getFullYear();

    const difference = +new Date(parseInt(date)) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    // if (!timeLeft[interval]) {
    //   return;
    // }
    if (index === 1){
      timerComponents.push(
        <>
          <span className="sec2-b golden-text-color">{timeLeft[interval]}</span>
          <span className="golden-text-color">h</span>        
        </>
      // {/* <span>
      //     {timeLeft[interval]}
      //   </span> */}
      );
    }
    else if (index === 2){
      timerComponents.push(
        // <span>
        //   :{timeLeft[interval]}
        // </span>
        <>
          <span className="sec2-b golden-text-color">{timeLeft[interval]+1}</span> 
          <span className="golden-text-color">m</span>
        </>
      );
    }
  });
  return (
    <p>
      {/* <h1>HacktoberFest {year} Countdown</h1> */}
      {/* <h2>With React Hooks!</h2> */}
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </p>
  );
}
