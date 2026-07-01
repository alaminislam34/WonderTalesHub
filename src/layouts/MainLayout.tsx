import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import MagicCursor from '../components/MagicCursor'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-navy-950/90 via-navy-700/80 to-navy-900/90 text-slate-200">
      <MagicCursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
