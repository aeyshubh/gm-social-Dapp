import React from 'react'
import './style.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import bg from '../../assets/Croods - Party Time.png'
const Home = () => {
  return (
    <div className='container3'>
        <Sidebar />
        <img src={bg} alt="" className='bg-human' />
        <p className='content'>Seamless chatting experience</p>
        <p className='content'>Send payments instantly through the chat</p>
        <p className='content'>Allows you to send NFTs to your friends</p>
    </div>
  )
}

export default Home
