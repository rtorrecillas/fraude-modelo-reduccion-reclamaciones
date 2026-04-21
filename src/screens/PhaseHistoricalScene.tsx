import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, GitBranch, ScanSearch } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const phaseSteps = [
  {
    title: 'Analítica histórica',
    text: 'La fase parte del histórico de operaciones MIT/MOTO reclamadas y asumidas por el banco. Ese histórico se usa como base para identificar qué combinaciones de señales aparecen de forma recurrente en la pérdida.',
    bullets: ['Operaciones reclamadas asumidas', 'Variables transaccionales y de comportamiento', 'Base para aprender patrones reales de pérdida'],
    Icon: ScanSearch,
  },
  {
    title: 'Modelado',
    text: 'Se combinan modelos interpretables y modelos robustos. Los árboles de decisión aportan lectura clara de reglas; el gradient boosting aporta capacidad para capturar relaciones más complejas.',
    bullets: ['Árboles de decisión para interpretabilidad', 'XGBoost / LightGBM para robustez', 'Complementariedad entre lectura y precisión'],
    Icon: BrainCircuit,
  },
  {
    title: 'Patrones y reglas',
    text: 'El objetivo no es solo clasificar, sino extraer conocimiento utilizable: segmentos repetitivos, combinaciones de variables relevantes y reglas que puedan reaplicarse después en la detección continua.',
    bullets: ['Combinaciones de variables asociadas a la pérdida', 'Segmentos de comportamiento repetitivos', 'Reglas interpretables para la siguiente fase'],
    Icon: GitBranch,
  },
];

export default function PhaseHistoricalScene({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[1]!;
  const current = phaseSteps[step]!;
  const CurrentIcon = current.Icon;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Fase A · Descubrimiento de patrones a partir de analítica histórica"
        eyebrow="Descubrimiento de patrones"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[0.96fr_1.04fr] gap-8">
        <div className="glass-panel p-9">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-brand-green/30 bg-brand-green/10 text-brand-green">
              <CurrentIcon size={28} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-green">Qué hace esta fase</p>
              <h3 className="mt-2 text-4xl font-semibold text-white">{current.title}</h3>
            </div>
          </div>

          <p className="mt-8 text-2xl leading-relaxed text-white/76">{current.text}</p>

          <div className="mt-8 space-y-4">
            {current.bullets.map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4">
                <p className="text-lg leading-relaxed text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-9">
          <p className="caption-pill">Lectura de la fase</p>
          <div className="mt-7 grid h-[calc(100%-3rem)] grid-rows-3 gap-4">
            {phaseSteps.map((item, index) => {
              const Icon = item.Icon;
              const active = index <= step;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0.45, y: 16 }}
                  animate={{ opacity: active ? 1 : 0.4, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.07 }}
                  className={`rounded-[1.6rem] border p-6 ${active ? 'border-brand-green/20 bg-brand-green/10' : 'border-white/10 bg-white/[0.03]'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${active ? 'border-brand-green/25 bg-brand-black text-brand-green' : 'border-white/10 bg-black/20 text-brand-gray'}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green/90">Paso {index + 1}</p>
                      <h4 className="mt-1 text-2xl font-semibold text-white">{item.title}</h4>
                    </div>
                  </div>
                  <p className="mt-4 text-lg leading-relaxed text-white/72">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => (step < scene.steps.length - 1 ? onStepChange(step + 1) : onPhaseAdvance?.())}
          className="flex items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
        >
          {step < scene.steps.length - 1 ? 'Siguiente' : 'Ver Fase B'}
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
