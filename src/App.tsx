import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllProjects from './pages/AllProjects';

function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-text-primary">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Content */}
      <Header />
      <main>
        <Hero />
        <div className="section-sep" />
        <Projects />
        <div className="section-sep" />
        <About />
        <div className="section-sep" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
