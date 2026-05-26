import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className="rounded bg-blue-100 flex w-[80vw] mx-auto my-[10vh] p-5 h-[75vh]">
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-4xl font-semibold font-ui">
            This Best Url Shortner in the Market
          </h2>
          <div>
            {'We are the most Straightforward URL Shortner in the world. Most of the URL shortners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortner'}
          </div>
        </div>
        <Image src='https://www.coreldraw.com/static/cdgs/images/learn/guide-to-vector-design/how-do-vector-graphics-work/img-01.png' 
        alt="Vector Image"
        width={800}
        height={290}
        
        />
      </div>
    </>
  );
}
