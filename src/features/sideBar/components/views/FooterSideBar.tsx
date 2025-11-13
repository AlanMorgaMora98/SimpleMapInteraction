
import { GithubIcon, LinkedinIcon, EmailIcon } from "@/assets/Icons/index"

export default function FooterSideBarView () {
  return (
    <footer className="relative flex justify-center flex-column flex-wrap gap-8 p-6">

      <a href="https://github.com/AlanMorgaMora98" target="_blank" rel="noopener noreferrer" aria-label="Github">
        <GithubIcon className="icon-links"/>
      </a>
      
      <a href="https://www.linkedin.com/in/alanmorgado/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <LinkedinIcon className="icon-links"/>
      </a>

      <a href="mailto:alanmorgadomora@gmail.com" aria-label="Send email to Alan">
        <EmailIcon className="icon-links"/>
      </a>

      <p className="absolute bottom-0 right-0  custom-font">V 1.0</p>

      </footer>
    )
}