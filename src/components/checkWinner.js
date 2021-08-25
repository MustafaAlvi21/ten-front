import React, { useState } from "react";
import ERC20 from '../ethereum/ERC20';
import Lottery from '../ethereum/Lottery';
import web3 from "../web3";
import BigNumber from "bignumber.js";

export default function CheckWinners({user}){
  const [status, setStatus] = useState('');
  const [matchingArr, setMatched] = useState([]);
  const [lotteryId, setLotteryId] = useState('');
  const [rewardDetails, setReward] = useState('');

  function match(s1,s2)
  {
    let count = -1;
    for(let i = 0; i<6; i++){
      if (s2.startsWith(s1.substring(0,i+1))){
        count++;
      }
      else{
        break;
      }
    }
    console.log(count)
    return count;
  }
  const viewReward = async (brkid, tid) => {
    try{
      const rew = await Lottery.methods.viewRewardsForTicketId(lotteryId, tid, brkid).call();
      setReward(`Your reward for TICKET ID: ${tid} in bracket no. ${brkid} is: ${rew}`);  
    }
    catch(e){
      console.log(e);
      alert('Failed');
    }
  }
  const checkWinner = async () => {
    try{
      var lid = document.getElementById('lotteryIdwinners').value;
      if (lid){
        setLotteryId(lid);
        const lotteryDetails = await Lottery.methods.viewLottery(lid).call();
        if (lotteryDetails[0] === "3"){
          const a = await Lottery.methods.viewUserInfoForLotteryId(user.address, lid, 0, 1000).call()
          console.log(a);
          if (a[0].length === 0){
            setStatus('You did not participated in this lottery');
          }
          else{
              let matching = [];
              var winning_num = lotteryDetails[12].substring(1,7).split("").reverse().join("");
              for (var i = 0; i < a[0].length; i++){
                let obj = {
                  matched: '',
                  ticketId: '' 
                }
                let num = a[1][i].substring(1,7).split("").reverse().join("");
                let matchedNums = match(num, winning_num);
                if (matchedNums > -1){
                  obj.matched = matchedNums;
                  obj.ticketId = a[0][i];
                  matching.push(obj);  
                }
              }
              if (matching.length === 0){
                setStatus('You participated in this lottery but lost.');
              }
              else{
                setMatched(matching);
                setStatus('You won in this lottery')  
              }
          }
        }
        else{
          setStatus('You participated in this lottery but lost.');
        }
      }
    }
    catch(e){
      console.log(e);
      alert('Failed');
    }
  }

  const claimRewardsAll = async (arr) => {
    let brackArr = [];
    let tId = [];
    arr.forEach(a => {
      brackArr.push(a.matched);
      tId.push(a.ticketId);
    })
    console.log(brackArr, tId);
    claimRewards(brackArr, tId);
  }

  const claimRewards = async (bracketsArr, ticketIds) => {
    try{
      const c = await Lottery.methods.claimTickets(lotteryId, ticketIds, bracketsArr).viewUserInfoForLotteryId({
        from: user.address
      });
      console.log(c);  
      alert('Success');  
    }
    catch(e){
      console.log(e);
      alert('Failed');
    }

  }

  return(
    <div style={{textAlign: 'center'}}>
      <hr />
      <input placeholder="Lottery ID" id="lotteryIdwinners"  />
      <button onClick={checkWinner}>Check Winner</button>
      {status && (
        <p>
          {status}
          {status === "You won in this lottery" && (
            <>
            <table style={{marginRight: 'auto', marginLeft: 'auto'}}>
              <tr>
                <th>Bracket</th>
                <th>Ticket Id</th>
                <th>Claim Button</th>
                <th>View Reward</th>
              </tr>
              {matchingArr.map((mtch, ind) => {
                return(
                <tr key={ind}>
                  <td>{mtch.matched}</td>
                  <td>{mtch.ticketId}</td>
                  <td>
                    <button onClick={() => claimRewards([mtch.matched], [mtch.ticketId])}>Claim</button>  
                  </td>
                  <td>
                    <button onClick={() => viewReward(mtch.matched, mtch.ticketId)}>View Reward</button>  
                  </td>
                </tr>
                );
              })}
            </table>
            <p>{rewardDetails}</p>
            <button onClick={claimRewardsAll}>Claim rewards!</button>
            </>
          )}
        </p>
      )}
      <hr />
    </div>
  );
}