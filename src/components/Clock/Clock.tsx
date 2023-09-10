import './Clock.css';
import { getHours, getMinutes } from 'date-fns';
import { memo } from "react";
import { ClockProps } from '../../types/Clock';

const Clock = memo((props: ClockProps) => {
  const { ownTime, isEnabled } = props;
  const className = isEnabled ? 'clock clock--lit' : 'clock';
  const hour = getHours(ownTime).toString().padStart(2, '0');
  const minute = getMinutes(ownTime).toString().padStart(2, '0');

  return (
    <div className={className}>
      <div className='clock_hour'>{hour}</div>
      <div className='clock_minute'>{minute}</div>
    </div>
  );
});

export default Clock;
