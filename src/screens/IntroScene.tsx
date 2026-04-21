import { motion } from 'framer-motion';
import { ArrowRight, Bot, BrainCircuit, RefreshCcwDot } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const introBlocks = [
  {
    title: 'Objetivo',
    text: 'Reducir reclamaciones asumidas identificando patrones MIT/MOTO que ya han generado pérdida y detectando comercios con operativa similar.',
  },
  {
    title: 'Enfoque',
    text: 'Modelo híbrido en tres fases: descubrimiento histórico, aplicación periódica de patrones y enriquecimiento externo asistido por agentes.',
  },
];

const pillars = [
  {
    title: 'A. Descubrimiento de patrones',
    text: 'Aprende del histórico reclamado asumido para extraer combinaciones de variables, segmentos repetitivos y reglas interpretables.',
    Icon: BrainCircuit,
    accent: 'border-brand-green/25 bg-brand-green/10 text-brand-green',
  },
  {
    title: 'B. Detección continua',
    text: 'Aplica periódicamente los patrones sobre operaciones recientes y calcula señales agregadas por comercio.',
    Icon: RefreshCcwDot,
    accent: 'border-brand-turquoise/25 bg-brand-turquoise/10 text-brand-turquoise',
  },
  {
    title: 'C. Enriquecimiento con agentes',
    text: 'Añade contexto externo sobre los comercios detectados para reforzar la lectura operativa del riesgo.',
    Icon: Bot,
    accent: 'border-brand-amber/25 bg-brand-amber/15 text-brand-amber',
  },
];

export default function IntroScene({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[0]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Sistema de detección de patrones en operaciones MIT/MOTO con impacto en reclamaciones asumidas"
        eyebrow="Introducción"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[1fr_1fr] gap-8">
        <div className="glass-panel p-9">
          <p className="caption-pill">Resumen</p>
          <div className="mt-7 space-y-5">
            {introBlocks.map((block, index) => (
              <div
                key={block.title}
                className={`rounded-[1.6rem] border p-6 transition-all ${
                  step >= index ? 'border-brand-turquoise/20 bg-white/[0.04] opacity-100' : 'border-white/10 bg-white/[0.03] opacity-55'
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-turquoise">{block.title}</p>
                <p className="mt-4 text-2xl leading-relaxed text-white/78">{block.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-black/20 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/55">Resultado esperado</p>
            <p className="mt-4 text-xl leading-relaxed text-white/74">
              Un sistema que prioriza comercios para revisión, monitorización o investigación, con lógica explicable y foco directo en pérdida evitable.
            </p>
          </div>
        </div>

        <div className="glass-panel p-9">
          <p className="caption-pill">Tres fases</p>
          <div className="mt-7 grid h-[calc(100%-3.5rem)] grid-rows-3 gap-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.Icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0.4, x: 18 }}
                  animate={{ opacity: step >= 1 || index === 0 ? 1 : 0.7, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="rounded-[1.6rem] border border-white/10 bg-black/18 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${pillar.accent}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-3 text-lg leading-relaxed text-white/72">{pillar.text}</p>
                    </div>
                  </div>
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
          {step < scene.steps.length - 1 ? 'Siguiente' : 'Ver Fase A'}
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
