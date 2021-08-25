import React, { useState } from 'react';
import Lottery from '../ethereum/Lottery';
import web3 from '../web3';

export default function ConnectWallet({connectMetamask, user}){
  const [status, setStatus] = useState('');
  const [matchingArr, setMatched] = useState([]);
  const [lotteryId, setLotteryId] = useState('');
  const [rewardDetails, setReward] = useState('');

  function match(s1,s2)
  {
    let count = -1;
    console.log(s1, s2, s2.startsW)
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
      setReward(`Your reward for TICKET ID: ${tid} in bracket no. ${brkid} is: ${parseFloat(web3.utils.fromWei(rew.toString())).toFixed(4)}`);  
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
        console.log(lotteryDetails);
        if (lotteryDetails[0] === "3"){
          const a = await Lottery.methods.viewUserInfoForLotteryId('0x58BB0c43eF9f4A34410adfbbB32D3Fc5b14d1cA7', lid, 0, 1000).call()
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
        else if (lotteryDetails[0] === "2"){
          setStatus('Lottery has not been drawn yet.');
        }
        else if (lotteryDetails[0] === "1"){
          setStatus('Lottery has not been closed yet.');
        }
        else if (lotteryDetails[0] === "0"){
          setStatus('Lottery has not been started yet.');
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
    <div className="row" style={{position: 'relative', flexDirection: 'column', WebkitBoxAlign: 'center', alignItems: 'center', zIndex: 1, background: 'linear-gradient(.73deg,rgb(49,61,92)0%,rgb(61,42,84)100%)', padding: '80px 0px'}}>
    <div className="col-6">
      <div className="row">
        <div className="col-3">
          <img src="./img/ticket-l.png" alt="ticket-l.png" style={{width: 120}} />
        </div>
        <div className="col text-center">
          {Object.keys(user).length > 0 ? (
            <>
              <input placeholder="lottery id" id="lotteryIdwinners"
              className="checkwinner-lotteryid"
              />

              <button onClick={checkWinner}
              style={{WebkitBoxAlign: 'center', marginBottom: '20px', alignItems: 'center', border: 0, borderRadius: 16, boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', height: 48, padding: '0px 24px', backgroundColor: 'rgb(31, 199, 212)', color: 'white', width: 190}}>
                Check Winner</button>
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
            </>
            ) : (
            <>
              <h2 style={{fontWeight: 600, lineHeight: '1.1', color: '#F4EEFF'}}>Connect your wallet</h2>
              <h2 style={{fontWeight: 600, lineHeight: '1.1', color: '#F4EEFF'}}>to check if you've won!</h2>
              <button
              onClick={connectMetamask}
              style={{WebkitBoxAlign: 'center', alignItems: 'center', border: 0, borderRadius: 16, boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', height: 48, padding: '0px 24px', backgroundColor: 'rgb(31, 199, 212)', color: 'white', width: 190}}>Connect
                Wallet</button>              
            </>
          )}
        </div>
        <div className="col-2">
          <img src="./img/ticket-r.png" alt="ticket-r.png" style={{width: 120}} />
        </div>
      </div>
    </div>
  </div>
  );
}