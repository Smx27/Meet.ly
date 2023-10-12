import React from 'react'
import heroImg from '../../assets/images/image1.png'
const Hero = () => {
  return (
//     <div className='mt-[4.5rem] bg-[#FFE5EC]'>
//     {/* container */}
//     <div className=''>
//     {/* left */}
// <div className='left'>
//     <h1 className=''>Find your love around the world</h1>
// </div>
// {/* right */}
// <div className='right'></div>
//     </div>
//     </div>
<React.Fragment>
<div class=" ">
<div className='pt-20 '>
<div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
  {/* <!--Left Col--> */}
  <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
    <p class=" tracking-loose w-full" style={{ fontFamily: "Dancing Script" }}>Meet.ly</p>
    <h1 class="my-4 text-5xl font-bold leading-tight" style={{ fontFamily: "Dancing Script" }}>
    Helping You Find The Right Partner
    </h1>
    <p class="leading-normal text-2xl mb-8" >
    Meet.ly is the only dating app that matches you on what matters to you.You deserve to find who you're looking for.Meet them today!
    </p>
    <button class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
      Subscribe
    </button>
  </div>
  {/* <!--Right Col--> */}
  <div class="w-full md:w-3/5 py-6 text-center">
    <img class="w-full md:w-4/5 z-50" src={heroImg} />
  </div>
</div>
</div>
</div>

    </React.Fragment>
  )
}

export default Hero