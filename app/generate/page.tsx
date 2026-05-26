"use client"
import { useState } from 'react'
const page = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [generated, setGenerated] = useState(false);
    return (
    <div className='bg-blue-100 mx-auto w-[40vw] mt-[10vh] rounded p-9'>
      <div className='flex flex-col text-lg gap-3'>
        <h2 className='text-3xl font-ui font-bold'>Generate your short URls</h2>
        
        <input type="text" 
        placeholder='Enter your URL'
        className='bg-white rounded p-0.5'
        onChange={(e)=>{setUrl(e.target.value)}}/>

        <input type="text" 
        placeholder='Enter your preferred short URL text'
        className='bg-white rounded p-0.5'
        onChange={(e)=>{setShortUrl(e.target.value)}}/>
        
        <button
        className='bg-blue-500 font-ui p-1 text-white hover:cursor-pointer rounded'
        >{'Generate'}</button>
      </div>
    </div>
  )
}

export default page
