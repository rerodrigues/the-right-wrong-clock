import "./Wall.css";
import { memo } from "react";
import Clocks from "../Clocks/Clocks";

interface WallProps {

}

const Wall = memo((props: WallProps) => {
  return (
    <section className="wall">
      <h1 className="wall_title">The Right Wrong Clock</h1>
      <Clocks />
    </section>
  )
})

export default Wall;
