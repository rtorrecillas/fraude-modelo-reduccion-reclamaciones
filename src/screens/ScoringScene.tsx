import { motion } from 'framer-motion';
import { ArrowRight, BadgeAlert, CircleGauge, FileSearch, Globe2 } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

function ScoreChart({ step }: { step: number }) {
  const values = [42, 28, 18, 12];
  const colors = ['#47EBDD', '#2BCA95', '#FFB35A', '#FF6A78'];

  const option = {
    animationDuration: 700,
    backgroundColor: 'transparent',
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['56%', '78%'],
        center: ['50%', '50%'],
        label: { show: false },
        labelLine: { show: false },
        data: values.map((value, idx) => ({
          value: step >= idx ? value : 0.001,
          itemStyle: { color: colors[idx] },
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
}

const scoreBlocks = [
  {
    name: 'Score transaccional',
    desc: 'Similitud con patrones históricos de operaciones reclamadas.',
    value: 42,
    colorClass: 'text-brand-turquoise',
    borderClass: 'border-brand-turquoise/20 bg-brand-turquoise/10',
  },
  {
    name: 'Score de comportamiento',
    desc: 'Ratios MIT/MOTO, recurrencia, crecimiento y concentración.',
    value: 28,
    colorClass: 'text-brand-green',
    borderClass: 'border-brand-green/20 bg-brand-green/10',
  },
  {
    name: 'Score externo',
    desc: 'Web, reputación y coherencia de la actividad observada.',
    value: 18,
    colorClass: 'text-brand-amber',
    borderClass: 'border-brand-amber/20 bg-brand-amber/15',
  },
  {
    name: 'Explicabilidad',
    desc: 'Reglas activadas y drivers principales del riesgo.',
    value: 12,
    colorClass: 'text-brand-red',
    borderClass: 'border-brand-red/20 bg-brand-red/10',
  },
];

const variableGroups = [
  { title: 'Transaccionales', items: ['MIT / MOTO', 'Importe y recurrencia', 'BIN / geografía', 'MCC y franja horaria'] },
  { title: 'Comportamiento', items: ['% MIT/MOTO', 'Ratio de reclamación asumida', 'Crecimiento de volumen', 'Actividad nocturna'] },
  { title: 'Contexto externo', items: ['Transparencia del comercio', 'Suscripciones / cancelaciones', 'Reputación online', 'Consistencia de actividad'] },
];

const merchantDrivers = [
  { label: 'Patrón histórico similar', value: '89%' },
  { label: 'Crecimiento MIT/MOTO 30d', value: '+42%' },
  { label: 'Primeras reclamaciones tras alta', value: '11 días' },
  { label: 'Señal externa de baja transparencia', value: 'Alta' },
];

export default function ScoringScene({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[3]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="El score combina similitud, comportamiento y contexto para priorizar comercios sin emitir un veredicto automático"
        eyebrow="Scoring y Comercio Tipo"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[0.95fr_1.05fr] gap-8">
        <div className="glass-panel p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="caption-pill">Score global</p>
              <h3 className="mt-4 text-4xl font-semibold text-white">Ranking accionable por comercio</h3>
            </div>
            <div className="rounded-[1.6rem] border border-brand-turquoise/25 bg-brand-turquoise/10 px-6 py-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-turquoise">Mock score</p>
              <p className="mt-2 text-5xl font-semibold text-white">81</p>
            </div>
          </div>

          <div className="mt-4 h-[20rem]">
            <ScoreChart step={step} />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4">
            {scoreBlocks.map((block, idx) => (
              <div key={block.name} className={`rounded-2xl border p-4 ${block.borderClass} ${step >= idx ? 'opacity-100' : 'opacity-35'}`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{block.name}</p>
                  <p className={`text-2xl font-bold ${block.colorClass}`}>{block.value}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{block.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel p-7">
            <div className="flex items-center gap-3">
              <CircleGauge className="text-brand-turquoise" size={22} />
              <p className="text-xl font-semibold text-white">Lectura ejecutiva del riesgo</p>
            </div>

            {step < 3 ? (
              <div className="mt-6 grid grid-cols-3 gap-4">
                {variableGroups.map((group, idx) => (
                  <div key={group.title} className={`rounded-2xl border border-white/10 bg-black/20 p-4 ${step >= idx + 1 ? 'opacity-100' : 'opacity-45'}`}>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-turquoise">{group.title}</p>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <div key={item} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2">
                          <p className="text-sm text-white/72">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-[1.1fr_0.9fr] gap-5">
                <div className="rounded-[1.8rem] border border-brand-turquoise/20 bg-[linear-gradient(180deg,rgba(10,18,18,0.94),rgba(5,5,5,0.86))] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-turquoise">Comercio detectado</p>
                      <h4 className="mt-2 text-3xl font-semibold text-white">Nova Premium Services</h4>
                    </div>
                    <div className="rounded-2xl border border-brand-red/24 bg-brand-red/10 px-4 py-2 text-brand-red">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em]">Prioridad alta</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {merchantDrivers.map((driver) => (
                      <div key={driver.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/48">{driver.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{driver.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-brand-amber/22 bg-brand-amber/10 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-amber">Acción sugerida</p>
                    <p className="mt-2 text-lg leading-relaxed text-white/76">
                      Revisar alta, reforzar monitorización y evaluar medidas preventivas antes de crecimiento adicional.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <FileSearch className="text-brand-green" size={20} />
                      <p className="text-lg font-semibold text-white">Drivers explicables</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-white/72">
                        Regla activada: crecimiento de recurrencia + concentración de importes.
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-white/72">
                        Similitud elevada con segmentos históricos de pérdida en MCC comparable.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center gap-3">
                      <Globe2 className="text-brand-amber" size={20} />
                      <p className="text-lg font-semibold text-white">Contexto externo</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-white/72">
                        Baja visibilidad de condiciones de cancelación y términos poco destacados.
                      </div>
                      <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-white/72">
                        Reputación polarizada en canales públicos con incidencias recurrentes.
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-brand-red/22 bg-brand-red/10 p-5">
                    <div className="flex items-center gap-3">
                      <BadgeAlert className="text-brand-red" size={20} />
                      <p className="text-lg font-semibold text-white">No es un bloqueo</p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-white/74">
                      El resultado ordena la cola de actuación. La decisión final sigue siendo asistida y supervisada por negocio.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => (step < scene.steps.length - 1 ? onStepChange(step + 1) : onPhaseAdvance?.())}
            className="flex items-center justify-center gap-3 self-end rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
          >
            {step < scene.steps.length - 1 ? 'Siguiente vista' : 'Ver operación'}
            <ArrowRight size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
