import "./Wall.css";
import { memo } from "react";
import Clocks from "../Clocks/Clocks";
import { ClockTypes } from "../../types/Clock";

interface WallProps {

}

const Wall = memo((props: WallProps) => {
  return (
    <section className="wall">
      <h1 className="wall_title">The Right Wrong Clock</h1>
      <Clocks clockType={ClockTypes.ANALOG}/>
      <a className="wall_source-code" href="https://github.com/rerodrigues/the-right-wrong-clock">source code</a>
    </section>
  )
})

export default Wall;
