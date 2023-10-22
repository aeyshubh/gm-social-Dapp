import axios from 'axios';
import { useEffect, useState } from 'react';

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
  function fetchNft(){
    axios.get(`https://polygon-mainnet.g.alchemy.com/nft/v2/OLgzd6IgyTBVkfCr4jw24GBbck9Rm0-H/getNFTs/?owner=${peeraddress}`)
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