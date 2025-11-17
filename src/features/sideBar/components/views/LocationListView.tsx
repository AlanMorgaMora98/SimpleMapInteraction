import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import LocationItemContainer from "../containers/LocationitemContainer"
import type { LocationData, ID } from "../types/location"
import type { handleLocationChange } from "../types/location"

import { AddIcon, CalculatorIcon, TrashIcon, LocationIcon, SortIcon } from "@/assets/Icons/index"

interface LocationListViewProps {
  locations: LocationData[]
  allowRouting: boolean
  isLoading: boolean
  handleLocationChange: ({id, coordinates, selectedState, selectedMunicipality}: handleLocationChange) => void
  removeLocation: (id: ID) => void
  addLocation: () => void
  swapLocations: (position1: number, position2: number) => void
  handleRouting: () => void
}

export default function LocationListView({locations, allowRouting, isLoading, handleLocationChange, removeLocation, addLocation, swapLocations, handleRouting }: LocationListViewProps) {
  
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold self-center custom-font">Locations</h2>
        <>
          <div className="relative pl-6 pr-6 space-y-4 w-full">
            {locations.map((location, index) => (
              <div key={location.id} className="relative w-full" style={{ ["--icon-color" as string]: `var(--colorLocation${index})` }} >

                <LocationIcon className="absolute top-3 -left-5 z-1 text-(--icon-color)"  />

                {index !== locations.length - 1 && (
                  <div className="absolute top-5 left-[-13px] h-[calc(100%+1rem)] border-l-2 border-dashed border-muted-foreground/80" />
                )}

                <div className="flex flex-wrap items-start w-full gap-4 mb-8">
                  <div className="flex-1 w-full">
                    <LocationItemContainer
                      location={location}
                      onChange={({ coordinates, selectedState, selectedMunicipality }) =>
                        handleLocationChange({id: location.id, coordinates: coordinates, selectedState: selectedState, selectedMunicipality:selectedMunicipality})
                      }
                    />
                  </div>

                  <div className={`
                    ${locations.length > 2 ? "flex flex-col gap-4" : "flex w-full gap-4 justify-center"}
                    `}
                  > 
                    {locations.length > 2 && (
                      <Button
                        variant="destructive"
                        onClick={() => removeLocation(location.id)}
                        className="h-10 w-10 shrink-0"
                      >
                        <TrashIcon className="w-5 h-5 text-white" />
                      </Button>
                    )}

                    {index <= locations.length - 2 && (
                      <Button
                        variant="outline"
                        onClick={() => swapLocations(index, index + 1)}
                        className="h-10 w-10 shrink-0"
                      >
                        <SortIcon className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </div>

                

              </div>
            ))}
          </div>

        <div className="flex w-full pl-6 pr-6 space-y-6 gap-4 justify-end">

          <Button
            className={`
              ${isLoading ? "bg-(--colorRed) hover:bg-(--colorRed)" : "hover:bg-(--colorRed)"}
            `}
            onClick={handleRouting}
            disabled={!allowRouting}
          >
            { isLoading ? ( <Spinner className="size-6" /> ) : ( <CalculatorIcon />)}
            { isLoading ? ( "Calculating" ) : ( "Calculate" ) } 
          </Button>

          {locations.length < 5 && (
            <Button
              className="hover:bg-(--colorGreen)"
              onClick={addLocation}
              disabled={locations.length >= 5}
            >
              <AddIcon/> Add
            </Button>
          )}
    
        </div>
        </>

    </div>
  )
}
