"use client"

import dynamic from "next/dynamic"

const ExcalidrawWrapper = dynamic(
  async () => (await import("@/components/custom/excali")).default,
  {
    ssr: false,
  }
)

export default function Page() {

  const pageTitle = "Default";

  return(
  <>
    <h1 className="text-center text-2xl py-4">Sketch Your Code.</h1>
    <div style={ {height: "500px"} }>
      <ExcalidrawWrapper probID={pageTitle}/>
    </div>
  </>
  );
}
