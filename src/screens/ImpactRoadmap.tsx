import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, TriangleAlert } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const benefits = [
  'Reducción de pérdidas por reclamaciones MIT/MOTO.',
  'Identificación temprana de comercios con patrones similares.',
  'Mejor capacidad de priorización para fraude y negocio.',
  'Base explicable y reutilizable para otros casos de riesgo.',
];

const riskRows = [
  ['Sobreajuste al histórico', 'Validación temporal y modelos robustos.'],
  ['Falsos positivos en comercios legítimos', 'Score modular y decisión asistida.'],
  ['Dependencia de datos no estructurados', 'Peso controlado del enriquecimiento externo.'],
  ['Degradación del patrón', 'Reentrenamiento periódico y revisión de reglas.'],
];

const roadmap = [
  { phase: 'Fase 1', title: 'Descubrimiento', text: 'EDA, primeras hipótesis y patrones interpretables.' },
  { phase: 'Fase 2', title: 'Modelo y score', text: 'Features, entrenamiento robusto y score por comercio.' },
  { phase: 'Fase 3', title: 'Operación continua', text: 'Automatización de pipeline y outputs periódicos.' },
  { phase: 'Fase 4', title: 'Decisión y agentes', text: 'Enriquecimiento externo, cuadro de mando y acción operativa.' },
];

export default function ImpactRoadmap({ step, onStepChange }: ScreenProps) {
  const scene = SCENES[5]!;

  return (
    <div className="flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="La propuesta es incremental, controlable y alineada con impacto real en negocio"
        eyebrow="Beneficio, Riesgos y Roadmap"
        activeStep={step}
        steps={scene.steps}
        onStepChange={onStepChange}
      />

      <div className="grid flex-1 grid-cols-[0.88fr_1.12fr] gap-8">
        <div className="glass-panel p-8">
          <div className="flex items-center gap-3">
            {step === 0 ? (
              <CheckCircle2 className="text-brand-green" size={22} />
            ) : step === 1 ? (
              <TriangleAlert className="text-brand-amber" size={22} />
            ) : (
              <Clock3 className="text-brand-turquoise" size={22} />
            )}
            <p className="text-xl font-semibold text-white">
              {step === 0 ? 'Beneficio esperado' : step === 1 ? 'Riesgos bajo control' : 'Despliegue por fases'}
            </p>
          </div>

          {step === 0 ? (
            <div className="mt-6 space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-[1.4rem] border border-brand-green/20 bg-brand-green/10 p-5">
                  <p className="text-lg leading-relaxed text-white/78">{benefit}</p>
                </div>
              ))}
            </div>
          ) : step === 1 ? (
            <div className="mt-6 space-y-3">
              {riskRows.map(([risk, mitigation]) => (
                <div key={risk} className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-amber">{risk}</p>
                  <p className="mt-3 text-lg leading-relaxed text-white/72">{mitigation}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {roadmap.map((item, idx) => (
                <div key={item.phase} className={`rounded-[1.4rem] border p-5 ${idx <= step + 1 ? 'border-brand-turquoise/20 bg-brand-turquoise/10' : 'border-white/10 bg-white/[0.03]'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-turquoise">{item.phase}</p>
                    <ShieldCheck className="text-brand-green" size={18} />
                  </div>
                  <p className="mt-3 text-2xl font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-lg leading-relaxed text-white/72">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel relative overflow-hidden p-8">
          <div className="pointer-events-none absolute right-[-8%] top-[-12%] h-52 w-52 rounded-full bg-brand-turquoise/10 blur-[110px]" />
          <p className="caption-pill">Cierre ejecutivo</p>
          <h3 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white">
            Un enfoque incremental que combina datos, explicabilidad y criterio operativo.
          </h3>
          <p className="mt-6 max-w-4xl text-2xl leading-relaxed text-white/74">
            La propuesta no sustituye la decisión humana. La mejora. Ordena el riesgo, concentra la atención y acelera la respuesta donde el impacto potencial es mayor.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0.55 }}
              animate={{ opacity: step >= 0 ? 1 : 0.55 }}
              className="rounded-[1.6rem] border border-brand-green/20 bg-brand-green/10 p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green">Impacto esperado</p>
              <p className="mt-4 text-3xl font-semibold text-white">Menos pérdida evitable</p>
              <p className="mt-3 text-lg leading-relaxed text-white/72">
                Mejor priorización desde el primer ciclo operativo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.55 }}
              animate={{ opacity: step >= 1 ? 1 : 0.55 }}
              className="rounded-[1.6rem] border border-brand-amber/18 bg-brand-amber/10 p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-amber">Gobierno del riesgo</p>
              <p className="mt-4 text-3xl font-semibold text-white">Foco y trazabilidad</p>
              <p className="mt-3 text-lg leading-relaxed text-white/72">
                Señales explicables y mitigaciones desde diseño.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.55 }}
              animate={{ opacity: step >= 2 ? 1 : 0.55 }}
              className="col-span-2 rounded-[1.8rem] border border-brand-turquoise/20 bg-brand-turquoise/10 p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-turquoise">Próximo paso natural</p>
              <p className="mt-4 text-4xl font-semibold text-white">Arrancar con discovery y patrón base sobre histórico asumido</p>
              <p className="mt-4 text-xl leading-relaxed text-white/74">
                Permite validar señales, construir el score inicial y llegar a una primera cola priorizada de comercios con lógica de negocio visible.
              </p>
            </motion.div>
          </div>

          <div className="mt-8 flex justify-end">
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
      </div>
    </div>
  );
}
