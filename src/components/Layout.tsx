import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundParticles from './BackgroundParticles';
import Sidebar from './Sidebar';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';
import IntroScene from '../screens/IntroScene';
import PhaseHistoricalScene from '../screens/PhaseHistoricalScene';
import PhaseContinuousScene from '../screens/PhaseContinuousScene';
import PhaseAgentsScene from '../screens/PhaseAgentsScene';

const SCREENS: ComponentType<ScreenProps>[] = [
  IntroScene,
  PhaseHistoricalScene,
  PhaseContinuousScene,
  PhaseAgentsScene,
];

function getInitialState() {
  const params = new URLSearchParams(window.location.search);
  const rawScene = Number(params.get('scene') ?? '1');
  const rawSlide = Number(params.get('slide') ?? '1');

  return {
    activeIdx: Number.isFinite(rawScene) ? Math.min(Math.max(rawScene - 1, 0), SCREENS.length - 1) : 0,
    step: Number.isFinite(rawSlide) ? Math.max(rawSlide - 1, 0) : 0,
  };
}

export default function Layout() {
  const initialState = useMemo(() => getInitialState(), []);
  const [activeIdx, setActiveIdx] = useState(initialState.activeIdx);
  const [step, setStep] = useState(initialState.step);

  const scene = SCENES[activeIdx]!;
  const maxStep = scene.steps.length - 1;
  const clampedStep = Math.min(step, maxStep);
  const CurrentScreen = SCREENS[activeIdx]!;

  useEffect(() => {
    setStep((current) => Math.min(current, SCENES[activeIdx]!.steps.length - 1));
  }, [activeIdx]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('started', '1');
    params.set('scene', String(activeIdx + 1));
    params.set('slide', String(clampedStep + 1));

    const query = params.toString();
    window.history.replaceState({}, '', `${window.location.pathname}?${query}`);
  }, [activeIdx, clampedStep]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-brand-black">
      <div className="relative h-full w-full overflow-hidden bg-brand-black shadow-2xl">
        <div className="absolute inset-0 bg-mesh opacity-30" />
        <BackgroundParticles />
        <div className="pointer-events-none absolute left-[-12%] top-[-8%] h-[38rem] w-[38rem] rounded-full bg-brand-green/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-12%] right-[6%] h-[30rem] w-[30rem] rounded-full bg-brand-turquoise/12 blur-[120px]" />

        <div className="absolute left-8 top-7 z-40">
          <div className="flex items-end gap-3">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              <span className="text-brand-green">d</span>aliä
            </h1>
            <p className="pb-1 text-[10px] font-semibold uppercase tracking-[0.38em] text-brand-turquoise/85">
              AI-Driven · People First
            </p>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 z-40 flex items-center pr-4">
          <Sidebar scenes={SCENES} activeIdx={activeIdx} onSelect={setActiveIdx} />
        </div>

        <div className="relative z-10 flex h-full min-h-0 flex-col px-12 pb-10 pt-24 lg:px-24">
          <div className="scroll-fade-bottom pointer-events-none absolute bottom-10 left-12 right-24 z-30 h-12 lg:left-24" />
          <AnimatePresence mode="wait">
            <motion.div
              key={`${scene.id}-${clampedStep}`}
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="presentation-scroll h-full min-h-0 w-full overflow-y-auto pr-8"
            >
              <CurrentScreen
                step={clampedStep}
                onStepChange={setStep}
                onPhaseAdvance={() => setActiveIdx((current) => Math.min(current + 1, SCREENS.length - 1))}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
