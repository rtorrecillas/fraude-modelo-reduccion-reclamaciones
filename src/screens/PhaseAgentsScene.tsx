import { motion } from 'framer-motion';
import { ArrowRight, Bot, FileSearch, Globe2 } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const phaseSteps = [
  {
    title: 'Fuentes externas',
    text: 'La fase se activa sobre los comercios detectados y busca contexto fuera del dato transaccional. El foco está en señales observables que ayuden a confirmar o matizar el riesgo.',
    bullets: ['Web del comercio', 'Reputación online', 'Trazas públicas de actividad'],
    Icon: Globe2,
  },
  {
    title: 'Análisis automatizado',
    text: 'Los agentes revisan consistencia de la actividad y señales de mala praxis, prestando atención a elementos como suscripciones, cancelaciones y transparencia comercial.',
    bullets: ['Consistencia de la actividad', 'Señales de mala praxis', 'Transparencia y condiciones visibles'],
    Icon: Bot,
  },
  {
    title: 'Ficha y score complementario',
    text: 'La salida es una ficha estructurada del comercio y un score adicional de contexto que enriquece la decisión final junto con las señales internas.',
    bullets: ['Ficha estructurada del comercio', 'Score complementario de contexto', 'Base adicional para priorización operativa'],
    Icon: FileSearch,
  },
];

export default function PhaseAgentsScene({ step, onStepChange }: ScreenProps) {
  const scene = SCENES[3]!;
  const current = phaseSteps[step]!;
  const CurrentIcon = current.Icon;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Fase C · Enriquecimiento externo con agentes para reforzar el contexto del comercio"
        eyebrow="Enriquecimiento con agentes"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[1.02fr_0.98fr] gap-8">
        <div className="glass-panel p-9">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-brand-amber/30 bg-brand-amber/15 text-brand-amber">
              <CurrentIcon size={28} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-amber">Qué aporta esta fase</p>
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
          <p className="caption-pill">Flujo de enriquecimiento</p>
          <div className="mt-7 flex h-[calc(100%-3rem)] flex-col gap-4">
            {phaseSteps.map((item, index) => {
              const Icon = item.Icon;
              const active = index <= step;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0.45, x: 18 }}
                  animate={{ opacity: active ? 1 : 0.42, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className={`rounded-[1.6rem] border p-6 ${active ? 'border-brand-amber/25 bg-brand-amber/10' : 'border-white/10 bg-white/[0.03]'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${active ? 'border-brand-amber/30 bg-brand-black text-brand-amber' : 'border-white/10 bg-black/20 text-brand-gray'}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-amber">Paso {index + 1}</p>
                      <h4 className="mt-1 text-2xl font-semibold text-white">{item.title}</h4>
                      <p className="mt-3 text-lg leading-relaxed text-white/72">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <div className="mt-auto rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/55">Resultado final</p>
              <p className="mt-4 text-xl leading-relaxed text-white/74">
                El comercio queda contextualizado con una lectura externa estructurada que complementa la señal interna y refuerza la decisión de negocio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (step < scene.steps.length - 1) onStepChange(step + 1);
          }}
          className="flex items-center gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
        >
          {step < scene.steps.length - 1 ? 'Siguiente' : 'Presentación completada'}
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
