"use client"

import dynamic from "next/dynamic"

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/custom/excali")).default,
  {
    ssr: false,
  }
)

export default function Page() {
  return(
  <>
    <h1 className="text-center text-3xl py-4">Excalidraw Example</h1>
    <div style={ {height: "500px", border: "3px solid red"} }>
      <ExcalidrawWrapper />
    </div>
  </>
  );
}
