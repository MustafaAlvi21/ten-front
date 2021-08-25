import web3 from '../web3';
import ERC20ABI from './erc20_abi.json';

const instance = new web3.eth.Contract(
    ERC20ABI,
    process.env.REACT_APP_TOKEN_ADDRESS
    );

export default instance;
