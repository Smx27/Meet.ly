// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from './component/navbar/NavBar'
//import Hero from './component/hero/Hero'
import Footer from './component/footer/Footer'
import BaseRouting from './routing/BaseRouting'

const Home = () => {
  return (
    <div >
        <NavBar/>
         <BaseRouting/> 
        <Footer/>
    </div>
  )
}

export default Home