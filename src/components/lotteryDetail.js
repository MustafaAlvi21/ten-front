import React, { useState } from 'react';
import web3 from '../web3';
import Lottery from '../ethereum/Lottery';

export default function LotteryDetailC({user}){
  const [currentLotryId, setCurrentLotryId] = useState('');
  const [currentLotryDetails, setCurrentLotryDetails] = useState('');
  const [usrTicekts, setUsrTkts] = useState([]);
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  
  const getLotryId = async () => {
    const idd = document.getElementById('ltryid').value;
    if (idd){
      const r = await Lottery.methods.currentLotteryId().call();
      if (parseInt(r) >= parseInt(idd)){
        const lotteryDetails = await Lottery.methods.viewLottery(idd).call();
        const usrTicekts = await Lottery.methods.viewUserInfoForLotteryId(user.address, idd, 0, 1000).call();
        console.log(r);
        console.log(usrTicekts);
        console.log(lotteryDetails);
        setUsrTkts(usrTicekts);
        setCurrentLotryDetails(lotteryDetails);
        setCurrentLotryId(idd);
      }
      else{
        alert('Lottery doesnot exist')
      }
    }
    else{
      alert('Enter Id First');
    }
  }


  return(
    <div style={{textAlign: 'center'}}>
      <hr/>
      <h3>View Lottery Details</h3>
      <label>Enter Lottery Id: </label>
      <input id="ltryid" /> <button onClick={getLotryId}>Get Lottery Details</button>
      {currentLotryId && (
        <>
        <p>Lottery ID: {currentLotryId}</p>
        <p>Status: 
          {currentLotryDetails[0]  === '0' && 'Pending'}
          {currentLotryDetails[0]  === '1' && 'Open'}
          {currentLotryDetails[0]  === '2' && 'Closed'}
          {currentLotryDetails[0]  === '3' && 'Claimable'}
        </p>
        <p>Start Time: {timeConverter(currentLotryDetails[1])}</p>
        <p>End Time: {timeConverter(currentLotryDetails[2])}</p>
        <p>Ticket Price: {web3.utils.fromWei(currentLotryDetails[3])}</p>
        <p>Your tickets: {usrTicekts[0].length === 0 ? 'You donot have any tickets in this lottery' : usrTicekts[1].map(u => `${u}, `)} </p>
        <p>Rewards Breakdown:
        </p>
        <table style={{marginRight: 'auto', marginLeft: 'auto'}}>
            <tr>
              <th>Numbers Matched</th>
              <th>Percentage</th>
              <th>Tokens Per Bracket</th>
              <th>Number of winners in this Bracket</th>
            </tr>
            {currentLotryDetails[5].map((percnt, ind) => {
              return(
              <tr key={ind}>
                <td>First {ind+1} numbers matched</td>
                <td>{percnt/100}%</td>
                <td>{web3.utils.fromWei(((percnt/10000)*(currentLotryDetails[11] - (currentLotryDetails[11]*(currentLotryDetails[6]/10000)))).toString())}</td>
                <td>{currentLotryDetails[8][ind]}</td>
              </tr>);
            })}
          </table>
    
        </>
      )}
      <hr/>
      </div>

  );
}