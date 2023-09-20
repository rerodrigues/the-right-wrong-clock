import './Clock.sass';
import { memo, useEffect, useRef, useState } from "react";
import { ClockProps } from '../../types/Clock';
import { ONE_SECOND_IN_MS } from '../../constants';

const Clock = memo((props: ClockProps) => {
  const { ownTime, isEnabled } = props;
  const [time, setTime] = useState<Date>(new Date(ownTime));
  const timerId = useRef<NodeJS.Timer>();

  const className = isEnabled ? 'clock clock--lit' : 'clock';
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
    if(isEnabled) {
      const intervalFn = () => {
        setTime(new Date());
      };

      setTime(new Date());
      timerId.current = setInterval(intervalFn, ONE_SECOND_IN_MS);

      return () => {
        if(timerId.current) clearTimeout(timerId.current);
      }
    }
  },[isEnabled, ownTime]);

  return (
    <div className="clock-container">
      <div className={className}>
        <span className='clock_hour'>{hour}</span>
        <span className='clock_minute'>{minute}</span>
        <span className='clock_seconds'>{seconds}</span>
      </div>
    </div>
  );
});

export default Clock;
