import HeroSection from './sections/HeroSection'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LazySection from './components/LazySection'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { useActiveSection } from './lib/useActiveSection'

const NAV_SECTION_IDS = ['about', 'transformations', 'programs', 'contact'] as const

function App() {
  const activeId = useActiveSection([...NAV_SECTION_IDS], {
    rootMargin: '-30% 0px -60% 0px',
    threshold: [0.1, 0.25],
  })
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar activeId={activeId} />

      <main id="main" className="main">
        <HeroSection />

        <LazySection
          id="about"
          title="About"
          minHeight={520}
          load={() => import('./sections/AboutSection')}
        />
        <LazySection
          id="transformations"
          title="Transformations"
          minHeight={720}
          load={() => import('./sections/TransformationsSection')}
        />
        <LazySection
          id="programs"
          title="Programs"
          minHeight={620}
          load={() => import('./sections/ProgramsSection')}
        />
        <LazySection
          id="contact"
          title="Contact"
          minHeight={640}
          load={() => import('./sections/ContactSection')}
        />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
