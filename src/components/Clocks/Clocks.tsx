import "./Clocks.css";
import { memo, useEffect, useState } from "react";
import Clock from "../Clock";
import { addHours, addMinutes, differenceInMilliseconds, isSameMinute, startOfDay, startOfMinute } from 'date-fns'

interface ClocksProps {

}

const HOURS = 12;
const MINUTES = 60;
const NUBMER_OF_CLOCKS = HOURS * MINUTES;
const ONE_MINUTE_IN_MS = 1000 * 60;

const totalClocks = Array.from<number>({ length: NUBMER_OF_CLOCKS });

const Clocks = memo((props: ClocksProps) => {
  const [currentMinute, setCurrentMinutes] = useState<Date>();

  const initialDate = Date.now();
  const zeroHour = startOfDay(initialDate);

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
      setInterval(intervalFn, ONE_MINUTE_IN_MS);
      clearTimeout(initialTimeOutId);
    };

    const initialTimeOutId = setTimeout(timeOutFn, delayToFirstIteration);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Probably this can be optmized
  const checkIsEnabled = (ownTime: Date, minute: number) => currentMinute ? isSameMinute(ownTime, currentMinute) || isSameMinute(addHours(ownTime, 12), currentMinute) : false;

  return (
    <section className="clocks">
      { totalClocks.map((_, minute) => {
        const ownTime = addMinutes(zeroHour, minute);
        return <Clock
          key={minute}
          ownTime={ownTime.valueOf()}
          isEnabled={checkIsEnabled(ownTime, minute)}
          />
        })
      }
    </section>
  )
})

export default Clocks;
