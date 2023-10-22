import Nft from './Nft'
import People from './People'
import React, { useState } from 'react'
import './style.scss'

const Container = () => {

  const [state, setState] = useState('people')

  return (
    <div className='container-2'>
      <div className='swap_btn'>
        <button onClick={() => setState('people')}><i class='bx bx-group'></i> People</button>
        <button onClick={() => setState('nft')}><i class='bx bxs-image-alt' ></i> Send NFTs</button>
      </div>
      {
        state === 'people' 
        ? <People />
        : <Nft  />
      }
    </div>
  )
}

export default Container
