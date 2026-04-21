import { motion } from 'framer-motion';
import { ArrowRight, Bot, FolderSearch2, ScanSearch } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const pillars = [
  {
    title: 'Descubrimiento histórico',
    subtitle: 'Aprender de pérdidas ya materializadas',
    text: 'Modelos interpretables y robustos para extraer segmentos repetitivos y reglas accionables a partir del histórico reclamado asumido.',
    bullets: ['Árboles de decisión para lectura de reglas', 'Gradient boosting para robustez', 'Patrones recurrentes por combinación de variables'],
    Icon: FolderSearch2,
    accent: 'brand-green',
  },
  {
    title: 'Detección continua batch',
    subtitle: 'Aplicar los patrones sobre operativa reciente',
    text: 'Procesos periódicos que calculan similitud con históricos problemáticos, activación de reglas y evolución agregada por comercio.',
    bullets: ['Score de similitud', 'Features por ventana temporal', 'Señales de crecimiento, recurrencia y concentración'],
    Icon: ScanSearch,
    accent: 'brand-turquoise',
  },
  {
    title: 'Enriquecimiento con agentes',
    subtitle: 'Entender el contexto fuera del dato transaccional',
    text: 'Automatización del análisis externo para validar coherencia de actividad, reputación y señales de mala praxis antes de la decisión.',
    bullets: ['Web y reputación online', 'Consistencia de la propuesta comercial', 'Ficha estructurada y score complementario'],
    Icon: Bot,
    accent: 'brand-amber',
  },
];

export default function HybridApproach({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[2]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="La solución se apoya en tres motores coordinados que convierten señales dispersas en una prioridad única"
        eyebrow="Enfoque Híbrido"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="glass-panel relative flex-1 overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-x-14 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-brand-green/30 via-brand-turquoise/35 to-brand-amber/35" />

        <div className="grid h-full grid-cols-3 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.Icon;
            const active = idx <= step;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0.4, y: 30 }}
                animate={{
                  opacity: active ? 1 : 0.35,
                  y: 0,
                  scale: idx === step ? 1.02 : 1,
                }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={`relative flex flex-col rounded-[2rem] border p-7 ${
                  active
                    ? 'border-brand-turquoise/20 bg-[linear-gradient(180deg,rgba(10,18,18,0.92),rgba(5,5,5,0.8))] shadow-[0_0_28px_rgba(71,235,221,0.08)]'
                    : 'border-white/10 bg-black/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-3xl border ${
                    pillar.accent === 'brand-green'
                      ? 'border-brand-green/30 bg-brand-green/10 text-brand-green'
                      : pillar.accent === 'brand-turquoise'
                        ? 'border-brand-turquoise/30 bg-brand-turquoise/10 text-brand-turquoise'
                        : 'border-brand-amber/30 bg-brand-amber/10 text-brand-amber'
                  }`}>
                    <Icon size={28} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                    Pilar {idx + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-3xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-turquoise/85">{pillar.subtitle}</p>
                <p className="mt-6 text-lg leading-relaxed text-white/70">{pillar.text}</p>

                <div className="mt-6 space-y-3">
                  {pillar.bullets.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <p className="text-base text-white/72">{item}</p>
                    </div>
                  ))}
                </div>

                {idx < pillars.length - 1 ? (
                  <div className="pointer-events-none absolute right-[-2.4rem] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-turquoise/20 bg-brand-black text-brand-turquoise xl:flex">
                    <ArrowRight size={20} />
                  </div>
                ) : null}
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
          {step < scene.steps.length - 1 ? 'Activar siguiente pilar' : 'Ver scoring'}
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
