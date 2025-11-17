import { useEffect, useState } from "react"
import states from "@/data/mexico/states.json"
import type { State, Municipality} from "@/types/locations.types.ts"
import type { LocationData } from "../types/location"
const municipalitiesModules = import.meta.glob("@/data/mexico/statesMexico/*.json")
import type { handleLocationChange } from "../types/location"

import LocationItemView from "../views/LocationItemView"

interface LocationItemProps {
  location: LocationData
  onChange: (data: handleLocationChange) => void
  resetTrigger?: boolean
}

export default function LocationItemContainer({ location, onChange }: LocationItemProps) {
  const [openState, setOpenState] = useState<boolean>(false)
  const [openMunicipality, setOpenMunicipality] = useState<boolean>(false)
  const [selectedState, setSelectedState] = useState<State | null>(location.selectedState)
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [selectedMunicipality, setSelectedMunicipality] = useState<Municipality | null>(location.selectedMunicipality)

  useEffect(() => {
    setSelectedState(location.selectedState)
    setSelectedMunicipality(location.selectedMunicipality)
  }, [location])

  useEffect(() => {
    const searchMunicipalities = async (filePath: string) => {
      const loader = municipalitiesModules[filePath]
      if (!loader) throw new Error(`File not founded: ${filePath}`)
      const module = (await loader()) as { default: Municipality[] }
      setMunicipalities(module.default)
    }

    if (selectedState?.children) {
      searchMunicipalities(`/src/${selectedState.children}`)
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedState && selectedMunicipality) {
      onChange({
       id: location.id,
       coordinates: {
        lat: selectedMunicipality.latitude,
        lng: selectedMunicipality.longitude,
      },
      selectedState: selectedState,
      selectedMunicipality: selectedMunicipality
    })
    }
  }, [selectedMunicipality])

  const handleSelectedState = (state: State) => {
    setSelectedState(state)
    setSelectedMunicipality(null)
    setOpenState(false)
}

  const handleSelectedMunicipality = (municipality: Municipality) => {
    setSelectedMunicipality(municipality)
    setOpenMunicipality(false)
  }

  const handleOpenState = (value: boolean) => {
    setOpenState(value)
  }

  const handleOpenMunicipality = (value: boolean) => {
    setOpenMunicipality(value)
  }

  return (
    <LocationItemView
      openState={openState}
      openMunicipality={openMunicipality}
      statesList={states}
      municipalitiesList={municipalities}
      selectedState={selectedState}
      selectedMunicipality={selectedMunicipality}
      handleOpenState={handleOpenState}
      handleOpenMunicipality={handleOpenMunicipality}
      handleSelectedState={handleSelectedState}
      handleSelectedMunicipality={handleSelectedMunicipality}
    />
  )
}
