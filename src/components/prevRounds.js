import React, { useEffect, useState } from 'react';
import Lottery from '../ethereum/Lottery';
import web3 from '../web3';

export default function PreviousRounds(){
  const [currentLotryId, setCurrentLotryId] = useState('');
  const [currentLotryDetails, setCurrentLotryDetails] = useState('');
  const [latest, setLatest] = useState('');

  const setLatestID = async () => {
    const r = await Lottery.methods.currentLotteryId().call();
    setLatest(r);
  }

  const getLotryId = async () => {
    const r = await Lottery.methods.currentLotteryId().call();
    let lotteryDetails = await Lottery.methods.viewLottery(r).call();
    console.log("Live Lottery ID:", r);
    if (lotteryDetails[0] === "3"){
      lotteryDetails = await Lottery.methods.viewLottery(parseInt(r)).call();
      console.log("Live Lottery Details:", lotteryDetails);
      setCurrentLotryId(r);
      setCurrentLotryDetails(lotteryDetails);  
    }
    else{
      if (parseInt(r) !== 1){
        lotteryDetails = await Lottery.methods.viewLottery(r).call();
        if (lotteryDetails[0] === "3"){
          console.log("Live Lottery Details:", lotteryDetails);
          setCurrentLotryId(r);
          setCurrentLotryDetails(lotteryDetails);  
        }
      }
    }
    // console.log(+new Date(parseInt(lotteryDetails[])) - +new Date();)
  }
  
  useEffect(() => {
    getLotryId();
    setLatestID();
  }, []);

  const winNumber = (index) => {
    const Loading = 'LOADING';
    if (currentLotryDetails[12]){
      return currentLotryDetails[12].substring(1,7).split('').reverse().join('')[index];    
    }
    else{
      return Loading[index]
    }
  }


  if (currentLotryDetails){
    return(
      <div className="row text-center mx-auto" style={{display: 'flex', justifyContent: 'center', padding: 100, width: '100%', background: 'linear-gradient(rgb(203, 215, 239) 0%, rgb(154, 159, 208) 100%)'}}>
      <h1 style={{fontSize: 40, fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', marginBottom: 24}}>
        Finished Rounds</h1>
      <div style={{backgroundColor: 'rgb(238, 234, 244)', borderRadius: 16, display: 'inline-flex', border: '1px solid rgb(215, 202, 236)', width: 'auto', padding: '0%'}}>
        <button style={{boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', WebkitBoxAlign: 'center', alignItems: 'center', border: 0, borderRadius: 16, cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', height: 32, padding: '0px 16px', backgroundColor: 'rgb(122, 110, 170)', color: 'rgb(255, 255, 255)'}}>All
          History</button>
        <button style={{boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', WebkitBoxAlign: 'center', alignItems: 'center', border: 0, borderRadius: 16, cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', height: 32, padding: '0px 16px', backgroundColor: 'rgb(122, 110, 170)', color: 'rgb(255, 255, 255)'}}>Your
          History</button>
      </div>
      {!currentLotryId ? (
        <div className="row d-flex" style={{textAlign: 'left', justifyContent: 'center', marginTop: 30}}>
          <div className="card col-10" style={{borderRadius: 15, maxWidth: 800}}>
              <h2>No Finished Rounds</h2>
          </div>
        </div>
      ) : (
        <div className="row d-flex" style={{textAlign: 'left', justifyContent: 'center', marginTop: 30}}>
          <div className="card col-10" style={{borderRadius: 15, maxWidth: 800}}>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: 10}}>
              <div>
                <span style={{color: 'rgb(40, 13, 95)', fontSize: 20, fontWeight: 600}}>Round</span>
                <input type="text" value={currentLotryId} readOnly style={{width: 60, height: '100%', padding: '4px 16px', backgroundColor: 'rgb(238, 234, 244) !important', border: 'none', borderRadius: 16, boxShadow: 'none', color: 'rgb(40, 13, 95)', fontWeight: 600, textAlign: 'center'}} />
              </div>
              <div>
                <div className="sc-jSFjdj sc-gKAaRy kJmatq togOu">
                  <button className="sc-hKFxyN fgKIwT sc-eCApnc sc-lcmwCJ fAYovO lLOUy" scale="sm" style={{width: 32, border: 'none', backgroundColor: 'transparent'}}>
                    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                      <path d="M19 11H7.82998L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z">
                      </path>
                    </svg>
                  </button>
                  <button className="sc-hKFxyN fgKIwT sc-eCApnc sc-lcmwCJ fAYovO lLOUy pancake-button--disabled" scale="sm" disabled style={{width: 32, border: 'none', backgroundColor: 'transparent'}}>
                    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                      <path d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z">
                      </path>
                    </svg>
                  </button>
                  <button className="sc-hKFxyN jYLfuR sc-eCApnc sc-lcmwCJ fAYovO lLOUy pancake-button--disabled" scale="sm" disabled style={{width: 32, border: 'none', backgroundColor: 'transparent'}}>
                    <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                      <path d="M3 13.1835H14.17L9.29 18.0635C8.9 18.4535 8.9 19.0935 9.29 19.4835C9.68 19.8735 10.31 19.8735 10.7 19.4835L17.29 12.8935C17.68 12.5035 17.68 11.8735 17.29 11.4835L10.71 4.88347C10.32 4.49347 9.69 4.49347 9.3 4.88347C8.91 5.27347 8.91 5.90347 9.3 6.29347L14.17 11.1835H3C2.45 11.1835 2 11.6335 2 12.1835C2 12.7335 2.45 13.1835 3 13.1835Z">
                      </path>
                      <path d="M20 5.18347C20.5523 5.18347 21 5.63119 21 6.18347V18.1835C21 18.7358 20.5523 19.1835 20 19.1835C19.4477 19.1835 19 18.7358 19 18.1835V6.18347C19 5.63119 19.4477 5.18347 20 5.18347Z">
                      </path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div style={{color: 'rgb(40, 13, 95)', fontSize: 10, fontWeight: 400}}>
              <br />
              Drawn {(new Date(currentLotryDetails.endTime*1000)).toString()}
            </div>
            <hr />
            <div className="card-body" style={{padding: '0%'}}>
              <div className="row py-2">
                <div className="col-4" style={{display: 'inline-flex', width: 'auto', fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', marginBottom: 24}}>
                  <h4 className="card-title" style={{color: 'black'}}>Winning Number</h4>
                </div>
                <div className="col" style={{display: 'inline-flex', position: 'relative'}}>
                  <div className="sc-jSFjdj sc-gKAaRy hLjwZs gwtaiH" style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                    <div className="sc-jSFjdj sc-gKAaRy hUVrOV ViahK" style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                      <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                        <svg viewBox="0 0 32 32" width="50px" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <circle cx={16} cy={16} r={16} fill="#D750B2" />
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black" />
                          </g>
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white" />
                          </g>
                        </svg>
                        <div className="sc-cCwPlL kUKRLv" style={{position: 'absolute', top: 0, left: 13}}>
                          <div fontSize="32px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb lkBYFM" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5', fontSize: 32}}>{winNumber(0)}</div>
                        </div>
                      </div>
                      <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                        <svg viewBox="0 0 32 32" width="50px" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <circle cx={16} cy={16} r={16} fill="#A881FC" />
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black" />
                          </g>
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white" />
                          </g>
                        </svg>
                        <div className="sc-cCwPlL kUKRLv" style={{position: 'absolute', top: 0, left: 13}}>
                          <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb kOVKjB" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5', fontSize: 32}}>{winNumber(1)}</div>
                        </div>
                      </div>
                      <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                        <svg viewBox="0 0 32 32" width="50px" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <circle cx={16} cy={16} r={16} fill="#1FC7D4" />
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black" />
                          </g>
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white" />
                          </g>
                        </svg>
                        <div className="sc-cCwPlL kUKRLv" style={{position: 'absolute', top: 0, left: 13}}>
                          <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb lkBYFM" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5', fontSize: 32}}>{winNumber(2)}</div>
                        </div>
                      </div>
                      <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                        <svg viewBox="0 0 32 32" width="50px" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <circle cx={16} cy={16} r={16} fill="#31D0AA" />
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black" />
                          </g>
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white" />
                          </g>
                        </svg>
                        <div className="sc-cCwPlL kUKRLv" style={{position: 'absolute', top: 0, left: 13}}>
                          <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb kOVOlg" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5', fontSize: 32}}>{winNumber(3)}</div>
                        </div>
                      </div>
                      <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                        <svg viewBox="0 0 32 32" width="50px" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <circle cx={16} cy={16} r={16} fill="#93D45A" />
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black" />
                          </g>
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white" />
                          </g>
                        </svg>
                        <div className="sc-cCwPlL kUKRLv" style={{position: 'absolute', top: 0, left: 13}}>
                          <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb ikvoTX" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5', fontSize: 32}}>{winNumber(4)}</div>
                        </div>
                      </div>
                      <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                        <svg viewBox="0 0 32 32" width="50px" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <circle cx={16} cy={16} r={16} fill="#FFC43C" />
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13245C28.9191 8.87189 28.5505 17.2575 23.2373 22.5707C17.528 28.28 8.27148 28.28 2.56223 22.5707C2.2825 22.291 2.01648 22.0028 1.76416 21.7068C4.02814 27.3487 9.54881 31.3327 16 31.3327C24.4683 31.3327 31.3332 24.4678 31.3332 15.9995C31.3332 10.6079 28.5504 5.86622 24.3428 3.13245Z" fill="black" />
                          </g>
                          <g opacity="0.1" style={{mixBlendMode: 'multiply'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M25.7714 4.18262C30.6309 10.2119 30.2608 19.061 24.661 24.6608C19.0616 30.2602 10.2134 30.6307 4.18408 25.7722C6.99655 29.1689 11.2456 31.3329 16.0001 31.3329C24.4685 31.3329 31.3334 24.468 31.3334 15.9997C31.3334 11.2446 29.1689 6.99508 25.7714 4.18262Z" fill="black" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white" />
                          </g>
                          <g style={{mixBlendMode: 'soft-light'}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.10087 9.51443C3.77283 5.93689 6.78541 3.11142 10.4922 1.68435C10.5461 1.73247 10.5988 1.78231 10.6504 1.83387C12.4839 3.6674 10.912 5.74432 8.66157 7.99477C6.41112 10.2452 4.33429 11.817 2.50076 9.98347C2.3535 9.83621 2.22025 9.67943 2.10087 9.51443Z" fill="white" />
                          </g>
                        </svg>
                        <div className="sc-cCwPlL kUKRLv" style={{position: 'absolute', top: 0, left: 13}}>
                          <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb lkBYFX" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5', fontSize: 32}}>{winNumber(5)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {latest === currentLotryId ? (
                <div className="col sc-fKgJPI evNcQI sc-bcuVfI eRpVmx" style={{position: 'absolute', right: '-10px', top: 90, zIndex: 1, backgroundColor: 'rgb(118, 69, 217)', color: 'white', margin: 0, padding: '8px 0px', textAlign: 'center', transform: 'translateX(30%) translateY(0%) rotate(45deg)', transformOrigin: 'left top', width: 96}}>
                  <div title="Latest">Latest</div>
                </div>
                ) : (
                  <></>
                )}
              </div>
              <br />
              <br />
              <br />
              <hr style={{margin: '0%'}} />
              <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" style={{textAlign: 'center', WebkitBoxAlign: 'center', alignItems: 'center', border: 0, borderRadius: 16, cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: 16, fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: 0, transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', width: '100%', height: 60, padding: '0px 24px', backgroundColor: 'transparent', color: 'rgb(31, 199, 212)', boxShadow: 'none'}}>Details
                <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM flwtrA">
                  <path fill="rgb(31, 199, 212)" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z">
                  </path>
                </svg>
              </button>
              <div className="collapse" id="collapseExample1">
                <div className="row py-4" style={{backgroundColor: '#edeff4', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, padding: 10}}>
                  <div className="col-4" style={{display: 'flex', flexDirection: 'column', padding: '0%'}}>
                    <div style={{display: 'inline-flex', width: 130}}>
                      <h4 className="card-title" style={{color: 'black'}}>Prize Pot</h4>
                    </div>
                    <div className="col" style={{display: 'inline-flex', position: 'relative'}}>
                      <h1 className="w-100" style={{color: 'rgb(118, 69, 217)', fontWeight: 600, lineHeight: 1, fontSize: 40}}>
                        ~${web3.utils.fromWei(currentLotryDetails[11])}
                      </h1>
                      {/* <sub style={{position: 'absolute', bottom: 0, fontSize: 15}}>Total players this round: 1732</sub> */}
                    </div>
                  </div>
                  <div className="col">
                    <p style={{color: 'rgb(40, 13, 95)', fontWeight: 400, lineHeight: '1.5', marginBottom: 24, fontSize: 14}}>
                      Match the winning number in the same order to share prizes. Current prizes up
                      for grabs:</p>
                    <div className="row">
                      {currentLotryDetails.cakePerBracket.map((v, i) => {
                        return(
                          <div className="col-3" key={i}>
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: 16, fontWeight: 600, lineHeight: '1.5'}}>
                              Match first {i+1}</div>
                            <div style={{margin: 0, padding: 0, border: 0, fontSize: '100%', verticalAlign: 'baseline'}}>
                              {(parseFloat(web3.utils.fromWei((v).toString()))).toFixed(3)} CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: 12}}>
                              ~$3,164</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: 12}}>

                              {currentLotryDetails.countWinnersPerBracket[i] > 0 ? (parseFloat(web3.utils.fromWei((parseInt(v)/parseInt(currentLotryDetails.countWinnersPerBracket[i])).toString()))).toFixed(4) : 0} CAKE each</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: 12}}>
                              {currentLotryDetails.countWinnersPerBracket[i]} winners</div>
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
        </div>
  
      )}
    </div>
  
    );  
  }
  else{
    return(
      <></>
    );
  }
}