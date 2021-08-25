import React, { useEffect, useState } from 'react';
import ERC20 from '../ethereum/ERC20';
import Lottery from '../ethereum/Lottery';
import web3 from "../web3";
import BigNumber from "bignumber.js";
import Timer from './timer';


export default function LiveLottery({user}){
  const [currentLotryId, setCurrentLotryId] = useState('');
  const [currentLotryDetails, setCurrentLotryDetails] = useState('');

  const getLotryId = async () => {
    const r = await Lottery.methods.currentLotteryId().call();
    const lotteryDetails = await Lottery.methods.viewLottery(r).call();
    console.log("Live Lottery ID:", r);
    console.log("Live Lottery Details:", lotteryDetails);
    // console.log(+new Date(parseInt(lotteryDetails[])) - +new Date();)
    setCurrentLotryId(r);
    setCurrentLotryDetails(lotteryDetails);
  }
  const setMaxNumberTicketsPerBuy = () => {
    var maxPrice = document.getElementById('maxticketperbuy').value;
    if (maxPrice){
      alert('Success');
    }
    else{
      alert('Failed');
    }
  }

  useEffect(() => {
    getLotryId();
  }, []);

  const setMinAndMaxTicketPriceInCake = async () => {
    let minPrice = document.getElementById('minticket').value;
    let maxPrice = document.getElementById('maxticket').value;
    console.log(minPrice, maxPrice);
    if (minPrice && maxPrice){
      console.log(web3.utils.toWei(minPrice), web3.utils.toWei(maxPrice));
      const r = await Lottery.methods.setMinAndMaxTicketPriceInCake(web3.utils.toWei(minPrice), web3.utils.toWei(maxPrice)).send({
        from: user.address
      });
      console.log(r);
      alert('Success');
    }
    else{
      alert('Failed');
    }
  }

  const addAddress = async () => {
    const opaddress = document.getElementById('opaddress').value;
    const treasuryaddress = document.getElementById('treasuryaddress').value;
    const injectoraddress = document.getElementById('injectoraddress').value;
    if (opaddress && treasuryaddress && injectoraddress){
      const r = await Lottery.methods.setOperatorAndTreasuryAndInjectorAddresses(opaddress, treasuryaddress, injectoraddress).send({from: user.address});
      console.log(r);
      alert('Success');
    }
    else{
      alert('Failed');
    }
  }

  const closeLottery = async () => {
    if (currentLotryDetails[0] === "1"){ // if open
      console.log(parseInt(currentLotryId));
      const r = await Lottery.methods.closeLottery(currentLotryId).send({
        from: user.address
      });
      console.log(r);
      getLotryId();
      alert('Success');
    }
    else{
      alert(`Failed: Lottery not open, status: ${currentLotryDetails[0]}`);
    }
  }
  const drawLottery = async () => {
    if (currentLotryDetails[0] === "2"){ // if closed
      const r = await Lottery.methods.drawFinalNumberAndMakeLotteryClaimable(currentLotryId, true).send({
        from: user.address
      });
      console.log(r);
      getLotryId();
      alert('Success');
    }
    else{
      alert(`Failed: Lottery not closed, status: ${currentLotryDetails[0]}`);
    }
  }

  const startLottery = async () => {
    var divisor = 10;
    var endtime = document.getElementById('endtime').value;
    var ticketpriceincake = document.getElementById('ticketpriceincake').value;
    var treasuryfee = document.getElementById('treasuryfee').value;
    var bone = parseInt(document.getElementById('bone').value);
    var btwo = parseInt(document.getElementById('btwo').value);
    var bthree = parseInt(document.getElementById('bthree').value);
    var bfour = parseInt(document.getElementById('bfour').value);
    var bfive = parseInt(document.getElementById('bfive').value);
    var bsix = parseInt(document.getElementById('bsix').value);
    console.log(endtime);
    let d = new Date(endtime);
    d = d.getTime()/1000;
    if (bone+btwo+bthree+bfour+bfive+bsix === 100){
      try{
        console.log(d, web3.utils.toWei(ticketpriceincake), divisor, [bone*100, btwo*100, bthree*100, bfour*100, bfive*100, bsix*100], parseInt(treasuryfee)*100)
        const r = await Lottery.methods.startLottery(d, web3.utils.toWei(ticketpriceincake), divisor, [bone*100, btwo*100, bthree*100, bfour*100, bfive*100, bsix*100], parseInt(treasuryfee)*100).send({
          from : user.address
        })
        console.log(r);
        getLotryId();
        alert('Success');  
      }
      catch(e){
        console.log(e);
        alert('Failed');
      }
    }
    else{
      alert('Breakdown sum not equal to 100')
    }
  }

  const timeNotEnd = (t) => {
    let currTime = new Date();
    currTime = currTime.getTime()/1000;
    if (parseInt(currTime) < parseInt(t)){
      return true;
    }
    else{
      return false;
    }
  }

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    console.log(a);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ', ' + year + ', ' + hour + ':' + min ;
    return time;
  }

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


  const buyTickets = async () => {
    if (Object.keys(user).length === 0){
      alert('Connect Wallet first')
    }
    else{
      const t = parseInt(document.getElementById('totaltickets').value);
      var rand_nums = generate_n_nums(t);
      console.log(t, rand_nums);
      try{
        const balance = await ERC20.methods.balanceOf(user.address).call();
        console.log(parseInt(balance), t*currentLotryDetails.priceTicketInCake);
  
        if (parseInt(balance) > parseInt(t*currentLotryDetails.priceTicketInCake)){
          console.log('here');
          var bgn = new BigNumber(t*currentLotryDetails.priceTicketInCake);
          console.log(bgn);
          let as = await ERC20.methods.approve(process.env.REACT_APP_LOTTERY_ADDRESS, bgn).send({from: user.address});
          console.log(user.address, as, t, );
          const r = await Lottery.methods.buyTickets(currentLotryId, rand_nums).send({
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
  }
  return(
      <div className="row" style={{marginTop: 200}}>
        {currentLotryDetails[0] === "1" && timeNotEnd(currentLotryDetails.endTime) ? (
          <>
          <h2 style={{fontSize: 32, fontWeight: 600, lineHeight: '1.1', marginBottom: 24, textAlign: 'center', color: 'rgb(255, 255, 255)'}}>
            Get your tickets now!</h2>
          <p className="sec2-a text-center" style={{marginBottom: 40}}>
            <Timer date={parseInt(currentLotryDetails[2])*1000} />
            {/* <span className="sec2-b golden-text-color">7</span>
            <span className="golden-text-color">h</span>
            <span className="sec2-b golden-text-color">53</span> 
            <span className="golden-text-color">m</span> */}
            until the draw</p>
            <div className="row d-flex" style={{justifyContent: 'center'}}>
              <div className="card col-10  px-0" style={{borderRadius: 15, maxWidth: 800}}>
                <h5 className="card-header" style={{padding: '1.25rem', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%)', borderRadius: '15px 15px 0px 0px'}}>
                  <span style={{fontWeight: 600, fontSize: 20}}>Next Draw</span>
                  <span style={{}}>#{currentLotryId} | Draw: {(timeConverter(currentLotryDetails.endTime))}</span>
                </h5>
                <div className="card-body" style={{padding: '0%'}}>
                  <div className="row" style={{padding: '1.25rem'}}>
                    <div style={{display: 'inline-flex', width: 130}}>
                      <h4 className="card-title" style={{color: 'black'}}>Prize Pot</h4>
                    </div>
                    <div className="col" style={{display: 'inline-flex', position: 'relative'}}>
                      <h1 className="w-100" style={{color: 'rgb(118, 69, 217)', fontWeight: 600, lineHeight: 1, fontSize: 40}}>
                        ~$155,535</h1>
                      <sub style={{position: 'absolute', bottom: 0}}>{parseFloat(web3.utils.fromWei(currentLotryDetails[11])).toFixed(4)} CAKE</sub>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row" style={{padding: '1.25rem'}}>
                    <div style={{display: 'inline-flex', width: 130}}>
                      <h4 className="card-title" style={{color: 'black'}}>Your tickets</h4>
                    </div>
                    <div className="col" style={{display: 'inline-flex', position: 'relative'}}>
                      <input placeholder="Enter number of tickets" id="totaltickets" />
                      <button onClick={buyTickets}  className="btn" style={{WebkitBoxAlign: 'center', alignItems: 'center', border: '1px solid', boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s opacity 0.2s ease 0s', height: 48, padding: '0px 24px', backgroundColor: 'rgb(31 199 212)', color: 'white', maxWidth: 280}}>Buy
                        Tickets</button>
                    </div>
                  </div>
                  <br />
                  <hr style={{margin: '0%'}} />
                  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{textAlign: 'center', WebkitBoxAlign: 'center', alignItems: 'center', border: 0, borderRadius: 16, cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', width: '100%', height: 60, padding: '0px 24px', backgroundColor: 'transparent', color: 'rgb(31, 199, 212)', boxShadow: 'none'}}>
                    Details
                    <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM flwtrA">
                      <path fill="rgb(31, 199, 212)" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z">
                      </path>
                    </svg>
                  </button>
                  <div className="collapse" id="collapseExample" style={{}}>
                    <div className style={{backgroundColor: '#edeff4', padding: '1.25rem', borderRadius: 16}}>
                      <p style={{color: 'rgb(40, 13, 95)', fontWeight: 400, lineHeight: '1.5', marginBottom: 24, fontSize: 14}}>
                        Match the winning number in the same order to share prizes. Current
                        prizes up for grabs:</p>
                      <div className="row">
                        {currentLotryDetails.cakePerBracket.map((v, i) => {
                          return(
                            <div className="col-3" key={i}>
                              <div style={{color: 'rgb(118, 69, 217)', fontSize: 16, fontWeight: 600, lineHeight: '1.5'}}>
                                Match {i+1 === 6 ? 'all' : 'first'} {i+1}</div>
                              <div style={{margin: 0, padding: 0, border: 0, fontSize: '100%', verticalAlign: 'baseline'}}>
                                {(parseFloat(web3.utils.fromWei((v).toString()))).toFixed(3)} CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: 12}}>
                                ~$3,164</div>
                            </div>  
                          );
                        })}
                        
                        <div className="col-3">
                          <div style={{color: 'rgb(237, 75, 158)', fontSize: 16, fontWeight: 600, lineHeight: '1.5'}}>
                            Burn</div>
                          <div style={{margin: 0, padding: 0, border: 0, fontSize: '100%', verticalAlign: 'baseline'}}>
                            147 CAKE</div>
                          <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: 12}}>
                            ~$3,164</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </>
        ) : (
          <h2 style={{fontSize: 32, fontWeight: 600, lineHeight: '1.1', marginBottom: 24, textAlign: 'center', color: 'rgb(255, 255, 255)'}}>
            Get your tickets when next draw starts!</h2>
        )}
        {user.address === process.env.REACT_APP_ADMIN_ADDRESS.toLowerCase() ? (
        <div className="card col-10  px-0 mx-auto" style={{borderRadius: 15, maxWidth: 800}}>
        <div className="card-body text-center">
          <div className="form-group mb-3" style={{position: 'relative'}}>
            <label className="form-group-label" htmlFor="minticket">Minimum Price Per Ticket</label>
            <input className="form-group-input" placeholder="Min Ticekt Price" id="minticket" type="number" />
          </div>
          <div className="form-group mb-3" style={{position: 'relative'}}>
            <label className="form-group-label" htmlFor="maxticket">Minimum Price Per Ticket</label>
            <input className="form-group-input" placeholder="Max Ticekt Price" id="maxticket" type="number" /><br/>
          </div>
          <button className="btn btn-primary" style={{position: 'relative'}} onClick={setMinAndMaxTicketPriceInCake}>
            setMinAndMaxTicketPriceInCake
          </button>
          {/* <hr/>
          <div className="form-group text-center mb-3" style={{position: 'relative'}}>
            <label htmlFor="maxticketperbuy">Max Tickets Per Buy: </label>
            <input placeholder="Max Ticekt Per Buy" id="maxticketperbuy" type="number" />
          </div>
          <button onClick={setMaxNumberTicketsPerBuy} className="btn btn-primary" style={{position: 'relative'}}>
            setMaxNumberTicketsPerBuy              
          </button> */}
          <hr/>
          <div className="form-group mb-3" style={{position: 'relative'}}>
            <label htmlFor="injectoraddress">Injector Address: </label>
            <input placeholder="Injector Address" id="injectoraddress" />
          </div>
          <div className="form-group mb-3" style={{position: 'relative'}}>
            <label htmlFor="treasuryaddress">Treasury Address: </label>
            <input placeholder="Treasury Address" id="treasuryaddress" />
          </div>
          <div className="form-group mb-3" style={{position: 'relative'}}>
            <label htmlFor="opaddress">Operator Address: </label>
            <input placeholder="Operator Address" id="opaddress" />
          </div>
          <button onClick={addAddress} className="btn btn-primary" style={{position: 'relative'}}>
            setOperatorAndTreasuryAndInjectorAddresses
          </button>
          <hr/>
          {(currentLotryDetails[0] === "3" | currentLotryDetails[0] === "0") ? (
          <div>
            <h4>Start Lottery:</h4>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="endtime">Lottery End Time: </label>
              <input placeholder="End Time" id="endtime" type="datetime-local" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="ticketpriceincake">Ticket Price: </label>
              <input placeholder="Ticket Price in Cake" id="ticketpriceincake" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="treasuryfee">Treasury Fee: </label>
              <input placeholder="Treasury Fee" id="treasuryfee" />
            </div>

            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="bone">Breakdown One: </label>
              <input placeholder="Breakdown One" id="bone" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="btwo">Breakdown Two: </label>
              <input placeholder="Breakdown Two" id="btwo" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="bthree">Breakdown Three: </label>
              <input placeholder="Breakdown Three" id="bthree" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="bfour">Breakdown Four: </label>
              <input placeholder="Breakdown Four" id="bfour" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="bfive">Breakdown Five: </label>
              <input placeholder="Breakdown Five" id="bfive" />
            </div>
            <div className="form-group mb-3" style={{position: 'relative'}}>
              <label htmlFor="bsic">Breakdown Six: </label>
              <input placeholder="Breakdown Six" id="bsix" />
            </div>
            

            <button onClick={startLottery} className="btn btn-primary" style={{position: 'relative'}}>
              startLottery
            </button>

          </div>
          ) : (<></>)}
          {currentLotryDetails[0] === "1" && (
            <div>
              <h4>Close Lottery ID: {currentLotryId}</h4>
              <button onClick={closeLottery} className="btn btn-primary" style={{position: 'relative'}}>
                Close Lottery
              </button>
            </div>
          )}
          {currentLotryDetails[0] === "2" && (
            <div>
              <h4>Draw Lottery ID: {currentLotryId}</h4>
              <button onClick={drawLottery} className="btn btn-primary" style={{position: 'relative'}}>
                Draw Lottery
              </button>
            </div>
          )}
        </div>
      </div>

        ) : (<></>)}
    </div>
    );
  }
// }