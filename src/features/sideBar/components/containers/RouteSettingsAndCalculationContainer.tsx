import { useState, useEffect } from "react"

import { useMapContext } from "@/features/Map/context/MapContext"

//CUSTOM HOOKS
import useCalculationTimeAndKM from "../../hooks/useCalculationTimeAndKM"
import useCalculationFuelAndTotal from "../../hooks/useCalculationFuel"

//LOCAL IMPORTS
import RouteSetttingsView from "../views/RouteSettingsView"
import CalculationDetailsView from "../views/CalculationDetailsView"

const gasolineList = [
  { label: "Magna", price: 23.51},
  { label: "Premium", price: 25.42},
  { label: "Diesel", price: 25.92}
]

export default function RouteSettingsAndCalculationContainer () {

  const [gasoline, setGasoline] = useState<{ label: string; price: number }>(gasolineList[0])
  const [KMxL, setKMxL] = useState<number>(12)

  const handleSelectedGasoline = (value: string) => {
    const gasObj = JSON.parse(value) as { label: string; price: number }
    setGasoline(gasObj)
  }

  const handleSelectedKM = (value: number) => {
    setKMxL(value)
  }

  //CUSTOM HOOKS
  const { time, getCalculationTime } = useCalculationTimeAndKM()
  const { usedLitersFuel, totalExpenses, getCalculationFuelAndTotal } = useCalculationFuelAndTotal()
  
  //CONTEXT HOOK
  const { data } = useMapContext()
  
  useEffect(() => {
    if (data) {
      if (data?.timeMinutesRoute) {
        getCalculationTime(data.timeMinutesRoute)
      }
      if(data?.distancekMRoute) {
        getCalculationFuelAndTotal({vehiclePerformanceKM: KMxL, gasolinePrice: gasoline.price, distanceKM: data?.distancekMRoute})
      }
    }
  }, [data, gasoline, KMxL])

  return (
    <>
      <RouteSetttingsView
        gasolinesList={gasolineList}
        selectedGasoline={gasoline}
        kmPerLiters={KMxL}
        kmDefaultValue={[KMxL]}
        maxKmPerLiters={40}
        minKmPerLiters={3}
        stepsKmSlider={0.5}
        handleSelectedKM={handleSelectedKM}
        handleSelectedGasoline={handleSelectedGasoline}
      />

      <CalculationDetailsView
        timeHours={time.hours}
        timeMinutes={time.minutes}
        distanceKM={data?.distancekMRoute ?? 0}
        usedLitersFuel={usedLitersFuel}
        totalExpenses={totalExpenses}
      />
    </>
  )
}





    