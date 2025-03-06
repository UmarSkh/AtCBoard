"use client";

import React, {useState, useRef, useEffect, useCallback, useMemo} from "react";
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

  const dataToSend = useMemo(() => {
    return {
      ctype: ctype,
      cid: cid,
      ctask: ctask,
    };
  }, [ctype, cid, ctask]);

  const fetchData = useCallback(async () => {
    try {
      const r = await fetch("https://atcb-rzjz.onrender.com/", {
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
  
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("An error occurred while fetching data.");
    }
  }, [dataToSend])

  useEffect(() => {
    fetchData();
  }, [dataToSend, fetchData])

  const [columnWidth, setColumnWidth] = useState<number>(40); // Initial width set to 40%
    const isDragging = useRef<boolean>(false);

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        if (!isDragging.current) return;
        const clientX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
        const newWidth = (clientX / window.innerWidth) * 100;
        if (newWidth >= 0 && newWidth <= 100) {
            setColumnWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, []);


  return (
    <div className="z-40 w-screen h-screen">
        <div className="fixed flex mt-0 h-[calc(100vh-4rem)] w-screen">
            <div
                className="px-4 h-full w-full overflow-auto"
                style={{width: `${columnWidth}%`}}
            >
              <br />
              {data}
              <br /><br />
            </div>
            <div
                className="resizer w-2 bg-gray-300 cursor-col-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            />
            <div
                className="h-full w-full"
                style={{width: `${100 - columnWidth}%`}}
            >
                <ExcalidrawWrapper />
            </div>
        </div>
    </div>
  );

};

export default Page;