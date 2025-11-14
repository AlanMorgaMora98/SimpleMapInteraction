import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RouteSettingsViewProps {
  gasolinesList: {label: string; price: number}[]
  selectedGasoline: {label: string; price: number}
  kmPerLiters: number
  kmDefaultValue: number[]
  maxKmPerLiters: number
  minKmPerLiters: number
  stepsKmSlider: number
  handleSelectedKM: (value: number) => void
  handleSelectedGasoline: (value: string) => void
}

export default function RouteSetttingsView ({gasolinesList, selectedGasoline, kmPerLiters, kmDefaultValue, maxKmPerLiters, minKmPerLiters, stepsKmSlider, handleSelectedKM, handleSelectedGasoline }: RouteSettingsViewProps) {
  return (
    <div className={"relative flex flex-wrap w-full p-6 gap-4"}>

      <div className="flex-1">

        <p className="w-full text-center">{kmPerLiters} KM/L</p>

        <Slider
          className="widthAndHeightButtons w-full"
          onValueChange={(value) => handleSelectedKM(value[0])}
          defaultValue={kmDefaultValue}
          max={maxKmPerLiters}
          min={minKmPerLiters}
          step={stepsKmSlider}
        />

      </div>
      
      <div className="flex-1 justify-self-center">
        <p className="w-full text-center">Gasolines</p>

        <Select
          value={JSON.stringify(selectedGasoline)}
          onValueChange={handleSelectedGasoline}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a gasoline" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Gasolines</SelectLabel>
              {gasolinesList.map((gasoline) => (
                <SelectItem
                  key={gasoline.label}
                  value={JSON.stringify(gasoline)}
                >
                  {gasoline.label} - ${gasoline.price.toFixed(2) } MXN
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

    </div>
        
    )
}