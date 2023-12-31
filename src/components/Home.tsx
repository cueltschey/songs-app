import flowers from "./assets/flowers.jpg"
import butterfly from "./assets/butterfly.jpg"
import candle from "./assets/candle.jpg"
import { useState } from "react"

let images = [candle,butterfly,flowers]

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  async function autoscroll(){
    while(true){
      await new Promise(f => setTimeout(f, 10000))
      setActiveIndex(activeIndex+1)
      if(activeIndex === 2){
        setActiveIndex(0)
      }
    }
  }
  autoscroll()

  return (
    <div className="carousel slide" data-ride="carousel">
      {images.map((item, index) => (
        <div className={activeIndex === index ? "carousel-item active" : "carousel-item"}>
          <img 
          className="d-block w-100 img-fluid"
          id="carimg"
          src={item} 
          />
          <a 
          className="carousel-control-prev"
          id="nextprev" 
          onClick={() => {index > 0 ? setActiveIndex(index-1) : setActiveIndex(index)}}>
            ⬅️ prev
          </a>
          <a 
          className="carousel-control-next"
          id = "nextprev"
          onClick={() => {index < 2 ? setActiveIndex(index+1) : setActiveIndex(index)}}>
            next ➡️
          </a>
        </div>
      ))}
    </div>
  )
}

export default Home
