import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Radar, TrendingUp } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const narratives = [
  {
    title: 'El reto no es ver la reclamación. Es llegar antes.',
    text: 'En MIT/MOTO, buena parte de la pérdida se materializa cuando la operativa problemática ya ha escalado. El enfoque reactivo detecta tarde y prioriza mal.',
    bullet: ['Operativa repetitiva difícil de aislar', 'Pérdida distribuida entre comercios', 'Capacidad analítica limitada por volumen'],
    label: 'Contexto',
    accent: 'text-brand-turquoise',
  },
  {
    title: 'El sistema ordena el esfuerzo operativo donde más valor genera.',
    text: 'No busca decidir automáticamente sobre cada transacción. Busca seleccionar qué comercios revisar primero, con señales sólidas y explicables.',
    bullet: ['Patrones históricos de pérdida', 'Similitud operativa reciente', 'Contexto adicional sobre el comercio'],
    label: 'Objetivo',
    accent: 'text-brand-green',
  },
  {
    title: 'Se pasa de gestionar casos a gestionar riesgo estructural.',
    text: 'La propuesta cambia el eje de decisión: del evento puntual a la recurrencia de comportamiento y al impacto esperado sobre reclamaciones asumidas.',
    bullet: ['Priorización preventiva', 'Acción asistida y no automática', 'Foco directo en negocio'],
    label: 'Cambio',
    accent: 'text-brand-amber',
  },
];

function LossCurve({ step }: { step: number }) {
  const categories = ['M-5', 'M-4', 'M-3', 'M-2', 'M-1', 'Actual'];
  const reactive = [22, 24, 26, 29, 34, 41];
  const proactive = [22, 23, 23, 22, 19, 16];

  const option = {
    animationDuration: 700,
    backgroundColor: 'transparent',
    grid: { top: 24, right: 20, bottom: 28, left: 30 },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
      axisLabel: { color: '#5D666A', fontSize: 10 },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)', type: 'dashed' } },
    },
    series: [
      {
        name: 'Gestión reactiva',
        type: 'line',
        smooth: 0.25,
        data: reactive,
        symbolSize: 8,
        lineStyle: { color: '#FF6A78', width: 3 },
        itemStyle: { color: '#FF6A78' },
        areaStyle: step === 0 ? { color: 'rgba(255,106,120,0.08)' } : undefined,
      },
      {
        name: 'Priorización preventiva',
        type: 'line',
        smooth: 0.25,
        data: step >= 1 ? proactive : [null, null, null, null, null, null],
        symbolSize: 8,
        lineStyle: { color: '#47EBDD', width: 3 },
        itemStyle: { color: '#47EBDD' },
        areaStyle: step >= 1 ? { color: 'rgba(71,235,221,0.10)' } : undefined,
      },
    ],
    tooltip: { show: false },
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
}

export default function ProblemObjective({ step, onStepChange, onPhaseAdvance }: ScreenProps) {
  const scene = SCENES[1]!;
  const narrative = narratives[step]!;

  const iconMap = [AlertTriangle, Radar, TrendingUp] as const;
  const Icon = iconMap[step]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Por qué este problema requiere una lectura por patrones y no por casos aislados"
        eyebrow="Problema y Objetivo"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[0.95fr_1.05fr] gap-8">
        <div className="glass-panel p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-3xl border border-brand-turquoise/30 bg-brand-turquoise/15 text-brand-turquoise">
              <Icon size={28} />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-turquoise">{narrative.label}</p>
              <h3 className="mt-1 text-4xl font-semibold text-white">{narrative.title}</h3>
            </div>
          </div>

          <p className="mt-8 text-2xl leading-relaxed text-white/74">{narrative.text}</p>

          <div className="mt-8 space-y-4">
            {narrative.bullet.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className={`text-lg font-semibold ${narrative.accent}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel flex-1 p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="caption-pill">Impacto comparado</p>
                <h4 className="mt-4 text-2xl font-semibold text-white">Evolución esperada de pérdida asumida</h4>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Índice simulado</p>
              </div>
            </div>
            <div className="mt-6 h-[23rem]">
              <LossCurve step={step} />
            </div>
          </div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => (step < scene.steps.length - 1 ? onStepChange(step + 1) : onPhaseAdvance?.())}
            className="flex items-center justify-center gap-3 self-end rounded-2xl border border-brand-green/30 bg-brand-green/10 px-8 py-4 text-lg font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green"
          >
            {step < scene.steps.length - 1 ? 'Siguiente' : 'Ver enfoque'}
            <ArrowRight size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
