// "use client";

// import React from "react";
// import { useSearchParams } from "next/navigation";

// const Page = () => {
//   const searchParams = useSearchParams();
//   const encodedData = searchParams.get('dataAsString');

//   if (!encodedData) {
//     return <div>No data found.</div>;
//   }

//   try {
//     const decodedData = decodeURIComponent(encodedData);
//     const jsonData = JSON.parse(decodedData);

//     console.log("problems start ..........");
//     console.log(jsonData.c0);
//     console.log(jsonData.c2);
//     console.log("problems end ..........");



//     return (
//       <>
//         <h1>Welcome</h1>
//         <div dangerouslySetInnerHTML={{ __html: jsonData.c0 }} />
//         <hr />
//         <div dangerouslySetInnerHTML={{ __html: jsonData.c2 }} />
//       </>
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return <div>Error: Invalid data received.</div>;
//   }
// };

// export default Page;

import React from 'react'

const Problmes = () => {
  return (
    <div>Problmes</div>
  )
}

export default Problmes