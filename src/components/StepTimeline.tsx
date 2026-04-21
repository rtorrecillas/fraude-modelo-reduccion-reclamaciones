import { motion } from 'framer-motion';
import type { StepDefinition } from '../types';

interface StepTimelineProps {
  steps: StepDefinition[];
  activeStep: number;
  onStepChange: (idx: number) => void;
}

export default function StepTimeline({ steps, activeStep, onStepChange }: StepTimelineProps) {
  return (
    <div className="relative mt-2 flex items-center justify-between px-6">
      <div className="absolute left-8 right-8 top-8 h-px bg-gradient-to-r from-brand-green/30 via-brand-turquoise/30 to-brand-green/30" />

      {steps.map((step, idx) => {
        const isActive = idx === activeStep;
        const isPast = idx < activeStep;

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => onStepChange(idx)}
              className="group flex flex-col items-center gap-3"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.08 : 1,
                  boxShadow: isActive ? '0 0 24px rgba(71,235,221,0.22)' : '0 0 0 rgba(0,0,0,0)',
                }}
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-sm font-bold uppercase tracking-[0.16em] transition-all ${
                  isActive
                    ? 'border-brand-turquoise bg-brand-turquoise/16 text-brand-turquoise'
                    : isPast
                      ? 'border-brand-green/30 bg-brand-green/10 text-brand-green'
                      : 'border-white/10 bg-white/[0.03] text-brand-gray'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </motion.div>
              <span
                className={`max-w-28 text-center text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  isActive ? 'text-white' : 'text-white/55 group-hover:text-white/80'
                }`}
              >
                {step.shortLabel}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
