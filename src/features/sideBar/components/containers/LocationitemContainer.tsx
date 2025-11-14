import { useEffect, useState } from "react"
import states from "@/data/mexico/states.json"
import type { State, Municipality} from "@/types/locations.types.ts"
import type { LocationData } from "../types/location"
const municipalitiesModules = import.meta.glob("@/data/mexico/statesMexico/*.json")

import LocationItemView from "../views/LocationItemView"

interface LocationItemProps {
  location: LocationData
  onChange: (data: {
    coordinates: { lat: number; lng: number }
    selectedState: State
    selectedMunicipality: Municipality
  }) => void
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
    if (selectedState && selectedMunicipality) {
      onChange({
       coordinates: {
        lat: selectedMunicipality.latitude,
        lng: selectedMunicipality.longitude,
      },
      selectedState,
      selectedMunicipality
    })
    }
  }, [selectedMunicipality])

  const handleSelectedState = async (state: State) => {
    try {
      setSelectedState(state)
      setSelectedMunicipality(null)
      const path = `/src/${state.children}`
      const loader = municipalitiesModules[path]
      if (!loader) throw new Error(`File not founded: ${path}`)
      const module = (await loader()) as { default: Municipality[] }
      setMunicipalities(module.default)
    } catch (error) {
      console.error("Error fetching municipalities:", error)
    } finally {
      setOpenState(false)
    }
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
