"use client"

import { useState } from "react"

export function Title() {
  const [ind, setind] = useState(0)

  const titles = ["Hello", "Bye"]

  function handleSubmit() {
    // console.log("clicked")

    setind(1 - ind)
  }

  return (
    <div>
      <h1 className="text-red-500 font-serif font-bold text-4xl">
        {titles[ind]}
      </h1>
      <p className="text-blue-500 font-mono">title description</p>
      <button
        className="bg-green-400 rounded-md p-2 mt-5 hover:bg-green-600"
        onClick={handleSubmit}
      >
        Toggle Title
      </button>
    </div>
  )
}
