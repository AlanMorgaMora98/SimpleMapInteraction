import type { State, Municipality } from "@/types/locations.types"

export type ID = number

export interface LocationData {
  id: ID
  label: string
  coordinates: { lat: number; lng: number } | null
  selectedState: State | null
  selectedMunicipality: Municipality | null
}

export interface handleLocationChange {
  id: ID
  coordinates: { lat: number; lng: number }
  selectedState: State
  selectedMunicipality: Municipality
}