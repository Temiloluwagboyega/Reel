import React from 'react'
import Form from './Form'
import ProfileSetup from './ProfileSetup'
function FromProfile() {
  return (
      <>
          <div className="cont flex">
              <div className="content">
              <Form />
              <ProfileSetup/>
              </div>
              
            </div>
      </>
  )
}

export default FromProfile