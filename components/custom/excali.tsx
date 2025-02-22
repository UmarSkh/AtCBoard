"use client"
import { Excalidraw} from "@excalidraw/excalidraw"

// import "@excalidraw/excalidraw/index.css"

const ExcalidrawWrapper: React.FC = () => {
  // const elements = convertToExcalidrawElements([
  //   {
  //     type: "rectangle",
  //     x: 100,
  //     y: 250,
  //   },
  //   {
  //     type: "ellipse",
  //     x: 250,
  //     y: 250,
  //   },
  //   {
  //     type: "diamond",
  //     x: 380,
  //     y: 250,
  //   },
  // ])

  // // console.info(
  // //   convertToExcalidrawElements([
  // //     {
  // //       type: "rectangle",
  // //       id: "rect-1",
  // //       width: 186.47265625,
  // //       height: 141.9765625,
  // //     },
  // //   ])
  // // )

  return (
    <div style={{ height: "500px"}}>
      <Excalidraw/>
    </div>
  )
}
export default ExcalidrawWrapper