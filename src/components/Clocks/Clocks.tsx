import "./Clocks.css";
import { memo, useEffect, useRef, useState } from "react";
import { addMinutes, differenceInMilliseconds, isSameMinute, startOfDay, startOfMinute, subHours } from 'date-fns'

import { ClockTypes } from "../../types/Clock";
import DigitalClock from "../Clock";
import AnalogClock from "../AnalogClock/AnalogClock";
import { ONE_MINUTE_IN_MS } from "../../constants";

interface ClocksProps {
  clockType?: ClockTypes,
};

const HOURS = 12;
const MINUTES = 60;
const NUBMER_OF_CLOCKS = HOURS * MINUTES;

const totalClocks = Array.from<number>({ length: NUBMER_OF_CLOCKS });

const Clocks = memo((props: ClocksProps) => {
  const { clockType } = props;
  const [currentMinute, setCurrentMinutes] = useState<Date>();

  const timeoutId = useRef<NodeJS.Timer>();
  const intervalId = useRef<NodeJS.Timer>();

  const initialDate = Date.now();
  const zeroHour = startOfDay(initialDate);

  const Clock = clockType === ClockTypes.ANALOG ? AnalogClock : DigitalClock;

  useEffect(() => {
    // set initial minute on page load
    const initialMinute = startOfMinute(initialDate);
    setCurrentMinutes(initialMinute);
    console.log('Initial trigger', initialMinute);

    // configure the interval to start int the next full minute
    const ellapsedMsecs = differenceInMilliseconds(initialDate, initialMinute);
    const delayToFirstIteration = ONE_MINUTE_IN_MS - ellapsedMsecs;

    const intervalFn = () => {
      const currentDate = new Date();
      setCurrentMinutes(currentDate);
      console.log('Full minute trigger', currentDate);
    };

    const timeOutFn = () => {
      setCurrentMinutes(new Date());

      // update the clocks every full minute
      intervalId.current = setInterval(intervalFn, ONE_MINUTE_IN_MS);
      clearTimeout(timeoutId.current);
    };

    timeoutId.current = setTimeout(timeOutFn, delayToFirstIteration);

    return () => {
      if(timeoutId.current) clearTimeout(timeoutId.current);
      if(intervalId.current) clearInterval(intervalId.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Probably this can be optmized
  const checkIsEnabled = (ownTime: Date) => currentMinute ? isSameMinute(ownTime, currentMinute) || isSameMinute(ownTime, subHours(currentMinute, 12)) : false;

  return (
    <section className="clocks">
      { totalClocks.map((_, minute) => {
        const ownTime = addMinutes(zeroHour, minute);
        return <Clock
          key={minute}
          ownTime={ownTime.valueOf()}
          isEnabled={checkIsEnabled(ownTime)}
          />
        })
      }
    </section>
  )
})

export default Clocks;
