import React from 'react'
import DarkVeil from '../DarkVeil/DarkVeil.jsx' 
const landing = () => {
  return (
    <div className='w-full h-full block' >
        <nav className='w-full h-24 block fixed top-0 left-0 z-50 p-6 flex justify-between'  >
            <ul className='flex justify-center gap-8' >
                <li className='text-white font-bold text-2xl hover:text-gray-400' >Home</li>
                <li className='text-white font-bold text-2xl hover:text-gray-400' >About</li>
                <li className='text-white font-bold text-2xl hover:text-gray-400' >Contact</li>
            </ul>
            <div className='flex justify-center gap-8' >
                <button className='bg-white text-black font-bold text-2xl p-2 rounded' >Login</button>
                <button className='bg-white text-black font-bold text-2xl p-2 rounded' >Signup</button>
            </div>
        </nav>
      <DarkVeil className='w-full h-full z-0' />
    </div>
  )
}

export default landing