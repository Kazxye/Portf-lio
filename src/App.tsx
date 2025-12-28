import { LanguageProvider } from './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background text-text-primary">
        {/* Noise Overlay */}
        <div className="noise-overlay" />
        
        {/* Content */}
        <Header />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
