import React from 'react'
import AboutMainBanner from '../../Components/AboutComponent/AboutMainBanner/AboutMainBanner'
import AboutContent from '../../Components/AboutComponent/AboutContent/AboutContent.jsx'
import CustomCrudBanner from '../../utils/constant/CustomCrudBanner/CustomCrudBanner.jsx'

const AboutUs = () => {
  return (
    <div>
        <AboutMainBanner/>
        <AboutContent/>
        <CustomCrudBanner/>
      
    </div>
  )
}

export default AboutUs
