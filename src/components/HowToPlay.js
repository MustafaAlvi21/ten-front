import React from 'react'

export default function HowToPlay (){
  return(
    <div className="row" style={{background: 'rgb(250, 249, 250)', paddingTop: 100}}>
      <h1 style={{color: 'rgb(118, 69, 217)', fontWeight: 600, textAlign: 'center'}}>How to Play</h1>
      <p style={{color: 'rgb(40, 13, 95)', fontSize: 16, fontWeight: 400, lineHeight: '1.5', textAlign: 'center'}}>If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool. Simple!</p>
      <div className="row" style={{display: 'flex', justifyContent: 'space-around', padding: '50px 20px'}}>
        <div className="col-3" style={{padding: 24, background: 'rgb(255, 255, 255)', borderRadius: 10, boxShadow: 'rgb(238 234 244) 0px 0px 5px inset'}}>
          <p style={{float: 'right'}}>Step 1</p>
          <br />
          <h2 style={{fontWeight: 600, lineHeight: '1.1', marginBottom: 16, color: 'rgb(118, 69, 217)'}}>Buy Tickets</h2>
          <h6 style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Prices are set when the round starts, equal to 5 USD in CAKE per ticket</h6>
        </div>
        <div className="col-3" style={{padding: 24, background: 'rgb(255, 255, 255)', borderRadius: 10, boxShadow: 'rgb(238 234 244) 0px 0px 5px inset'}}>
          <p style={{float: 'right'}}>Step 1</p>
          <br />
          <h2 style={{fontWeight: 600, lineHeight: '1.1', marginBottom: 16, color: 'rgb(118, 69, 217)'}}>Buy Tickets</h2>
          <h6 style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Prices are set when the round starts, equal to 5 USD in CAKE per ticket</h6>
        </div>
        <div className="col-3" style={{padding: 24, background: 'rgb(255, 255, 255)', borderRadius: 10, boxShadow: 'rgb(238 234 244) 0px 0px 5px inset'}}>
          <p style={{float: 'right'}}>Step 1</p>
          <br />
          <h2 style={{fontWeight: 600, lineHeight: '1.1', marginBottom: 16, color: 'rgb(118, 69, 217)'}}>Buy Tickets</h2>
          <h6 style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Prices are set when the round starts, equal to 5 USD in CAKE per ticket</h6>
        </div>
      </div>
      <hr />
      <div className="row p-5">
        <div className="col">
          <h2 style={{color: 'rgb(118, 69, 217)', fontWeight: 600, lineHeight: '1.1'}}>Winning Criteria</h2>
          <h2 style={{fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', fontSize: 20}}>The digits on your ticket must match in the correct order to win.</h2>
          <p style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5', display: 'inline'}}>Here’s an example lottery draw, with two tickets, A and B.</p>
          <ul>
            <li style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Ticket A: The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize.</li>
            <li style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Ticket B: Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize.</li>
          </ul>
          <p style={{color: 'rgb(122, 110, 170)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’.</p>
        </div>
        <div className="col" />
        <br />
        <hr />
        <div className="row" style={{padding: '50px 200px'}}>
          <div className="col" style={{}}>
            <img src="./img/tombola.png" alt="tombola.png" width="250px" style={{float: 'right'}} />
          </div>
          <div className="col">
            <h2 style={{fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', marginBottom: 16}}>Still got questions?</h2>
            <h6 style={{color: 'rgb(40, 13, 95)', fontSize: 16, fontWeight: 400, lineHeight: '1.5'}}>Check our in-depth guide on <a href style={{color: 'rgb(31, 199, 212)', fontSize: 16, fontWeight: 600, lineHeight: '1.5'}}>how to play the PancakeSwap lottery!</a></h6>
          </div>
        </div>
      </div>
    </div>
  );
}