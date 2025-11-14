import { useState } from "react";

interface useCalculationFuelAndTotalProps {
  vehiclePerformanceKM: number
  gasolinePrice: number
  distanceKM: number
}

export const useCalculationFuelAndTotal = () => {

  const [usedLitersFuel, setUsedLitersFuel] = useState<number>(0)
  const [totalExpenses, setTotalExpenses] = useState<number>(0)

  const getCalculationFuelAndTotal = ({vehiclePerformanceKM, gasolinePrice, distanceKM}: useCalculationFuelAndTotalProps) => {
    if (vehiclePerformanceKM > 0 && gasolinePrice > 0 && distanceKM > 0) {
      const performanceGasoline = distanceKM / vehiclePerformanceKM
      const totalPrice = performanceGasoline * gasolinePrice
      setTotalExpenses(Math.round(totalPrice * 100) / 100)
      setUsedLitersFuel(Math.round(performanceGasoline * 100) / 100)
    }
  }

  return { usedLitersFuel, totalExpenses, getCalculationFuelAndTotal }

}

export default useCalculationFuelAndTotal;