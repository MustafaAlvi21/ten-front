import React from 'react';

export default function Jumbotron(){
  return(
    <div className="row header" style={{position: 'relative'}}>
    <img src="./img/bg-star.svg" alt="bg-star.svg" style={{position: 'absolute', width: '100vw', top: 0}} />
    <div className="col" style={{marginTop: 100, marginLeft: 120}}>
      <img src="./img/star-big.png" alt="star-big.png" style={{width: 90}} />
      <br />
      <img src="./img/star-small.png" alt="star-small.png" style={{width: 120}} />
      <br />
      <img src="./img/ticket-l.png" alt="ticket-l.png" style={{width: 120}} />
    </div>
    <div className="col-4 text-center" style={{marginTop: 100}}>
      <p className="header-p">The PancakeSwap Lottery</p>
      <h1 className="golden-text-color" style={{fontSize: 64, fontWeight: 600}}>$151,036</h1>
      <p className="header-p">in prizes!</p>
      <div className="header-ticket">
        <img src="./img/img.svg" alt="img.svg" />
        <button className="btn" id="header-ticket-btn"> Buy Tickets</button>
      </div>
    </div>
    <div className="col" style={{marginTop: 100, marginRight: 120}}>
      <img src="./img/three-stars.png" alt="three-stars.png" style={{float: 'right', width: 150}} />
      <img src="./img/ticket-r.png" alt="ticket-r.png" style={{float: 'right', width: 120}} />
    </div>
  </div>

  );
}