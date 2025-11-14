import { useState } from "react";

interface TimeFormat {
  hours: number
  minutes: number
}

export const useCalculationTimeAndKM = () => {

  const [time, setTime] = useState<TimeFormat>({ hours: 0, minutes: 0})

  const getCalculationTime = (minutesRoute: number)  => {
    const hours = Math.floor(minutesRoute / 60);
    const minutes = minutesRoute % 60;
    setTime({ hours: hours, minutes: Math.round(minutes)})
  }

  return { time, getCalculationTime }

}

export default useCalculationTimeAndKM;