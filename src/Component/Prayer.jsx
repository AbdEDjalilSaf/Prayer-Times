import React from 'react'

export default function Prayer(time,name,image){
  return (
    <>
   <div>
<div className='m-3 mb-5 ml:w-[230px] h-[317px] mx-2'>
<img src={image} />
<div className='bg-white flex flex-col justify-end items-end px-5 py-5 text-black'>
<h4 className='font-bold'>{name}</h4>
<h1 className='mt-7 text-7xl font-thin'>{time}</h1>
</div>
</div>
    </div>
    </>
  )
}
