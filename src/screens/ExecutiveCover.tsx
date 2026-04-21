import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sparkles, Target } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const cards = [
  {
    title: 'Reducir pérdidas',
    text: 'Priorizar comercios con mayor probabilidad de acabar en reclamaciones asumidas.',
    Icon: ShieldCheck,
  },
  {
    title: 'Actuar antes',
    text: 'Identificar señales tempranas sin bloquear la operación en tiempo real.',
    Icon: Target,
  },
  {
    title: 'Explicar el riesgo',
    text: 'Combinar patrones, scoring y contexto externo en una narrativa entendible para negocio.',
    Icon: Sparkles,
  },
];

export default function ExecutiveCover({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[0]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Detección proactiva de patrones MIT/MOTO con impacto directo en reclamaciones"
        eyebrow="Portada Ejecutiva"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[1.15fr_0.85fr] gap-8">
        <div className="glass-panel glow-green relative overflow-hidden p-10">
          <div className="absolute right-[-10%] top-[-10%] h-56 w-56 rounded-full bg-brand-green/14 blur-[110px]" />
          <p className="caption-pill">Sistema analítico orientado a decisión</p>
          <h3 className="mt-8 max-w-4xl text-5xl font-semibold leading-tight text-white">
            De la gestión reactiva de reclamaciones a una priorización preventiva por comercio.
          </h3>
          <p className="mt-6 max-w-3xl text-2xl leading-relaxed text-white/74">
            El sistema aprende de pérdidas históricas, detecta operativas similares en batch y añade contexto externo para escalar revisión, monitorización o medidas preventivas.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {cards.map((card) => {
              const Icon = card.Icon;
              return (
                <div key={card.title} className="rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-turquoise/20 bg-brand-turquoise/10 text-brand-turquoise">
                    <Icon size={22} />
                  </div>
                  <h4 className="mt-5 text-xl font-semibold text-white">{card.title}</h4>
                  <p className="mt-3 text-base leading-relaxed text-white/65">{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel glow-turquoise p-8">
            <p className="caption-pill">Qué se entrega</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-turquoise">Ranking de comercios</p>
                <p className="mt-2 text-lg leading-relaxed text-white/72">
                  Priorización por impacto potencial y similitud con patrones históricos de pérdida.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-green">Score explicable</p>
                <p className="mt-2 text-lg leading-relaxed text-white/72">
                  Desglose transaccional, de comportamiento y de contexto externo.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-amber">Recomendación operativa</p>
                <p className="mt-2 text-lg leading-relaxed text-white/72">
                  Monitorizar, revisar, investigar o aplicar medidas preventivas.
                </p>
              </div>
            </div>
          </div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => (step < scene.steps.length - 1 ? onStepChange(step + 1) : onPhaseAdvance?.())}
            className="flex items-center justify-center gap-3 self-end rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
          >
            {step < scene.steps.length - 1 ? 'Siguiente insight' : 'Ir al problema'}
            <ArrowRight size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
