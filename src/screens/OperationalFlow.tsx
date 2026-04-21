import { motion } from 'framer-motion';
import { ArrowRight, Database, FileOutput, SearchCheck, Sparkles, Workflow } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const stages = [
  { title: 'Histórico y preparación', text: 'Carga de operaciones, reclamaciones asumidas y construcción de variables.', Icon: Database },
  { title: 'Modelado y patrones', text: 'Identificación de segmentos repetitivos y reglas interpretables.', Icon: Workflow },
  { title: 'Aplicación periódica', text: 'Batch sobre operativa reciente con scoring y alertas por comercio.', Icon: SearchCheck },
  { title: 'Enriquecimiento externo', text: 'Agentes para web, reputación y coherencia de actividad.', Icon: Sparkles },
  { title: 'Salida a negocio', text: 'Ranking, explicación y recomendación de acción.', Icon: FileOutput },
];

const actionCards = [
  { title: 'Monitorizar', text: 'Seguimiento reforzado del comercio sin intervención inmediata.' },
  { title: 'Revisar', text: 'Análisis manual priorizado por señales y drivers activados.' },
  { title: 'Investigar', text: 'Validación más profunda del comportamiento y del contexto externo.' },
  { title: 'Aplicar medidas', text: 'Restricciones o medidas preventivas según criterio de negocio.' },
];

export default function OperationalFlow({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[4]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="El sistema funciona como un pipeline periódico de lectura, priorización y entrega de acción"
        eyebrow="Flujo Operativo"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-rows-[0.95fr_1.05fr] gap-8">
        <div className="glass-panel relative overflow-hidden p-8">
          <div className="pointer-events-none absolute inset-x-16 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-brand-green/25 via-brand-turquoise/35 to-brand-green/25" />
          <div className="grid h-full grid-cols-5 gap-4">
            {stages.map((stage, idx) => {
              const Icon = stage.Icon;
              const active = idx <= step + 1;

              return (
                <motion.div
                  key={stage.title}
                  animate={{ opacity: active ? 1 : 0.35, y: 0 }}
                  initial={{ opacity: 0.35, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="relative rounded-[1.8rem] border border-white/10 bg-black/20 p-5"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                    active ? 'border-brand-turquoise/30 bg-brand-turquoise/10 text-brand-turquoise' : 'border-white/10 bg-white/[0.03] text-brand-gray'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <p className="mt-5 text-xl font-semibold text-white">{stage.title}</p>
                  <p className="mt-3 text-base leading-relaxed text-white/65">{stage.text}</p>

                  {idx < stages.length - 1 ? (
                    <div className="pointer-events-none absolute right-[-1.25rem] top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-brand-turquoise/20 bg-brand-black text-brand-turquoise xl:flex">
                      <ArrowRight size={18} />
                    </div>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[0.95fr_1.05fr] gap-8">
          <div className="glass-panel p-7">
            <p className="caption-pill">Principio operativo</p>
            <h3 className="mt-5 text-4xl font-semibold text-white">No bloquea en tiempo real</h3>
            <p className="mt-5 text-2xl leading-relaxed text-white/74">
              La lógica está diseñada para orientar el trabajo preventivo y reducir pérdidas, no para automatizar una denegación transaccional.
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-brand-turquoise/20 bg-brand-turquoise/10 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-turquoise">Qué optimiza</p>
              <p className="mt-3 text-lg leading-relaxed text-white/74">
                La asignación del esfuerzo analítico hacia comercios con más señales combinadas de riesgo y más potencial de impacto.
              </p>
            </div>
          </div>

          <div className="glass-panel p-7">
            <p className="caption-pill">Salida del sistema</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {actionCards.map((card) => (
                <div key={card.title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-lg font-semibold text-white">{card.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => (step < scene.steps.length - 1 ? onStepChange(step + 1) : onPhaseAdvance?.())}
          className="flex items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
        >
          {step < scene.steps.length - 1 ? 'Siguiente fase' : 'Ver beneficios'}
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
