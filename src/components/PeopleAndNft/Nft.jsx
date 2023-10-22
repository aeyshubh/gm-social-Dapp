import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../contexts/WalletContext';

const Nft = () => {
  const [nftLink , setLink] = useState();
  const {walletAddress, linkToSend, setLinkToSend} = useContext(WalletContext)

  function filter(text){
    if(text.substring(0,7) == "ipfs://"){
      return ("https://w3s.link/ipfs/" + text.substring(7,text.length))
    }
    else{
      return text 
    }
  }

  //This function will fetch nft associated with wallet address
  function fetchNft() {
    axios.get(`https://polygon-mainnet.g.alchemy.com/nft/v2/OLgzd6IgyTBVkfCr4jw24GBbck9Rm0-H/getNFTs/?owner=${walletAddress}`)
      .then((data)=>{
          setLink(data.data.ownedNfts);
          console.log(data);
      })
  }

  useEffect(() => {
    fetchNft();
  }, []);
  

  return(
    <div className='nft_container' id="style-4">
      {nftLink && nftLink.map((data) =>(
        data.media[0].raw !== "" && <div className='nft'>
           <img src={filter(data.media[0].raw)} onClick={(e)=>{setLinkToSend("/nft "+filter(data.media[0].raw))}} alt="" />
          {/* <iframe src={filter(data.media[0].raw)} scrolling='no' marginHeight="0" marginWidth="0" allowfullscreen></iframe> */}
        </div>
      ))}
    </div>
  );

}

export default Nft;