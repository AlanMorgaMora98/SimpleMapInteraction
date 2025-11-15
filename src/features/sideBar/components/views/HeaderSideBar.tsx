import { CountryIcon } from "@/assets/Icons/index"
import { ModeToggle } from "@/components/mode-toggle"

export default function HeaderSideBarView () {
  return (
    <header className="flex items-center justify-between p-4 mb-4 relative">

      <div className="shrink-0">
        <CountryIcon className="countryIcon w-8 h-8 md:w-15 md:h-15 animate-rotate-y hover:pause-anim" />
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold text-center flex-1 mx-2 sm:mx-4 custom-font">
        Mexico Routing
      </h1>

      <div className="shrink-0">
        <ModeToggle />
      </div>
    </header>

  )
}