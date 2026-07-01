import logoIcon from '../assets/logo.svg'
import fbIcon from '../assets/Facebook.svg'
import igIcon from '../assets/Instagram.svg'
import twIcon from '../assets/Twitter.svg'

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-navy-950/90 via-navy-700/80 to-navy-900/90 px-6 pt-24 pb-8 lg:px-8">
      <div className="mx-auto w-11/12 max-w-360">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="flex items-center justify-center md:justify-start">
            <img src={logoIcon} alt="WonderTales Hub" className="h-32 object-contain" />
          </div>
          <div className="space-y-3 text-[14px] text-white/95 font-light text-center md:text-right pb-4">
            <p>Contact E-mail: <a href="mailto:info@wondertaleshub.com" className="underline hover:text-gold transition">info@wondertaleshub.com</a></p>
            <p>Support E-mail: <a href="mailto:info@wondertaleshub.com" className="underline hover:text-gold transition">info@wondertaleshub.com</a></p>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-[13px] text-white/50 font-light space-y-1 text-center sm:text-left">
            <p>© 2026 Wonder Tales Hub, Inc. All rights reserved.</p>
            <p className="text-white/40 text-[12px]">Wonder Tales Hub is COPPA-compliant. No children's personal data is collected without parental consent.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:opacity-80">
              <img src={twIcon} alt="Twitter" className="h-8 w-8" />
            </a>
            <a href="#" className="transition hover:opacity-80">
              <img src={igIcon} alt="Instagram" className="h-8 w-8" />
            </a>
            <a href="#" className="transition hover:opacity-80">
              <img src={fbIcon} alt="Facebook" className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
