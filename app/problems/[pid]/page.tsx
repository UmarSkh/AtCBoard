"use client"

import React from "react"
import { useParams } from "next/navigation"

const Page = () => {
  const params = useParams()

  const pid = params.pid

  return <div>Hello {pid}</div>
}

export default Page
