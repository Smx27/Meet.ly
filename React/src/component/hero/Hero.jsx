import React from 'react'
import heroImg from '../../assets/images/image2.png'
import {GiLovers} from 'react-icons/gi'
import {MdVideoChat} from 'react-icons/md'
import {AiFillWechat} from 'react-icons/ai'
const Hero = () => {
  return (
<React.Fragment>
<div className=" "></div>
<div className="bg-white dark:bg-gray-900">
  <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
    <div className="mr-auto place-self-center lg:col-span-7">
    <h1 className="my-4 text-5xl font-bold leading-tight" style={{ fontFamily: "Dancing Script" }}>
    Helping You Find <br/> The Right Partner
    </h1>
    <p class="max-w-2xl pt-8 mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
    Meet.ly is the only dating app that matches you on what matters to you.You deserve to find who you're looking for.Meet them today!
    </p>
    <button className="mx-auto lg:mx-0 hover: bg-[#ef0f33] text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
      Subscribe
    </button>

    </div>
    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
      <img src={heroImg} alt="hero image" />
    </div>                
  </div>
</div>
{/* <!-- ======  Section Start --> */}
<section className="bg-[#fef4f5] pb-12 lg:pt-[120px] lg:pb-[90px]">
    <div className='grid grid-flow-col col-span-3 pl-10'>
     
     <div class="max-w-sm p-6 flex flex-col items-center"> 
     <div className='w-16 h-16 rounded-lg bg-[#ff8100] flex flex-col items-center pt-2'>
<GiLovers class="w-10 h-10 text-white dark:text-white mb-3"/>
</div>
        <h5 class="mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white  pt-6 ">M<span className='text-[#ff8100] '>ee</span>tings</h5>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400"> Lorem Ipsum is not simply random text.
    </p>
</div>


<div class="max-w-sm p-6 flex flex-col items-center"> 
     <div className='w-16 h-16 rounded-lg bg-[#ed0f34] flex flex-col items-center pt-2'>
<MdVideoChat class="w-10 h-10 text-white dark:text-white mb-3"/>
</div>
        <h5 class="mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white  pt-6 ">Video <span className='text-[#ed0f34] '>Call</span></h5>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400"> Lorem Ipsum is not simply random text.
    </p>
</div>

<div class="max-w-sm p-6 flex flex-col items-center"> 
     <div className='w-16 h-16 rounded-lg bg-[#ffc536] flex flex-col items-center pt-2'>
<AiFillWechat class="w-10 h-10 text-white dark:text-white mb-3"/>
</div>
        <h5 class="mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white  pt-6 ">Ch<span className='text-[#ffc536] '>at</span></h5>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400"> Lorem Ipsum is not simply random text.
    </p>
</div>

     </div>
    </section>
    {/* <!-- ======  Section End --> */}
    </React.Fragment>
  )
}

export default Hero