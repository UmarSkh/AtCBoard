"use client";

import React, {useState} from "react";
import { useParams } from "next/navigation";
import parse from 'html-react-parser';
import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/custom/excali")).default,
  {
    ssr: false,
  }
);


const Page = () => {


  const {pid} = useParams();


  let [data, setData] = useState(parse('<h1>single</h1>'));


  const dataToSend = {
    id: pid,
  }

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

    setData(parse(yourHtmlString));

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