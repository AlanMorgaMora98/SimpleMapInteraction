import { ChevronsUpDownIcon, CheckIcon} from "@/assets/Icons/index"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { State, Municipality } from "@/types/locations.types"
import { useIsMobile } from "@/hooks/use-mobile"

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

  const isMobile = useIsMobile()


  if (isMobile) {
    return (
      <>
      <div className="flex w-full flex-wrap gap-4">
        <div className="w-full">
          <Drawer open={openState} onOpenChange={handleOpenState}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-10 justify-start"
              >
                {selectedState ? selectedState.title : "Select State..."}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="z-10000">
              <StatesList selectedState={selectedState} statesList={statesList} handleSelectedState={handleSelectedState}/>
            </DrawerContent>
          </Drawer>
        </div>

        <div className="w-full">
          <Drawer open={openMunicipality} onOpenChange={handleOpenMunicipality}>
            <DrawerTrigger asChild>
              <Button
                disabled={!selectedState}
                variant="outline"
                className="w-full h-10 justify-start"
              >
                {selectedMunicipality ? selectedMunicipality.municipality : "Select Municipality..."}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="z-10000">
              <MunicipalitiesList selectedMunicipality={selectedMunicipality} municipalitiesList={municipalitiesList} handleSelectedMunicipality={handleSelectedMunicipality}/>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      </>
    )
  }

  return (
    <div className="flex w-full flex-wrap gap-4">
      <div className="w-full">
        <Popover open={openState} onOpenChange={(value) => handleOpenState(value)}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openState}
              className="h-10 justify-between px-3 w-full"
            >
              {selectedState ? selectedState.title : "Select State..."}
              <ChevronsUpDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0 z-10000">
            <StatesList selectedState={selectedState} statesList={statesList} handleSelectedState={handleSelectedState}/>
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full">
        <Popover open={openMunicipality} onOpenChange={handleOpenMunicipality}>
          <PopoverTrigger asChild>
            <Button
              disabled={!selectedState}
              variant="outline"
              role="combobox"
              aria-expanded={openMunicipality}
              className="h-10 justify-between px-3 w-full"
            >
              {selectedMunicipality
                ? selectedMunicipality.municipality
                : "Select municipality..."}
              <ChevronsUpDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0 z-10000">
            <MunicipalitiesList selectedMunicipality={selectedMunicipality} municipalitiesList={municipalitiesList} handleSelectedMunicipality={handleSelectedMunicipality}/>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

function StatesList({ selectedState, statesList, handleSelectedState }: { selectedState: State | null, statesList: State[] ,handleSelectedState: (state: State) => void }) {
  return (
    <Command>
      <CommandInput placeholder="Search state..." className="h-10" />
      <CommandList >
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
  )
}

function MunicipalitiesList({ selectedMunicipality, municipalitiesList, handleSelectedMunicipality }: { selectedMunicipality: Municipality | null, municipalitiesList: Municipality[], handleSelectedMunicipality: (municipality: Municipality) => void }) {
  return (
    <Command>
      <CommandInput placeholder="Search municipality..." className="h-10" />
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
  )
}
