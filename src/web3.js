import Web3 from 'web3';

let web3;

if (window.ethereum){
  web3 = new Web3(window.ethereum);
}
else{
  web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
}
export default web3;