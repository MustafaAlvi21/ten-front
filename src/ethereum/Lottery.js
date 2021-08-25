import web3 from '../web3';
import LotteryABI from './Lottery-ABI.json';

const instance = new web3.eth.Contract(
    LotteryABI,
    process.env.REACT_APP_LOTTERY_ADDRESS
);

export default instance;
