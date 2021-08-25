import React, { useState } from "react";
import ERC20 from '../ethereum/ERC20';
import Lottery from '../ethereum/Lottery';
import web3 from "../web3";
import BigNumber from "bignumber.js";

export default function BuyTicekts({lotteryDetails, lotteryId, user}){
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const [amount, setAmount] = useState(0);
  const generate_n_nums = (n) => {
    let a = [];
    for (var i = 0; i < n; i++){
      a.push(randomIntFromInterval(1000001,1999998))
    }
    return a;
  }

  const buytickets = async () => {
    const t = parseInt(document.getElementById('totaltickets').value);
    var rand_nums = generate_n_nums(t);
    console.log(t, rand_nums);
    try{
      const balance = await ERC20.methods.balanceOf(user.address).call();
      console.log(parseInt(balance), t*lotteryDetails.priceTicketInCake);

      if (parseInt(balance) > amount){
        console.log('here');
        var bgn = new BigNumber(amount);
        await ERC20.methods.approve(process.env.REACT_APP_LOTTERY_ADDRESS, bgn).send({from: user.address});
        const r = await Lottery.methods.buyTickets(t, rand_nums).send({
          from: user.address
        });
        console.log(r);
        alert('Success');
      }
      else{
        alert('Insufficient Funds');
      }
    }
    catch(e){
      console.log(e);
      alert('Failed');
    }
  }

  if (lotteryDetails[0] === "1"){
    return(
      <div style={{textAlign: 'center'}}>
        <hr />
        <h3>Buy Tickets of Lottery ID: {lotteryId}</h3>
        <input placeholder="Number of tickets" id="totaltickets" onChange={(e) => setAmount(e.target.value*lotteryDetails.priceTicketInCake)} />
        <button onClick={buytickets}>Buy Tickets</button>
        <p>Amount: {parseFloat(web3.utils.fromWei(amount.toString())).toFixed(4)} </p>
        <hr />
      </div>
    );
  }
  else{
    return(
      <div style={{textAlign: 'center'}}>
        <hr />
          <h3>Buy Tickets</h3>
          <h4>No Lottery available to take part in!</h4>
        <hr />
      </div>
    );
  }
}