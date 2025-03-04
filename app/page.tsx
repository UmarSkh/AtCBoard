"use client"
import * as React from "react"
import { ACForm } from "@/components/custom/ac-form"
import { Title } from "@/components/custom/title"

export default function Home() {
  return (
    <div className="bg-blue-50 relative flex min-h-screen flex-col justify-center overflow-hidden py-6 sm:py-12">
      <div>
        <Title></Title>
      </div>
      <div className="w-96 relative border-2 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <ACForm></ACForm>
      </div>
    </div>
  )
}
