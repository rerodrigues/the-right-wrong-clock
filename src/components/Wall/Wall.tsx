import "./Wall.sass";
import { memo, useState } from "react";
import Clocks from "../Clocks/Clocks";
import { ClockTypes } from "../../types/Clock";
import Switch from "../Switch/Switch";

const Wall = memo(() => {
  const [clockType, setClockType] = useState(ClockTypes.ANALOG);

  const changeClockType = (value: boolean) => {
    const mode = value ? ClockTypes.DIGITAL : ClockTypes.ANALOG;
    const timeoutId = setTimeout(() => {
      setClockType(mode);
      clearTimeout(timeoutId)
    }, 300);
  }

  return (
    <section className="wall">
      <header className="wall_header">
        <h1 className="wall_title">The Right Wrong Clock</h1>
        <div className="wall_switch">
          <Switch onLabel="Digital" offLabel="Analog" onChange={changeClockType}/>
        </div>
      </header>
      <main>
        <Clocks clockType={clockType}/>
        <a className="wall_source-code" href="https://github.com/rerodrigues/the-right-wrong-clock">source code</a>
      </main>
    </section>
  )
})

Wall.displayName = 'Wall'

export default Wall;
