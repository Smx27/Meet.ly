import React from 'react'
import heroImg from '../../assets/images/image2.png'

const Hero = () => {
  return (
<React.Fragment>
<div className=" ">

</div>
<div className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
    <div className="mr-auto place-self-center lg:col-span-7">
    <h1 className="my-4 text-5xl font-bold leading-tight" style={{ fontFamily: "Dancing Script" }}>
    Helping You Find The Right Partner
    </h1>
    <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
    Meet.ly is the only dating app that matches you on what matters to you.You deserve to find who you're looking for.Meet them today!
    </p>
    <button className="mx-auto lg:mx-0 hover:underline bg-[#ef0f33] text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
      Subscribe
    </button>

    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img src={heroImg} alt="hero image" />
    </div>                
  </div>
</div>

    </React.Fragment>
  )
}

export default Hero