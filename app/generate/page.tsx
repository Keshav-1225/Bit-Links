"use client"
import { useState } from 'react'
import axios from 'axios';
import Link from 'next/link';
const page = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState<boolean | string>(false);

  function generate_url() {
    let data = JSON.stringify({
      "url": url,
      "shorturl": shortUrl
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/api/generate',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        alert(response.data.message);
        setUrl(""); setShortUrl(""); setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`)
      })
      .catch((error) => {
        alert(error);
      });

  }
  return (
    <div className='bg-blue-100 mx-auto w-[40vw] mt-[10vh] rounded p-9'>
      <div className='flex flex-col text-lg gap-3'>
        <h2 className='text-3xl font-ui font-bold'>Generate your short URls</h2>

        <input type="text"
          placeholder='Enter your URL'
          className='bg-white rounded p-0.5'
          onChange={(e) => { setUrl(e.target.value) }} />

        <input type="text"
          placeholder='Enter your preferred short URL text'
          className='bg-white rounded p-0.5'
          onChange={(e) => { setShortUrl(e.target.value) }} />

        <button
          className='bg-blue-500 font-ui p-1 text-white hover:cursor-pointer rounded'
          onClick={generate_url}
        >{'Generate'}</button>
        <div className='GeneratedUrl'>
          {!generated && 'Your url will appear here!'}
          {generated && <Link target='_blank' href={url as string}>{generated}</Link>}
        </div>
      </div>
    </div>
  )
}

export default page
