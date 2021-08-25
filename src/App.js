import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import Lottery from './ethereum/Lottery';
import BuyTicekts from './components/buyTickets';

import './App.css';
import './style.css';
import './js/app';

// IMG'S
import bgstar from "./img/bg-star.svg";  
import statBig from "./img/star-big.png";  
import statSmall from "./img/star-small.png";  
import ticket1 from "./img/ticket-l.png";  
import headerTicketBig from "./img/img.svg";  
import three_stars from "./img/three-stars.png";  
import ticket_r from "./img/ticket-r.png";  
import ticket_l from "./img/ticket-l.png";  
import footerImg from "./img/tombola.png";  

function App() {

  const [connect, set_connect] = useState("Connect Wallet")
  const [user, setUser] = useState({});
  const [currentLotryId, setCurrentLotryId] = useState('');
  const [currentLotryDetails, setCurrentLotryDetails] = useState('');
  const [web3, setweb3] = useState('');

  const getLotryId = async () => {
    const r = await Lottery.methods.currentLotteryId().call();
    const lotteryDetails = await Lottery.methods.viewLottery(r).call();
    console.log(r);
    console.log(lotteryDetails);
    setCurrentLotryId(r);
    setCurrentLotryDetails(lotteryDetails);
  }

  useEffect(() => {
    // getLotryId();
    load_web3();
  }, []);

  
  async function load_web3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      .then((result) => {
        var str = result[0];
        var start5 = str.substring(0, 5)
        var middle5 = ".....";
        var last5 = str.substring(37, 42);
        var joined = start5 + middle5 + last5
        set_connect(joined)
      }).catch((err) => {
        console.log(err);
      });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async function checkNetwork() {
    const web3 = window.web3;
    console.log("web3");
    console.log(web3);
    let account = await web3.eth.getAccounts()
    account = account[0]
    const networkId = await web3.eth.net.getId()
    console.log("networkId");
    console.log(networkId); 
    console.log(account);
    if (networkId != 1) {
      alert("Connect to Mainnet please.")
      return false;
    } 
    load_web3()
    return true;
  }
    window.ethereum.on('accountsChanged', function (accounts) {
      load_web3()
      // console.clear() 
    })

    

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

  const setMaxNumberTicketsPerBuy = () => {
    var maxPrice = document.getElementById('maxticketperbuy').value;
    if (maxPrice){
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

  const getUser = (addr) => {
    const web3 = window.web3;

    fetch(`${process.env.REACT_APP_BASE_URL}/users/${addr}`)
      .then((res) => res.json())
      .then(async (res) => {
        if (res.success) {
          console.log(res.user);
          const b = await web3.eth.getBalance(addr);
          res.user.balance = web3.utils.fromWei(b);
          console.log(res);
          setUser(res.user);
        } else {
          console.log(res);
        }
      });
  };

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

  const [All_History_btn,  set_All_History_btn ] = useState(["rgb(122, 110, 170)", "rgb(238, 234, 244)"]);
  const [Your_History_btn, set_Your_History_btn] = useState(["transparent", "rgb(122, 110, 170)"]);
  function All_History() {
    set_All_History_btn(["rgb(122, 110, 170)", "rgb(238, 234, 244)"])
    set_Your_History_btn(["transparent", "rgb(122, 110, 170)"]);
  }
  
  function Your_History() {
    set_All_History_btn(["transparent", "rgb(122, 110, 170)"]);
    set_Your_History_btn(["rgb(122, 110, 170)", "rgb(238, 234, 244)"])
    
  }

  return (
    <>

      <div className="wrapper">
        <nav id="sidebar" className="sidebar js-sidebar">
          <div className="sidebar-content js-simplebar">
            <ul className="sidebar-nav" style={{padding: '10px'}}>
              <li style={{textAlign: 'center'}}>
                <svg viewBox="0 0 160 26" className="sc-bdnxRM kDWlca desktop-icon" color="text" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M30.8524 19.7569C30.4803 19.7569 30.2173 19.6799 30.0633 19.5259C29.9221 19.372 29.8516 19.1282 29.8516 18.7946V7.65066C29.8516 7.31705 29.9285 7.07326 30.0825 6.91928C30.2365 6.75248 30.4931 6.66907 30.8524 6.66907H35.5679C37.3642 6.66907 38.6858 7.04759 39.5327 7.80463C40.3796 8.56167 40.803 9.69082 40.803 11.1921C40.803 12.6805 40.3796 13.8032 39.5327 14.5603C38.6987 15.3045 37.3771 15.6766 35.5679 15.6766H33.7394V18.7946C33.7394 19.1282 33.6624 19.372 33.5085 19.5259C33.3545 19.6799 33.0914 19.7569 32.7193 19.7569H30.8524ZM35.2599 12.8858C35.786 12.8858 36.1902 12.7446 36.4725 12.4624C36.7676 12.1801 36.9151 11.7566 36.9151 11.1921C36.9151 10.6147 36.7676 10.1848 36.4725 9.90253C36.1902 9.62025 35.786 9.47911 35.2599 9.47911H33.7394V12.8858H35.2599Z" fill="#000000" /><path d="M45.3484 20.0456C44.1423 20.0456 43.1735 19.6607 42.4421 18.8908C41.7236 18.1081 41.3643 17.011 41.3643 15.5996C41.3643 14.5218 41.6081 13.5787 42.0957 12.7703C42.5961 11.9619 43.2954 11.3396 44.1936 10.9034C45.1046 10.4543 46.1503 10.2297 47.3308 10.2297C48.306 10.2297 49.1657 10.3388 49.9099 10.5569C50.6669 10.7622 51.3598 11.0638 51.9885 11.4615V19.1602C51.9885 19.404 51.9436 19.5644 51.8538 19.6414C51.764 19.7184 51.5844 19.7569 51.3149 19.7569H49.3517C49.2106 19.7569 49.1015 19.7376 49.0245 19.6992C48.9475 19.6478 48.8834 19.5708 48.8321 19.4682L48.5819 18.8908C48.2097 19.2886 47.7607 19.5773 47.2346 19.7569C46.7213 19.9494 46.0926 20.0456 45.3484 20.0456ZM46.7919 17.428C47.2923 17.428 47.6837 17.3061 47.966 17.0623C48.2482 16.8186 48.3894 16.4721 48.3894 16.023V13.0205C48.1456 12.905 47.8376 12.8473 47.4655 12.8473C46.7855 12.8473 46.2402 13.0847 45.8296 13.5594C45.4318 14.0342 45.2329 14.7014 45.2329 15.5611C45.2329 16.8057 45.7526 17.428 46.7919 17.428Z" fill="#000000" /><path d="M54.667 19.7569C54.2949 19.7569 54.0319 19.6799 53.8779 19.5259C53.7239 19.372 53.6469 19.1282 53.6469 18.7946V11.1151C53.6469 10.8841 53.6854 10.7301 53.7624 10.6532C53.8522 10.5633 54.0318 10.5184 54.3013 10.5184H56.2837C56.4377 10.5184 56.5532 10.5441 56.6302 10.5954C56.72 10.6339 56.7713 10.7109 56.7841 10.8264L56.8804 11.4038C57.2397 11.0445 57.708 10.7622 58.2854 10.5569C58.8756 10.3388 59.53 10.2297 60.2486 10.2297C61.2879 10.2297 62.1283 10.5248 62.7699 11.1151C63.4115 11.6925 63.7322 12.5522 63.7322 13.6942V18.7946C63.7322 19.1282 63.6552 19.372 63.5013 19.5259C63.3601 19.6799 63.1035 19.7569 62.7314 19.7569H60.8645C60.4924 19.7569 60.2229 19.6799 60.0561 19.5259C59.9021 19.372 59.8251 19.1282 59.8251 18.7946V13.9444C59.8251 13.5594 59.7417 13.2836 59.5749 13.1167C59.4081 12.9499 59.1451 12.8665 58.7858 12.8665C58.4009 12.8665 58.0929 12.9692 57.862 13.1745C57.6438 13.3798 57.5348 13.6621 57.5348 14.0213V18.7946C57.5348 19.1282 57.4578 19.372 57.3038 19.5259C57.1627 19.6799 56.906 19.7569 56.5339 19.7569H54.667Z" fill="#000000" /><path d="M70.5354 20.0456C68.739 20.0456 67.3532 19.6286 66.3781 18.7946C65.4029 17.9605 64.9153 16.748 64.9153 15.1569C64.9153 14.1817 65.1399 13.322 65.5889 12.5778C66.038 11.8336 66.686 11.2562 67.5329 10.8456C68.3926 10.435 69.4062 10.2297 70.5739 10.2297C71.4592 10.2297 72.2034 10.3131 72.8065 10.4799C73.4224 10.6467 73.9677 10.9034 74.4425 11.2498C74.5836 11.3396 74.6542 11.4551 74.6542 11.5963C74.6542 11.6989 74.6029 11.8336 74.5002 12.0004L73.7111 13.367C73.6213 13.5466 73.5122 13.6364 73.3839 13.6364C73.3069 13.6364 73.185 13.5851 73.0182 13.4824C72.6718 13.2643 72.3446 13.1039 72.0366 13.0013C71.7415 12.8986 71.3694 12.8473 70.9203 12.8473C70.2787 12.8473 69.7591 13.0526 69.3613 13.4632C68.9764 13.8738 68.7839 14.4384 68.7839 15.1569C68.7839 15.8883 68.9828 16.4529 69.3806 16.8506C69.7783 17.2356 70.3237 17.428 71.0165 17.428C71.4271 17.428 71.7992 17.3703 72.1329 17.2548C72.4665 17.1393 72.8065 16.9789 73.1529 16.7736C73.3326 16.671 73.4609 16.6197 73.5379 16.6197C73.6534 16.6197 73.756 16.7095 73.8458 16.8891L74.7119 18.3711C74.7761 18.4994 74.8082 18.6021 74.8082 18.6791C74.8082 18.7946 74.7312 18.9036 74.5772 19.0063C74.0383 19.3527 73.4481 19.6093 72.8065 19.7761C72.1778 19.9558 71.4207 20.0456 70.5354 20.0456Z" fill="#000000" /><path d="M79.6881 20.0456C78.482 20.0456 77.5132 19.6607 76.7819 18.8908C76.0633 18.1081 75.704 17.011 75.704 15.5996C75.704 14.5218 75.9478 13.5787 76.4354 12.7703C76.9358 11.9619 77.6351 11.3396 78.5333 10.9034C79.4443 10.4543 80.4901 10.2297 81.6705 10.2297C82.6457 10.2297 83.5054 10.3388 84.2496 10.5569C85.0067 10.7622 85.6995 11.0638 86.3283 11.4615V19.1602C86.3283 19.404 86.2834 19.5644 86.1935 19.6414C86.1037 19.7184 85.9241 19.7569 85.6546 19.7569H83.6915C83.5503 19.7569 83.4412 19.7376 83.3643 19.6992C83.2873 19.6478 83.2231 19.5708 83.1718 19.4682L82.9216 18.8908C82.5495 19.2886 82.1004 19.5773 81.5743 19.7569C81.0611 19.9494 80.4323 20.0456 79.6881 20.0456ZM81.1316 17.428C81.632 17.428 82.0234 17.3061 82.3057 17.0623C82.588 16.8186 82.7291 16.4721 82.7291 16.023V13.0205C82.4853 12.905 82.1774 12.8473 81.8053 12.8473C81.1252 12.8473 80.5799 13.0847 80.1693 13.5594C79.7715 14.0342 79.5726 14.7014 79.5726 15.5611C79.5726 16.8057 80.0923 17.428 81.1316 17.428Z" fill="#000000" /><path d="M98.4184 19.0255C98.5082 19.1282 98.5531 19.2436 98.5531 19.372C98.5531 19.4874 98.5146 19.5837 98.4377 19.6607C98.3607 19.7248 98.258 19.7569 98.1297 19.7569H95.1465C94.9668 19.7569 94.8321 19.7441 94.7423 19.7184C94.6653 19.6799 94.5819 19.6093 94.4921 19.5067L91.8745 15.946V18.7946C91.8745 19.1282 91.7975 19.372 91.6435 19.5259C91.4896 19.6799 91.2265 19.7569 90.8544 19.7569H88.9875C88.6154 19.7569 88.3523 19.6799 88.1984 19.5259C88.0572 19.372 87.9866 19.1282 87.9866 18.7946V7.65066C87.9866 7.31705 88.0636 7.07326 88.2176 6.91928C88.3716 6.75248 88.6282 6.66907 88.9875 6.66907H90.8544C91.2265 6.66907 91.4896 6.75248 91.6435 6.91928C91.7975 7.07326 91.8745 7.31705 91.8745 7.65066V14.0983L94.4151 10.7879C94.4921 10.6852 94.5755 10.6147 94.6653 10.5762C94.7551 10.5377 94.8898 10.5184 95.0695 10.5184H98.0527C98.181 10.5184 98.2773 10.5569 98.3414 10.6339C98.4184 10.6981 98.4569 10.7879 98.4569 10.9034C98.4569 11.0317 98.412 11.1472 98.3222 11.2498L95.031 15.0222L98.4184 19.0255Z" fill="#000000" /><path d="M104.668 20.0456C103.59 20.0456 102.628 19.866 101.781 19.5067C100.947 19.1474 100.286 18.6085 99.7985 17.89C99.3109 17.1714 99.0671 16.2925 99.0671 15.2531C99.0671 13.6236 99.529 12.379 100.453 11.5193C101.377 10.6596 102.705 10.2297 104.437 10.2297C106.131 10.2297 107.414 10.6532 108.286 11.5C109.172 12.334 109.614 13.4953 109.614 14.9837C109.614 15.6252 109.332 15.946 108.767 15.946H102.724C102.724 16.4978 102.929 16.9212 103.34 17.2163C103.763 17.5114 104.398 17.659 105.245 17.659C105.771 17.659 106.208 17.6141 106.554 17.5243C106.913 17.4216 107.273 17.2741 107.632 17.0816C107.786 17.0174 107.889 16.9854 107.94 16.9854C108.055 16.9854 108.152 17.0623 108.229 17.2163L108.883 18.4481C108.947 18.5764 108.979 18.6727 108.979 18.7368C108.979 18.8523 108.902 18.9614 108.748 19.064C108.222 19.4105 107.626 19.6607 106.958 19.8146C106.291 19.9686 105.528 20.0456 104.668 20.0456ZM106.15 14.0406C106.15 13.553 106.009 13.1745 105.726 12.905C105.444 12.6356 105.021 12.5009 104.456 12.5009C103.892 12.5009 103.462 12.642 103.167 12.9243C102.872 13.1937 102.724 13.5658 102.724 14.0406H106.15Z" fill="#000000" /><path d="M116.211 20.0456C115.133 20.0456 114.113 19.9365 113.151 19.7184C112.189 19.4874 111.412 19.1667 110.822 18.7561C110.604 18.6149 110.495 18.4674 110.495 18.3134C110.495 18.2107 110.533 18.1017 110.61 17.9862L111.553 16.4849C111.656 16.331 111.759 16.254 111.861 16.254C111.926 16.254 112.035 16.2989 112.189 16.3887C112.663 16.6582 113.202 16.8763 113.805 17.0431C114.408 17.2099 115.005 17.2933 115.595 17.2933C116.198 17.2933 116.641 17.2035 116.923 17.0238C117.218 16.8442 117.366 16.5555 117.366 16.1577C117.366 15.7728 117.206 15.4713 116.885 15.2531C116.577 15.035 115.993 14.7591 115.133 14.4255C113.837 13.9379 112.824 13.3926 112.092 12.7896C111.374 12.1737 111.015 11.3396 111.015 10.2875C111.015 9.01718 111.47 8.04843 112.381 7.38121C113.292 6.71398 114.505 6.38037 116.019 6.38037C117.071 6.38037 117.969 6.47661 118.713 6.66907C119.47 6.84871 120.112 7.131 120.638 7.51593C120.856 7.68274 120.965 7.83671 120.965 7.97786C120.965 8.06767 120.927 8.17032 120.85 8.2858L119.907 9.78705C119.791 9.94103 119.688 10.018 119.599 10.018C119.534 10.018 119.425 9.97311 119.271 9.88329C118.527 9.3957 117.642 9.15191 116.615 9.15191C116.064 9.15191 115.64 9.24173 115.345 9.42137C115.05 9.601 114.902 9.89612 114.902 10.3067C114.902 10.589 114.979 10.82 115.133 10.9996C115.287 11.1792 115.493 11.3396 115.749 11.4808C116.019 11.6091 116.429 11.7759 116.981 11.9812L117.347 12.1159C118.296 12.488 119.04 12.8473 119.579 13.1937C120.131 13.5273 120.548 13.9444 120.83 14.4448C121.113 14.9324 121.254 15.5483 121.254 16.2925C121.254 17.4344 120.824 18.3455 119.964 19.0255C119.117 19.7056 117.866 20.0456 116.211 20.0456Z" fill="#000000" /><path d="M125.343 19.7569C125.151 19.7569 125.003 19.7248 124.9 19.6607C124.798 19.5965 124.721 19.4682 124.67 19.2757L122.187 10.9611C122.161 10.8841 122.148 10.8264 122.148 10.7879C122.148 10.6083 122.277 10.5184 122.533 10.5184H125.074C125.241 10.5184 125.362 10.5505 125.439 10.6147C125.516 10.666 125.568 10.7558 125.593 10.8841L126.633 15.2531L127.941 11.731C128.006 11.577 128.07 11.4744 128.134 11.423C128.211 11.3589 128.339 11.3268 128.519 11.3268H129.731C129.911 11.3268 130.033 11.3589 130.097 11.423C130.174 11.4744 130.245 11.577 130.309 11.731L131.598 15.2531L132.657 10.8841C132.695 10.7558 132.747 10.666 132.811 10.6147C132.875 10.5505 132.991 10.5184 133.157 10.5184H135.717C135.974 10.5184 136.102 10.6083 136.102 10.7879C136.102 10.8264 136.089 10.8841 136.064 10.9611L133.562 19.2757C133.51 19.4682 133.433 19.5965 133.331 19.6607C133.241 19.7248 133.1 19.7569 132.907 19.7569H131.021C130.841 19.7569 130.707 19.7248 130.617 19.6607C130.527 19.5837 130.45 19.4554 130.386 19.2757L129.116 15.7921L127.845 19.2757C127.794 19.4554 127.717 19.5837 127.614 19.6607C127.524 19.7248 127.39 19.7569 127.21 19.7569H125.343Z" fill="#000000" /><path d="M140.981 20.0456C139.775 20.0456 138.806 19.6607 138.075 18.8908C137.356 18.1081 136.997 17.011 136.997 15.5996C136.997 14.5218 137.241 13.5787 137.728 12.7703C138.229 11.9619 138.928 11.3396 139.826 10.9034C140.737 10.4543 141.783 10.2297 142.963 10.2297C143.938 10.2297 144.798 10.3388 145.542 10.5569C146.299 10.7622 146.992 11.0638 147.621 11.4615V19.1602C147.621 19.404 147.576 19.5644 147.486 19.6414C147.396 19.7184 147.217 19.7569 146.947 19.7569H144.984C144.843 19.7569 144.734 19.7376 144.657 19.6992C144.58 19.6478 144.516 19.5708 144.465 19.4682L144.214 18.8908C143.842 19.2886 143.393 19.5773 142.867 19.7569C142.354 19.9494 141.725 20.0456 140.981 20.0456ZM142.424 17.428C142.925 17.428 143.316 17.3061 143.598 17.0623C143.881 16.8186 144.022 16.4721 144.022 16.023V13.0205C143.778 12.905 143.47 12.8473 143.098 12.8473C142.418 12.8473 141.873 13.0847 141.462 13.5594C141.064 14.0342 140.865 14.7014 140.865 15.5611C140.865 16.8057 141.385 17.428 142.424 17.428Z" fill="#000000" /><path d="M150.28 23.6447C149.908 23.6447 149.645 23.5678 149.491 23.4138C149.35 23.2598 149.279 23.016 149.279 22.6824V11.654C149.857 11.2434 150.582 10.9034 151.454 10.6339C152.327 10.3645 153.238 10.2297 154.187 10.2297C158.062 10.2297 160 11.8721 160 15.1569C160 16.6453 159.589 17.8322 158.768 18.7176C157.947 19.6029 156.786 20.0456 155.284 20.0456C154.861 20.0456 154.45 19.9943 154.053 19.8916C153.668 19.789 153.347 19.6478 153.09 19.4682V22.6824C153.09 23.016 153.013 23.2598 152.859 23.4138C152.705 23.5678 152.442 23.6447 152.07 23.6447H150.28ZM154.457 17.4473C155.009 17.4473 155.419 17.242 155.689 16.8314C155.971 16.408 156.112 15.8434 156.112 15.1377C156.112 14.3036 155.945 13.7198 155.612 13.3862C155.291 13.0398 154.79 12.8665 154.11 12.8665C153.674 12.8665 153.328 12.9243 153.071 13.0398V16.1C153.071 16.5363 153.193 16.8699 153.437 17.1008C153.681 17.3318 154.021 17.4473 154.457 17.4473Z" fill="#000000" /><path fillRule="evenodd" clipRule="evenodd" d="M4.38998 4.50033C4.01476 2.49106 5.55649 0.634766 7.60049 0.634766C9.40427 0.634766 10.8665 2.09701 10.8665 3.90078V7.92728C11.3177 7.89544 11.7761 7.87911 12.2404 7.87911C12.6865 7.87911 13.1272 7.89418 13.5612 7.9236V3.90078C13.5612 2.09701 15.0234 0.634766 16.8272 0.634766C18.8712 0.634766 20.4129 2.49106 20.0377 4.50033L19.1539 9.23326C22.1872 10.5576 24.4809 12.8577 24.4809 15.748V17.4966C24.4809 19.8734 22.9085 21.8634 20.7102 23.2068C18.4948 24.5606 15.4978 25.3654 12.2404 25.3654C8.98304 25.3654 5.98604 24.5606 3.77065 23.2068C1.57242 21.8634 0 19.8734 0 17.4966V15.748C0 12.873 2.2701 10.5817 5.27785 9.25477L4.38998 4.50033ZM18.0212 9.85508L19.0555 4.3169C19.3159 2.92236 18.2459 1.63399 16.8272 1.63399C15.5753 1.63399 14.5604 2.64886 14.5604 3.90078V9.02479C14.2324 8.98273 13.8991 8.9494 13.5612 8.92524C13.128 8.89426 12.6873 8.87833 12.2404 8.87833C11.7753 8.87833 11.3168 8.89559 10.8665 8.92912C10.5286 8.95429 10.1953 8.98862 9.86729 9.03169V3.90078C9.86729 2.64886 8.85241 1.63399 7.60049 1.63399C6.18184 1.63399 5.11179 2.92235 5.37222 4.3169L6.40988 9.87345C3.16599 11.0784 0.999219 13.2586 0.999219 15.748V17.4966C0.999219 21.2906 6.03208 24.3662 12.2404 24.3662C18.4488 24.3662 23.4817 21.2906 23.4817 17.4966V15.748C23.4817 13.2458 21.2927 11.0562 18.0212 9.85508Z" fill="#633001" /><path d="M23.4815 17.4967C23.4815 21.2907 18.4486 24.3663 12.2402 24.3663C6.03189 24.3663 0.999023 21.2907 0.999023 17.4967V15.748H23.4815V17.4967Z" fill="#FEDC90" /><path fillRule="evenodd" clipRule="evenodd" d="M5.37202 4.31671C5.1116 2.92216 6.18164 1.63379 7.6003 1.63379C8.85222 1.63379 9.8671 2.64867 9.8671 3.90059V9.0315C10.6321 8.93102 11.4261 8.87813 12.2402 8.87813C13.0356 8.87813 13.8116 8.9286 14.5602 9.02459V3.90059C14.5602 2.64867 15.5751 1.63379 16.827 1.63379C18.2457 1.63379 19.3157 2.92216 19.0553 4.31671L18.021 9.85488C21.2925 11.056 23.4815 13.2457 23.4815 15.7478C23.4815 19.5418 18.4486 22.6174 12.2402 22.6174C6.03189 22.6174 0.999023 19.5418 0.999023 15.7478C0.999023 13.2584 3.16579 11.0782 6.40968 9.87326L5.37202 4.31671Z" fill="#D1884F" /><path className="left-eye" d="M9.11817 15.2485C9.11817 16.2833 8.55896 17.1221 7.86914 17.1221C7.17932 17.1221 6.62012 16.2833 6.62012 15.2485C6.62012 14.2138 7.17932 13.375 7.86914 13.375C8.55896 13.375 9.11817 14.2138 9.11817 15.2485Z" fill="#633001" /><path className="right-eye" d="M17.7363 15.2485C17.7363 16.2833 17.1771 17.1221 16.4873 17.1221C15.7975 17.1221 15.2383 16.2833 15.2383 15.2485C15.2383 14.2138 15.7975 13.375 16.4873 13.375C17.1771 13.375 17.7363 14.2138 17.7363 15.2485Z" fill="#633001" /></svg>
              </li>
              <li className="sidebar-header" style={{color: 'rgb(122, 110, 170)', transition: 'color 0.4s ease 0s', WebkitBoxFlex: 1, flexGrow: 1, fontSize: 'large', fontWeight: 600}}>
                Lottery
              </li>
            </ul></div>
        </nav>
        <div className="main">
          <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle js-sidebar-toggle">
              <i className="hamburger align-self-center" />
            </a>
            <div className="navbar-collapse collapse">
              <ul className="navbar-nav navbar-align" style={{display: 'flex', alignItems: 'baseline'}}>
                <li>
                  <svg viewBox="0 0 24 24" height={22} width={22} fill="rgb(122, 110, 170);" color="rgb(122, 110, 170);" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM cSawQi"><path d="M19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H9.99996C9.74996 2 9.53996 2.18 9.50996 2.42L9.12996 5.07C8.51996 5.32 7.95996 5.66 7.43996 6.05L4.94996 5.05C4.71996 4.96 4.45996 5.05 4.33996 5.27L2.33996 8.73C2.20996 8.95 2.26996 9.22 2.45996 9.37L4.56996 11.02C4.52996 11.34 4.49996 11.67 4.49996 12C4.49996 12.33 4.52996 12.66 4.56996 12.98L2.45996 14.63C2.26996 14.78 2.21996 15.05 2.33996 15.27L4.33996 18.73C4.45996 18.95 4.72996 19.03 4.94996 18.95L7.43996 17.95C7.95996 18.35 8.51996 18.68 9.12996 18.93L9.50996 21.58C9.53996 21.82 9.74996 22 9.99996 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98ZM12 15.5C10.07 15.5 8.49996 13.93 8.49996 12C8.49996 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5Z" /></svg>
                </li>
                &nbsp; &nbsp;
                <li>
                  <button onClick={()=>checkNetwork()} style={{WebkitBoxAlign: 'center', alignItems: 'center', border: '0px', borderRadius: '16px', boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: '16px', fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: '0px', transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', height: '32px', padding: '0px 16px', backgroundColor: 'rgb(31, 199, 212)', color: 'white'}}>{ connect }</button>
                </li>
              </ul>
            </div>
          </nav>
          <main className>
            <div className="container-fluid p-0">
              <div className="row jc-center header bg-purple py-4" style={{position: 'relative'}}>
                <img src={bgstar} alt="bg-star.svg" style={{position: 'absolute', width: '100vw', top: '0px'}} />
                <section className="content">
                  <div className="row jc-center">
                    <div className="col-xl-8 col-lg-11 col-md-9">
                      <div className="row jc-center">
                        <div className="col-3 d-none-590" style={{marginTop: '100px'}}>
                          <img src={statBig} alt="star-big.png" style={{width: '90px'}} />
                          <br />
                          <img src={statSmall} alt="star-small.png" className="mt-4 ml-neg-40" style={{width: '120px'}} />
                          <br />
                          <img src={ticket1} alt="ticket-l.png" className="mt-4 " style={{width: '120px'}} />
                        </div>
                        <div className="col-6 w-90-590 text-center" style={{marginTop: '100px'}}>
                          <p className="header-p">The PancakeSwap Lottery</p>
                          <h1 className="golden-text-color" style={{fontSize: '64px', fontWeight: 600}}>$151,036</h1>
                          <p className="header-p in-prizes mb-4">in prizes!</p>
                          <div className="header-ticket">
                            <img src={headerTicketBig} alt="img.svg" />
                            <button className="btn" id="header-ticket-btn"> Buy Tickets</button>
                          </div>
                        </div>
                        <div className="col-3 d-none-590" style={{marginTop: '100px'}}>
                          <img src={three_stars} alt="three-stars" className="mr-neg-30" style={{float: 'right', width: '150px'}} />
                          <img src={ticket_r} alt="ticket-r" className="mt-5" style={{float: 'right', width: '120px'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="row" style={{marginTop: '100px'}}>
                <h2 className="getTicket-heading">
                  Get your tickets now!</h2>
                <p className="sec2-a text-center" style={{marginBottom: '40px'}}> <span className="sec2-b golden-text-color">7</span> <span className="golden-text-color">h</span> <span className="sec2-b golden-text-color">53</span> <span className="golden-text-color">m</span>
                  until the draw</p>
                <div className="row d-flex m-0" style={{justifyContent: 'center'}}>
                  <div className="card col-10  px-0" style={{borderRadius: '24px', maxWidth: '800px'}}>
                    <h5 className="card-header" style={{padding: '1.25rem', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(111.68deg, rgb(242, 236, 242) 0%, rgb(232, 242, 246) 100%)', borderRadius: '24px 24px 0px 0px'}}>
                      <span className="secondSecHeading">Next Draw</span>
                      <span className="secondSecDraw-text">#107 | Draw: Aug 18, 2021, 11:00 AM</span>
                    </h5>
                    <div className="card-body" style={{padding: '0%'}}>
                      <div className="row text-center-md" style={{padding: '1.25rem'}}>
                        <div className="m-auto-md" style={{display: 'inline-flex', width: '130px'}}>
                          <h4 className=" secondSecHeading">Prize Pot</h4>
                        </div>
                        <div className="col-md flex-dc d-flex">
                          <h1 className="w-100 mb-0" style={{color: 'rgb(118, 69, 217)', fontWeight: 600, lineHeight: 1, fontSize: '40px'}}>
                            ~$155,535</h1>
                          <sub className="secondSecCake-text text-center-md">7,189 CAKE</sub>
                        </div>
                      </div>
                      <div className="row pt-0" style={{padding: '1.25rem'}}>
                        <div className="col-md-3 jc-center-md" style={{display: 'inline-flex'}}>
                          <h4 className="secondSecHeading">Your tickets</h4>
                        </div>
                        <div className="col-md-9 jc-center-md" style={{display: 'inline-flex', position: 'relative'}}>
                          <button className="btn buyTicketBtn">Buy
                            Tickets</button>
                        </div>
                      </div>
                      <hr style={{margin: '0%'}} />
                      <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{textAlign: 'center', WebkitBoxAlign: 'center', alignItems: 'center', border: '0px', borderRadius: '16px', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: '16px', fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: '0px', transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', width: '100%', height: '60px', padding: '0px 24px', backgroundColor: 'transparent', color: 'rgb(31, 199, 212)', boxShadow: 'none'}}>
                        Details
                        <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM flwtrA">
                          <path fill="rgb(31, 199, 212)" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z">
                          </path>
                        </svg>
                      </button>
                      <div className="collapse" id="collapseExample" style={{}}>
                        <div className style={{backgroundColor: '#edeff4', padding: '1.25rem', borderRadius: '16px'}}>
                          <p style={{color: 'rgb(40, 13, 95)', fontWeight: 400, lineHeight: '1.5', marginBottom: '24px', fontSize: '14px'}}>
                            Match the winning number in the same order to share prizes. Current
                            prizes up for grabs:</p>
                          <div className="row">
                            <div className="col-sm-3 col-6">
                              <div className="w-mc" style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Match first 1</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="w-mc" style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Match first 2</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="w-mc" style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Match first 3</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="w-mc" style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Match first 4</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="w-mc" style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Match first 5</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div className="w-mc" style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Match all 6</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                            <div className="col-sm-3 col-6">
                              <div style={{color: 'rgb(237, 75, 158)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                                Burn</div>
                              <div className="secondSecHeading" style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                                147 CAKE</div>
                              <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                                ~$3,164</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <br /> <br /> <br />
          {/* section 3 connect wallet */}
          <div className="row mx-0" style={{position: 'relative', flexDirection: 'column', WebkitBoxAlign: 'center', alignItems: 'center', zIndex: 1, background: 'linear-gradient(.73deg,rgb(49,61,92)0%,rgb(61,42,84)100%)', padding: '80px 0px'}}>
            <div className="col-xl-6 col-lg-7 col-md-8 col-sm-10">
              <div className="row">
                <div className="col-sm-3 col-2 px-0-450 vertical-center">
                  <img src={ticket_l} alt="ticket-l.png" className="connecetWalletImg" />
                </div>
                <div className="col-sm-6 col-8 text-center px-0-450">
                  <h2 style={{fontWeight: 600, lineHeight: '1.1', color: '#F4EEFF', fontSize: '20px'}}>Connect your wallet</h2>
                  <h2 className="mb-4" style={{fontWeight: 600, lineHeight: '1.1', color: '#F4EEFF', fontSize: '20px'}}>to check if you've won!</h2>
                  <button onClick={()=>checkNetwork()} style={{WebkitBoxAlign: 'center', alignItems: 'center', border: '0px', borderRadius: '16px', boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: '16px', fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: '0px', transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', height: '48px', padding: '0px 24px', backgroundColor: 'rgb(31, 199, 212)', color: 'white', width: '190px'}}>{ connect }</button>
                </div>
                <div className="col-sm-3 col-2 px-0-450 vertical-center">
                  <img src={ticket_r} alt="ticket-r.png" className="connecetWalletImg" />
                </div>
              </div>
            </div>
          </div>
          <div className="row text-center mx-auto finishRoundDiv">
            <h1 style={{fontSize: '40px', fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', marginBottom: '24px'}}>  Finished Rounds</h1>
            <div style={{backgroundColor: 'rgb(238, 234, 244)', borderRadius: '16px', display: 'inline-flex', border: '1px solid rgb(215, 202, 236)', width: 'auto', padding: '0%'}}>
              <button className="allHistoryBtn" onClick={()=> All_History()}   style={{backgroundColor: All_History_btn[0], color: All_History_btn[1]}} >All History</button>
              <button className="yourHistoryBtn" onClick={()=> Your_History()} style={{backgroundColor: Your_History_btn[0], color: Your_History_btn[1]}} >Your History</button>
            </div>
            <div className="row d-flex" style={{textAlign: 'left', justifyContent: 'center', marginTop: '30px'}}>
              <div className="card col-xl-10 col-12" style={{borderRadius: '15px', maxWidth: '800px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                  <div>
                    <span style={{color: 'rgb(40, 13, 95)', fontSize: '20px', fontWeight: 600}}>Round</span>
                    <input type="text" defaultValue={216} readOnly style={{width: '60px', height: '100%', padding: '4px 16px', backgroundColor: 'rgb(238, 234, 244) !important', border: 'none', borderRadius: '16px', boxShadow: 'none', color: 'rgb(40, 13, 95)', fontWeight: 600, textAlign: 'center'}} />
                  </div>
                  <div>
                    <div className="sc-jSFjdj sc-gKAaRy kJmatq togOu">
                      <button className="sc-hKFxyN fgKIwT sc-eCApnc sc-lcmwCJ fAYovO lLOUy" scale="sm" style={{width: '32px', border: 'none', backgroundColor: 'transparent'}}>
                        <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <path d="M19 11H7.82998L12.71 6.12C13.1 5.73 13.1 5.09 12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z">
                          </path>
                        </svg>
                      </button>
                      <button className="sc-hKFxyN fgKIwT sc-eCApnc sc-lcmwCJ fAYovO lLOUy pancake-button--disabled" scale="sm" disabled style={{width: '32px', border: 'none', backgroundColor: 'transparent'}}>
                        <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM kDWlca">
                          <path d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z">
                          </path>
                        </svg>
                      </button>
                      <button className="sc-hKFxyN jYLfuR sc-eCApnc sc-lcmwCJ fAYovO lLOUy pancake-button--disabled" scale="sm" disabled style={{width: '32px', border: 'none', backgroundColor: 'transparent'}}>
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
                <div style={{color: 'rgb(40, 13, 95)', fontSize: '10px', fontWeight: 400}}>
                  <br />
                  Drawn Aug 18, 2021, 11:00 AM
                </div>
                <hr />
                <div className="card-body" style={{padding: '0%'}}>
                  <div className="row py-2">
                    <div className="col-md-3 col-lg-3" style={{fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', marginBottom: '24px'}}>
                      <h4 className="card-title text-center" style={{color: 'black'}}>Winning Number</h4>
                    </div>
                    <div className="col-md-9 col-lg-9" style={{display: 'inline-flex', position: 'relative'}}>
                      <div className="sc-jSFjdj sc-gKAaRy hLjwZs gwtaiH" style={{width: '100%', display: 'flex', justifyContent: 'space-evenly'}}>
                        <div className="sc-jSFjdj sc-gKAaRy hUVrOV ViahK jc-center-md" style={{width: '100%', display: 'flex'}}>
                          <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative', marginRight: '3px'}}>
                            <svg viewBox="0 0 32 32" className="ballSize" height="100%" color="text" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="sc-cCwPlL kUKRLv ballNumber">
                              <div color="text" className="sc-gtsrHT sc-kqfmhM jYDilb lkBYFM" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5'}}>6</div>
                            </div>
                          </div>
                          <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative', marginRight: '3px'}}>
                            <svg viewBox="0 0 32 32" className="ballSize" height="100%" color="text" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="sc-cCwPlL kUKRLv ballNumber">
                              <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb kOVKjB" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5'}}>9</div>
                            </div>
                          </div>
                          <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative', marginRight: '3px'}}>
                            <svg viewBox="0 0 32 32" className="ballSize" height="100%" color="text" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="sc-cCwPlL kUKRLv ballNumber">
                              <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb lkBYFM" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5'}}>0</div>
                            </div>
                          </div>
                          <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative', marginRight: '3px'}}>
                            <svg viewBox="0 0 32 32" className="ballSize" height="100%" color="text" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="sc-cCwPlL kUKRLv ballNumber">
                              <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb kOVOlg" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5'}}>3</div>
                            </div>
                          </div>
                          <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative', marginRight: '3px'}}>
                            <svg viewBox="0 0 32 32" className="ballSize" height="100%" color="text" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="sc-cCwPlL kUKRLv ballNumber">
                              <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb ikvoTX" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5'}}>6</div>
                            </div>
                          </div>
                          <div className="sc-jSFjdj sc-gKAaRy hCNsvx dRVWhO" style={{position: 'relative'}}>
                            <svg viewBox="0 0 32 32" className="ballSize" height="100%" color="text" xmlns="http://www.w3.org/2000/svg">
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
                            <div className="sc-cCwPlL kUKRLv ballNumber">
                              <div fontSize="42px" color="text" className="sc-gtsrHT sc-kqfmhM jYDilb lkBYFX" style={{color: 'rgb(40, 13, 95)', textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px', transform: 'rotate(9deg)', fontWeight: 600, lineHeight: '1.5'}}>9</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col sc-fKgJPI evNcQI sc-bcuVfI eRpVmx" style={{position: 'absolute', right: '-10px', top: '90px', zIndex: 1, backgroundColor: 'rgb(118, 69, 217)', color: 'white', margin: '0px', padding: '8px 0px', textAlign: 'center', transform: 'translateX(30%) translateY(0%) rotate(45deg)', transformOrigin: 'left top', width: '96px'}}>
                      <div title="Latest">Latest</div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <hr style={{margin: '0%'}} />
                  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1" style={{textAlign: 'center', WebkitBoxAlign: 'center', alignItems: 'center', border: '0px', borderRadius: '16px', cursor: 'pointer', display: 'inline-flex', fontFamily: 'inherit', fontSize: '16px', fontWeight: 600, WebkitBoxPack: 'center', justifyContent: 'center', letterSpacing: '0.03em', lineHeight: 1, opacity: 1, outline: '0px', transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s', width: '100%', height: '60px', padding: '0px 24px', backgroundColor: 'transparent', color: 'rgb(31, 199, 212)', boxShadow: 'none'}}>Details
                    <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM flwtrA">
                      <path fill="rgb(31, 199, 212)" d="M8.11997 9.29006L12 13.1701L15.88 9.29006C16.27 8.90006 16.9 8.90006 17.29 9.29006C17.68 9.68006 17.68 10.3101 17.29 10.7001L12.7 15.2901C12.31 15.6801 11.68 15.6801 11.29 15.2901L6.69997 10.7001C6.30997 10.3101 6.30997 9.68006 6.69997 9.29006C7.08997 8.91006 7.72997 8.90006 8.11997 9.29006Z">
                      </path>
                    </svg>
                  </button>
                  <div className="collapse" id="collapseExample1">
                    <div className="row py-4" style={{backgroundColor: '#edeff4', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', padding: '10px'}}>
                      <div className="col-sm-12 col-md-4" style={{display: 'flex', flexDirection: 'column', "padding-left": "calc(var(--bs-gutter-x)/2)", "padding-right": "calc(var(--bs-gutter-x)/2)"}}>
                        <div style={{display: 'inline-flex', width: '130px'}}>
                          <h4 className="card-title" style={{color: 'black'}}>Prize Pot</h4>
                        </div>
                        <div className="col" style={{display: 'inline-flex', position: 'relative', marginBottom: "10px"}}>
                          <h1 className="w-100" style={{color: 'rgb(118, 69, 217)', fontWeight: 600, lineHeight: 1, fontSize: '40px'}}> ~$155,535 </h1>
                          <sub style={{position: 'absolute', bottom: '0px', fontSize: '15px', color: "rgb(40, 13, 95)", "font-weight": "400"}}>Total players this round: 1732</sub>
                        </div>
                      </div>
                      <div className="col">
                        <p style={{color: 'rgb(40, 13, 95)', fontWeight: 400, lineHeight: '1.5', margin: '24px 0px', fontSize: '14px', color: "rgb(40, 13, 95)"}}> Match the winning number in the same order to share prizes. Current prizes up for grabs: </p>
                        <div className="row">
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Match first 1</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Match first 2</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Match first 3</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Match first 4</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Match first 5</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(118, 69, 217)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Match all 6</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                          <div className=" col-6 col-sm-6 col-md-4 col-lg-3">
                            <div style={{color: 'rgb(237, 75, 158)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>
                              Burn</div>
                            <div style={{margin: '0px', padding: '0px', border: '0px', fontSize: '100%', verticalAlign: 'baseline'}}>
                              147 CAKE</div>
                            <div style={{color: 'rgb(122, 110, 170)', fontWeight: 400, lineHeight: '1.5', fontSize: '12px'}}>
                              ~$3,164</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{background: 'rgb(250, 249, 250)',  padding: "15px", paddingTop: '100px'}}>
            <h1 style={{color: 'rgb(118, 69, 217)', fontWeight: 600, textAlign: 'center'}}>How to Play</h1>
            <p style={{color: 'rgb(40, 13, 95)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5', textAlign: 'center'}}>If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool. Simple!</p>
            <div className="row" style={{display: 'flex', justifyContent: 'space-around', padding: '50px 20px'}}>
              <div className="col-lg-4 col-sm-12" style={{padding: '24px', background: 'rgb(255, 255, 255)', borderRadius: '10px', boxShadow: 'rgb(238 234 244) 0px 0px 5px inset'}}>
                <p style={{float: 'right'}}>Step 1</p>
                <br />
                <h2 style={{fontWeight: 600, lineHeight: '1.1', marginBottom: '16px', color: 'rgb(118, 69, 217)'}}>Buy Tickets</h2>
                <h6 style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Prices are set when the round starts, equal to 5 USD in CAKE per ticket</h6>
              </div>
              <div className="col-lg-4 col-sm-12" style={{padding: '24px', background: 'rgb(255, 255, 255)', borderRadius: '10px', boxShadow: 'rgb(238 234 244) 0px 0px 5px inset'}}>
                <p style={{float: 'right'}}>Step 1</p>
                <br />
                <h2 style={{fontWeight: 600, lineHeight: '1.1', marginBottom: '16px', color: 'rgb(118, 69, 217)'}}>Buy Tickets</h2>
                <h6 style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Prices are set when the round starts, equal to 5 USD in CAKE per ticket</h6>
              </div>
              <div className="col-lg-4 col-sm-12" style={{padding: '24px', background: 'rgb(255, 255, 255)', borderRadius: '10px', boxShadow: 'rgb(238 234 244) 0px 0px 5px inset'}}>
                <p style={{float: 'right'}}>Step 1</p>
                <br />
                <h2 style={{fontWeight: 600, lineHeight: '1.1', marginBottom: '16px', color: 'rgb(118, 69, 217)'}}>Buy Tickets</h2>
                <h6 style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Prices are set when the round starts, equal to 5 USD in CAKE per ticket</h6>
              </div>
            </div>
            <hr />
            <div className="row p-5">
              <div className="col-12 col-sm-12 col-lg-6">
                <h2 style={{color: 'rgb(118, 69, 217)', fontWeight: 600, lineHeight: '1.1'}}>Winning Criteria</h2>
                <h2 style={{fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', fontSize: '20px', margin: "25px 0px"}}>The digits on your ticket must match in the correct order to win.</h2>
                <p style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5', display: 'inline'}}>Here’s an example lottery draw, with two tickets, A and B.</p>
                <ul>
                  <li style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Ticket A: The first 3 digits and the last 2 digits match, but the 4th digit is wrong, so this ticket only wins a “Match first 3” prize.</li>
                  <li style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Ticket B: Even though the last 5 digits match, the first digit is wrong, so this ticket doesn’t win a prize.</li>
                </ul>
                <p style={{color: 'rgb(122, 110, 170)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’.</p>
              </div>
              <div className="col-12 col-sm-12 col-lg-6" />
              <br />
              <hr />
              <div className="row">
                <div className="col-md-6 col-sm-12 p-md-5 p-sm-3 d-flex justify-content-center align-items-center">
                  <img src={ footerImg } alt="tombola.png" width="250px" style={{float: 'right'}} />
                </div>
                <div className="col-md-6 col-sm-12 p-md-5 p-sm-3 d-flex justify-content-center align-items-center">
                  <div>
                    <h2 style={{fontWeight: 600, lineHeight: '1.1', color: 'rgb(40, 13, 95)', marginBottom: '16px'}}>Still got questions?</h2>
                    <h6 style={{color: 'rgb(40, 13, 95)', fontSize: '16px', fontWeight: 400, lineHeight: '1.5'}}>Check our in-depth guide on <a href style={{color: 'rgb(31, 199, 212)', fontSize: '16px', fontWeight: 600, lineHeight: '1.5'}}>how to play the PancakeSwap lottery!</a></h6>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


</>
  );
}

export default App;
