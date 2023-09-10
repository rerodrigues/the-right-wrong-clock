import './AnalogClock.css';
import { ClockProps } from '../../types/Clock';

import { memo, useEffect, useRef, useState } from "react";

const AnalogClock = memo((props: ClockProps) => {
  const { ownTime, isEnabled } = props;
  const [time, setTime] = useState<Date>(new Date(ownTime));
  const timerId = useRef<NodeJS.Timer>();

  const className = isEnabled ? 'analog-clock analog-clock--lit' : 'analog-clock';

  useEffect(() => {
    if(isEnabled) {
      timerId.current = setInterval(() => {
        setTime(new Date());
      }, 1000);

      return () => {
        clearInterval(timerId.current);
      }
    }
  },[isEnabled, ownTime]);

  return (
    <div className="analog-clock-container">
      <div className={className}>
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${time.getHours() * 30}deg)`
          }}
        />
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${time.getMinutes() * 6}deg)`
          }}
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${time.getSeconds() * 6}deg)`
          }}
        />
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
      </div>
    </div>
  );
});

export default AnalogClock;
