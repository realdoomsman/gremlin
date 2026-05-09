import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import ScanlineOverlay from './components/ScanlineOverlay';
import Header from './components/Header';
import AsciiGremlin from './components/AsciiGremlin';
import RivalrySection from './components/RivalrySection';
import BurnMonitor from './components/BurnMonitor';
import Portal from './components/Portal';
import Footer from './components/Footer';

export default function App() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <ScanlineOverlay />

      {booted && (
        <>
          <Header />
          <main>
            <AsciiGremlin />
            <RivalrySection />
            <BurnMonitor />
            <Portal />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
