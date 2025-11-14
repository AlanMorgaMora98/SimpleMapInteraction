import type { State, Municipality } from "@/types/locations.types"

export type ID = number

export interface LocationData {
  id: ID
  label: string
  coordinates: { lat: number; lng: number } | null
  selectedState: State | null
  selectedMunicipality: Municipality | null
}