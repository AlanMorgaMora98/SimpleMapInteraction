import { CountryIcon } from "@/assets/Icons/index"

export default function HeaderSideBarView () {
  return (
    <header className="relative flex flex-wrap items-center p-4 mb-4">

      <CountryIcon className="countryIcon animate-rotate-y hover:pause-anim"/>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl custom-font">Mexico Routing</h1>

    </header>
  )
}