"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams(); 
  const [data, setData] = useState("");

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if(dataParam){
      const decodedData = decodeURIComponent(dataParam);
      setData(decodedData);
    }
  }, [searchParams])

  return <div>Problems: {data}</div>
}

export default Page
