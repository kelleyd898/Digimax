import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import PricingPage from './pages/PricingPage'
import ProcessPage from './pages/ProcessPage'
import AboutPage from './pages/AboutPage'
import ConfigurePage from './pages/ConfigurePage'
import Guide from '../src/pages/Guide'
import ScrollToTop from './components/ScrollToTop';
import GuideBrand from './pages/GuideBrand'

export default function App() {
  return (
    <>
     
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:id" element={<ServicePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/configure" element={<ConfigurePage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:code" element={<GuideBrand />} />
      </Routes>
    </>
  )
}