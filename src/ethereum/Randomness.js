import web3 from '../web3';
import RandomnessABI from './Randomness.json';

const instance = new web3.eth.Contract(
    RandomnessABI,
    '0xD7BAE67F44236138BcD331cCeC13df6170E3ae5e'
);

export default instance;
