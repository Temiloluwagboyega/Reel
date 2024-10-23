import React from 'react'
import './script'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './script'

function Header() {
d
  return (
    <>
          <header className='header fixed top-0 w-full  flex justify-center backdrop-blur py-3'>
              <div className="header-cont w-fit px-12 py-1 bg-white flex items-center justify-between gap-14 border-solid border-2  rounded-3xl">
              <div className="logo">
              <p className='text-green-600 text-2xl'>Reel</p>
                  </div>
                  <nav className='flex gap-5 list-none'>
                      <li>Home</li>
                      <li>Video</li>
                      <li>Article</li>
                  </nav>
                  <div className="other list-none">
                      <li>Notification</li>
                  </div>
        </div>
        {/* <FontAwesomeIcon icon='fa-solid fa-home'/> */}
        <p className='bg-green-600 text-white' onClick={click()}>plus</p>
        <p id='test'>pppp</p>
        </header>
    </>
  )
}

export default Header