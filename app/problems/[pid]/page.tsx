"use client";

import React, {useState} from "react";
// import { useParams } from "next/navigation";
import parse from 'html-react-parser';
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/custom/excali")).default,
  {
    ssr: false,
  }
);


const Page = () => {





  let [data, setData] = useState(parse('<h1>Please Wait ...</h1>'));

  const searchParams = useSearchParams();

  const ctype = searchParams.get("ctype");
  const cid = searchParams.get("cid");
  const ctask = searchParams.get("ctask");

  const dataToSend = {
    "ctype": ctype,
    "cid": cid,
    "ctask": ctask,
  }

  // console.log("hi");
  // console.log(dataToSend);
  // console.log("hi");

  async function fetchData() {

    const r = await fetch("http://localhost:3333/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
  
    const res = await r.json();

    let yourHtmlString = ""
    const htmls = res.htmls;

    for(let i=0;i<htmls.length;i++){
      if(i > 0)
        yourHtmlString += "<br><hr><br>";
        yourHtmlString += htmls[i];
    }

    yourHtmlString = yourHtmlString.replace(/Copy/g, '');

    console.log("pid");
    console.log(yourHtmlString);
    console.log("pid");

    if(yourHtmlString.length === 0){
      setData("No Problem with given options");
    }
    else{
      setData(parse(yourHtmlString));
    }

  }

  fetchData();

  return (
    <>

      <div className="flex justify-around">
        <div className="border-4 border-red-500 w-1/2 overflow-auto">
          {data}
        </div>
        <div className="text-3xl border-4 border-blue-500 w-1/2 overflow-auto">
          <h1 className="text-center py-4">Excalidraw Example</h1>
          <div className="border-2 border-blue-500 h-full">
            <ExcalidrawWrapper />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;