import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './screens/LandingPage';
import Layout from './components/Layout';

function App() {
  const shouldAutostart = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('started') === '1' || params.get('export') === '1';
  }, []);

  const [started, setStarted] = useState(shouldAutostart);

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div
          key="landing"
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.06 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-50 bg-brand-black"
        >
          <LandingPage onStart={() => setStarted(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="presentation"
          initial={{ opacity: 0, filter: 'blur(6px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 bg-brand-black"
        >
          <Layout />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
