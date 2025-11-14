import { CountryIcon } from "@/assets/Icons/index"
import { ModeToggle } from "@/components/mode-toggle"

export default function HeaderSideBarView () {
  return (
    <header className="relative flex flex-wrap justify-between items-center p-4 mb-4">

      <CountryIcon className="countryIcon z-50 animate-rotate-y hover:pause-anim"/>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl custom-font font-semibold">Mexico Routing</h1>

      <ModeToggle />

    </header>
  )
}