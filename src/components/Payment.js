import { Contract, ethers } from 'ethers';
import { abi2 } from '../UsdcAbi';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export const sendUsdc = async (_amount) => {
    const accounts = await provider.send("eth_requestAccounts", []); //This is used to pop up metamask accounts list
    const account = accounts[0];
    const _receiver = "0x9368e48B38248373f861fF02f06A7900E9de9a60";
    console.log(" Address :" + account);
    console.log("USDC Amt =" + _amount);

    console.log("ReC = " + _receiver);
    const tokenAddress = '0xc94dd466416A7dFE166aB2cF916D3875C049EBB7'; //USDC Token Address
    const tokenContract = new ethers.Contract(tokenAddress, abi2, signer);
    await tokenContract.approve(account, _amount); 
    const writen = await tokenContract.transfer(_receiver, ethers.utils.parseEther(_amount));
    console.log("Written" + writen.hash);
    return writen.hash
}

export const sendToken = async(_cmd) =>{
    console.log("The command is : "+_cmd);
    const myArray = _cmd.split(" ");
    console.log(myArray);
    if(myArray[2] === 'usdc'){
        return sendUsdc(myArray[1]);
    }
    if(myArray[2] === 'dai'){
        return sendDAI(myArray[1]);
    }
}

export const sendDAI = async (_amount) => {
    const accounts = await provider.send("eth_requestAccounts", []); //This is used to pop up metamask accounts list
    const account = accounts[0];
    console.log(" Address :" + account);
    const _receiver = "0x6f144c0628D2039f27F13604c583fAb72BEF197e";
    console.log("ReC = " + _receiver);
    const tokenAddress = '0x88271d333C72e51516B67f5567c728E702b3eeE8'; //USDC Token Address
    const tokenContract = new ethers.Contract(tokenAddress, abi2, signer);
    await tokenContract.approve(account, _amount); const writen = await tokenContract.transfer(_receiver, ethers.utils.parseEther(_amount));
    console.log("Written" + writen.hash);
    return writen.hash
}

