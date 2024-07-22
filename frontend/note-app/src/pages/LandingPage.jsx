import React from 'react'
import Navbar from '../components/Navbar'
import Lottie from 'lottie-react'
import notePaper from '../lottie animations/notePaper.json'
import arrow from '../lottie animations/arrow.json'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div>
        <Navbar />
        <div className='container flex justify-center items-center gap-2 h-svh -mt-20 '>
          <div className='flex flex-col justify-center items-center tracking-wide '>
            <h1 className='text-6xl font-bold'>Welcome to Note App</h1>
            <p className='text-xl self-start' style={{ lineHeight: '3' }}>A simple note taking app</p>
            
            <button className='relative self-start text-lg text-white bg-primary border border-slate-200 rounded-lg px-3 py-3 mx-10 mt-5 hover:bg-blue-600 hover:tansition-all duration-200 cursor-pointer'>
              <Link  to="/login">
             Get Started
              </Link>
              <Lottie className='absolute top-11 left-20 '  animationData={arrow}/>
            </button>
          </div>
          <div className='flex justify-center'>
            <Lottie animationData={notePaper} className='w-1/2 h-1/2' />
          </div>
        </div>


    </div>
  )
}

export default LandingPage