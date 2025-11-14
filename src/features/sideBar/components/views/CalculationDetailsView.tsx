import { DistanceIcon, ClockIcon, GasolineIcon, MoneyIcon } from "@/assets/Icons/index"

interface CalculationDetailsView {
  timeHours: number
  timeMinutes: number
  distanceKM: number
  usedLitersFuel: number
  totalExpenses: number
}

export default function CalculationDetailsView ({timeHours, timeMinutes, distanceKM, usedLitersFuel, totalExpenses }: CalculationDetailsView) {
  
  return (
    <div className="flex flex-col m-6 pt-4 pl-6 pr-6 pb-6 gap-4 bg-muted/50 text-bg-muted hover:bg-muted rounded-(--radius) border border-border transition-colors">
      <p className="custom-font text-center text-lg font-semibold mb-2">RESULT</p>
      <div className="flex justify-between flex-row flex-wrap flex- w-full gap-4">

        <div className="flex flex-wrap items-center gap-2">
          <DistanceIcon className="w-5 h-5" />
          <p>{new Intl.NumberFormat("es-MX").format(distanceKM ?? 0)} KM</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ClockIcon className="w-5 h-5" />
          <p>{timeHours} hours, {timeMinutes} minutes</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <GasolineIcon className="w-5 h-5" />
        <p>{usedLitersFuel ?? "--"} Liters</p>
      </div>

      <div className="flex justify-end flex-wrap items-center gap-2 border-t-2 p-2.5">
        <MoneyIcon className="w-5 h-5" />
        <p>{new Intl.NumberFormat("es-MX").format(totalExpenses ?? 0)} MXN</p>
      </div>
      
    </div>

  )    
}