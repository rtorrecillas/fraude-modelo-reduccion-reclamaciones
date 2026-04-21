import { motion } from 'framer-motion';
import { ArrowRight, BellRing, RefreshCcwDot, ScanLine } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const phaseSteps = [
  {
    title: 'Aplicación periódica',
    text: 'Los patrones descubiertos se aplican en batch sobre operaciones recientes. La lógica no bloquea en tiempo real; observa y recalcula señales con cadencia periódica.',
    bullets: ['Ejecución batch sobre operativa reciente', 'Reaplicación de patrones históricos', 'Seguimiento continuo del comercio'],
    Icon: RefreshCcwDot,
  },
  {
    title: 'Cálculo de señales',
    text: 'En esta fase se calcula score de similitud con patrones problemáticos, activación de reglas detectadas y features agregadas por comercio en ventanas temporales.',
    bullets: ['Score de similitud', 'Activación de reglas', 'Features agregadas por ventana temporal'],
    Icon: ScanLine,
  },
  {
    title: 'Identificación de comercios',
    text: 'El resultado es la detección de comercios con operativa comparable a históricos problemáticos y de evoluciones anómalas asociadas a crecimiento, recurrencia o concentración.',
    bullets: ['Comercios similares a históricos problemáticos', 'Crecimientos anómalos', 'Recurrencia y concentración de señales'],
    Icon: BellRing,
  },
];

export default function PhaseContinuousScene({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[2]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Fase B · Aplicación periódica de patrones sobre operativa reciente"
        eyebrow="Detección continua"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="glass-panel flex-1 p-9">
        <div className="grid h-full grid-cols-3 gap-5">
          {phaseSteps.map((item, index) => {
            const Icon = item.Icon;
            const active = index <= step;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0.45, y: 18 }}
                animate={{ opacity: active ? 1 : 0.42, y: 0, scale: index === step ? 1.01 : 1 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`flex flex-col rounded-[1.9rem] border p-7 ${
                  active ? 'border-brand-turquoise/22 bg-brand-turquoise/10' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-3xl border ${
                  active ? 'border-brand-turquoise/28 bg-brand-black text-brand-turquoise' : 'border-white/10 bg-black/20 text-brand-gray'
                }`}>
                  <Icon size={28} />
                </div>

                <h3 className="mt-7 text-3xl font-semibold text-white">{item.title}</h3>
                <p className="mt-5 text-xl leading-relaxed text-white/74">{item.text}</p>

                <div className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-3">
                      <p className="text-base leading-relaxed text-white/74">{bullet}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => (step < scene.steps.length - 1 ? onStepChange(step + 1) : onPhaseAdvance?.())}
          className="flex items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
        >
          {step < scene.steps.length - 1 ? 'Siguiente' : 'Ver Fase C'}
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
