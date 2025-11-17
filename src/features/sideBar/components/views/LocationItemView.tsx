import { ChevronsUpDownIcon, CheckIcon} from "@/assets/Icons/index"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { State, Municipality } from "@/types/locations.types"

interface LocationItemContainer {
    openState: boolean
    openMunicipality: boolean
    statesList: State[]
    municipalitiesList: Municipality[]
    selectedState: State | null
    selectedMunicipality: Municipality | null
    handleOpenState: (value: boolean) => void
    handleOpenMunicipality: (value: boolean) => void
    handleSelectedState: (state: State) => void
    handleSelectedMunicipality: (municipality: Municipality) => void
}

export default function LocationItemView({ openState, openMunicipality, statesList, municipalitiesList, selectedState, selectedMunicipality, handleOpenState, handleOpenMunicipality, handleSelectedState, handleSelectedMunicipality }: LocationItemContainer) {

  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="flex-1">
        <Popover open={openState} onOpenChange={(value) => handleOpenState(value)}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openState}
              className="w-full h-10 justify-between px-3"
            >
              {selectedState ? selectedState.title : "Select State..."}
              <ChevronsUpDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0 z-10000">
            <Command>
              <CommandInput placeholder="Search state..." className="h-9" />
              <CommandList>
                <CommandEmpty>State not founded</CommandEmpty>
                <CommandGroup>
                  {statesList.map((state: State) => (
                    <CommandItem
                      key={state.title}
                      value={state.title}
                      onSelect={() => handleSelectedState(state)}
                    >     
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          selectedState?.title === state.title
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {state.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1">
        <Popover open={openMunicipality} onOpenChange={handleOpenMunicipality}>
          <PopoverTrigger asChild>
            <Button
              disabled={!selectedState}
              variant="outline"
              role="combobox"
              aria-expanded={openMunicipality}
              className="w-full h-10 justify-between px-3"
            >
              {selectedMunicipality
                ? selectedMunicipality.municipality
                : "Select municipality..."}
              <ChevronsUpDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0 z-10000">
            <Command>
              <CommandInput placeholder="Search municipality..." className="h-9" />
              <CommandList>
                <CommandEmpty>Municipality not founded</CommandEmpty>
                <CommandGroup>
                  {municipalitiesList.map((municipality: Municipality) => (
                    <CommandItem
                      key={municipality.municipality}
                      value={municipality.municipality}
                      onSelect={() => handleSelectedMunicipality(municipality)}
                    >
                      {municipality.municipality}
                      <CheckIcon
                        className={cn(
                          "ml-auto",
                          selectedMunicipality?.municipality ===
                            municipality.municipality
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
