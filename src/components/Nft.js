import axios from 'axios';
import { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';

function Nft(){
  const [nftLink , setLink] = useState();

  function filter(text){
    if(text.substring(0,7) == "ipfs://"){
      return ("https://w3s.link/ipfs/" + text.substring(7,text.length))
    }
    else{
      return text
    }
  }

  //This function will fetch nft associated with wallet address
  async function fetchNft(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []); //This is used to pop up metamask accounts list
    const account = accounts[0];
    console.log("Inside NFT"+account);
    axios.get(`https://polygon-mainnet.g.alchemy.com/nft/v2/OLgzd6IgyTBVkfCr4jw24GBbck9Rm0-H/getNFTs/?owner=${account}`)
      .then((data)=>{
          setLink(data.data.ownedNfts);
      })
  }

  useEffect(() => {
    fetchNft();
  }, []);
  

  return(
    <div className='nft-show'>
      {nftLink && nftLink.map((data) =>(
      <>
        <h2 id="links">{data.title}</h2>
        <iframe src={filter(data.media[0].raw)}> </iframe>
      </>
      ))}
    </div>
  );

}

export default Nft;