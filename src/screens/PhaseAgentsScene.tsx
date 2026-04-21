import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Bot, FileSearch, Globe2, MessageSquareText, Search, ShieldCheck, Star } from 'lucide-react';
import SceneHeader from '../components/SceneHeader';
import { SCENES } from '../data/presentation';
import type { ScreenProps } from '../types';

const phaseSteps = [
  {
    title: 'Qué investigan los agentes',
    text: 'Sobre los comercios detectados en la fase anterior, se activan agentes especializados para revisar señales externas que no aparecen en el dato transaccional.',
    bullets: ['Página web del comercio', 'Foros y opiniones de usuarios', 'Portales y páginas de reputación'],
    Icon: Globe2,
  },
  {
    title: 'Qué señales buscan',
    text: 'El objetivo no es demostrar fraude por sí solo, sino contrastar si la presencia pública del comercio es coherente con su operativa y si existen señales de riesgo o mala praxis.',
    bullets: ['Claridad de la propuesta comercial', 'Transparencia en suscripciones y cancelaciones', 'Señales reputacionales adversas o inconsistencias visibles'],
    Icon: Bot,
  },
  {
    title: 'Qué entregan a negocio',
    text: 'La salida es una ficha resumida del comercio con hallazgos relevantes, score contextual y evidencias clave para reforzar la priorización operativa.',
    bullets: ['Resumen estructurado del comercio', 'Señales positivas, neutras y negativas', 'Score contextual y evidencias destacadas'],
    Icon: FileSearch,
  },
];

const agentRun = [
  {
    id: 'web',
    label: 'Web',
    title: 'Revisión de la web del comercio',
    note: 'Accediendo a la web pública del comercio y revisando su propuesta comercial.',
    prompt: 'Empieza por la web oficial. Revisa claridad comercial, información legal y condiciones de baja.',
    findings: [
      'Veo aviso legal y datos de contacto, pero quedan poco destacados frente al contenido promocional.',
      'La propuesta comercial es comprensible, aunque la baja y cancelación aparecen tarde en el recorrido.',
      'La estructura es válida, pero la transparencia comercial no es especialmente fuerte.',
    ],
    Icon: Globe2,
    preview: {
      domain: 'novapremiumservices.com',
      eyebrow: 'Premium Subscription Services',
      headline: 'Unlimited access. Cancel anytime.',
      details: ['Checkout en un solo paso', 'Oferta promocional destacada', 'Condiciones visibles solo al pie'],
    },
  },
  {
    id: 'forums',
    label: 'Foros',
    title: 'Búsqueda en foros y opiniones abiertas',
    note: 'Buscando trazas de experiencia de usuario en espacios abiertos.',
    prompt: 'Ahora busca en foros y conversaciones abiertas si aparecen incidencias repetidas.',
    findings: [
      'Encuentro comentarios recurrentes sobre dificultad para cancelar el servicio.',
      'También aparecen menciones a cobros recurrentes no siempre esperados por el usuario.',
      'La señal no es masiva, pero el patrón temático es consistente.',
    ],
    Icon: MessageSquareText,
  },
  {
    id: 'reputation',
    label: 'Reputación',
    title: 'Consulta de reputación online',
    note: 'Contrastando valoración pública y tipo de incidencias reportadas.',
    prompt: 'Contrasta ahora la reputación general y si las incidencias encajan con lo ya observado.',
    findings: [
      'La valoración pública es media-baja en portales abiertos.',
      'Predominan reclamaciones relacionadas con transparencia y experiencia postventa.',
      'La huella reputacional encaja con un riesgo contextual moderado-alto.',
    ],
    Icon: Star,
  },
  {
    id: 'summary',
    label: 'Resumen',
    title: 'Ficha final del comercio',
    note: 'Sintetizando evidencias y generando una valoración contextual.',
    prompt: 'Cierra la revisión con una ficha resumida y una valoración contextual numérica.',
    findings: [
      'El contexto externo es consistente con la señal interna previa.',
      'Las evidencias principales son: baja visibilidad de condiciones, incidencias repetidas y reputación deteriorada.',
      'La recomendación es reforzar la priorización para revisión e investigación.',
    ],
    Icon: ShieldCheck,
    score: 74,
  },
];

const systemIntro =
  'Actúa como agente de chequeo externo sobre un comercio detectado. Debes revisar señales abiertas y sintetizar hallazgos útiles para negocio.';

type RunState = {
  prompt: string;
  findings: string[];
  done: boolean;
};

export default function PhaseAgentsScene({ step, onStepChange }: ScreenProps) {
  const scene = SCENES[3]!;
  const current = phaseSteps[step]!;
  const CurrentIcon = current.Icon;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [agentOpen, setAgentOpen] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [runStates, setRunStates] = useState<RunState[]>(
    agentRun.map(() => ({ prompt: '', findings: [], done: false })),
  );
  const conversationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!agentOpen) return undefined;
    rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setAgentStep(0);
    setRunStates(agentRun.map(() => ({ prompt: '', findings: [], done: false })));
    return undefined;
  }, [agentOpen]);

  const activeRun = agentRun[agentStep]!;
  const ActiveRunIcon = activeRun.Icon;
  const completedRuns = useMemo(() => agentRun.slice(0, agentStep + 1), [agentStep]);

  useEffect(() => {
    if (!agentOpen) return undefined;

    let promptIndex = 0;
    let findingIndex = 0;
    let charIndex = 0;
    let timeoutId = 0;

    setRunStates((currentStates) =>
      currentStates.map((state, index) =>
        index === agentStep ? { prompt: '', findings: [], done: false } : state,
      ),
    );

    const typePrompt = () => {
      if (promptIndex < activeRun.prompt.length) {
        promptIndex += 1;
        const nextPrompt = activeRun.prompt.slice(0, promptIndex);
        setRunStates((currentStates) =>
          currentStates.map((state, index) =>
            index === agentStep ? { ...state, prompt: nextPrompt } : state,
          ),
        );
        timeoutId = window.setTimeout(typePrompt, 22);
        return;
      }

      timeoutId = window.setTimeout(typeFindings, 220);
    };

    const typeFindings = () => {
      if (findingIndex >= activeRun.findings.length) {
        setRunStates((currentStates) =>
          currentStates.map((state, index) =>
            index === agentStep ? { ...state, done: true } : state,
          ),
        );

        if (agentStep < agentRun.length - 1) {
          timeoutId = window.setTimeout(() => {
            setAgentStep((value) => Math.min(value + 1, agentRun.length - 1));
          }, 900);
        }
        return;
      }

      const finding = activeRun.findings[findingIndex]!;

      if (charIndex < finding.length) {
        charIndex += 1;
        const activeFindingText = finding.slice(0, charIndex);
        setRunStates((currentStates) =>
          currentStates.map((state, index) => {
            if (index !== agentStep) return state;
            const nextFindings = [...state.findings];
            nextFindings[findingIndex] = activeFindingText;
            return { ...state, findings: nextFindings };
          }),
        );
        timeoutId = window.setTimeout(typeFindings, 14);
        return;
      }

      findingIndex += 1;
      charIndex = 0;
      timeoutId = window.setTimeout(typeFindings, 170);
    };

    timeoutId = window.setTimeout(typePrompt, 160);

    return () => window.clearTimeout(timeoutId);
  }, [activeRun, agentOpen, agentStep]);

  useEffect(() => {
    if (!agentOpen || !conversationRef.current) return;

    conversationRef.current.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [agentOpen, agentStep, runStates]);

  return (
    <div ref={rootRef} className="relative flex h-full max-w-[1450px] flex-col">
      <SceneHeader
        number={scene.number}
        title="Fase C · Agentes de chequeo externo sobre comercios detectados"
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
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-amber">Visión de la fase</p>
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

          <div className="mt-8 rounded-[1.6rem] border border-brand-amber/20 bg-brand-amber/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-amber">Principio de uso</p>
            <p className="mt-4 text-xl leading-relaxed text-white/76">
              Los agentes generan señales de contexto y evidencias abiertas. No emiten un juicio definitivo sobre la licitud del comercio; refuerzan la decisión asistida.
            </p>
          </div>
        </div>

        <div className="glass-panel p-9">
          <p className="caption-pill">Presentación interactiva</p>
          <div className="mt-7 flex h-[calc(100%-3rem)] flex-col gap-4">
            {phaseSteps.map((item, index) => {
              const Icon = item.Icon;
              const active = true;
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

            <div className="rounded-[1.6rem] border border-brand-turquoise/22 bg-brand-turquoise/10 p-6">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-turquoise">Demo guiada</p>
                  <p className="mt-3 text-xl leading-relaxed text-white/76">
                    A continuación, se muestra cómo un agente ejecuta el chequeo externo paso a paso sobre un comercio detectado.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAgentStep(0);
                    setAgentOpen(true);
                  }}
                  className="shrink-0 rounded-2xl border border-brand-turquoise/30 bg-brand-turquoise/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-turquoise transition-all hover:bg-brand-turquoise hover:text-brand-dark-green"
                >
                  Abrir agente
                </button>
              </div>
            </div>

            <div className="mt-auto rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/55">Resultado final</p>
              <p className="mt-4 text-xl leading-relaxed text-white/74">
                El comercio queda contextualizado con una lectura externa estructurada que complementa la señal interna y ayuda a priorizar revisión, monitorización o investigación.
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

      <AnimatePresence>
        {agentOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(71,235,221,0.12),rgba(5,5,5,0.92)_38%,rgba(5,5,5,0.97)_100%)] backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.96 }}
              className="relative grid h-[80vh] w-[min(1160px,90vw)] grid-cols-[0.3fr_0.7fr] gap-6 overflow-hidden rounded-[2.1rem] border border-[#d7dfdf] bg-[linear-gradient(180deg,#f5f7f6_0%,#edf2f0_100%)] p-7 shadow-[0_0_70px_rgba(71,235,221,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(12,32,28,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,32,28,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="pointer-events-none absolute left-[-8%] top-[-14%] h-64 w-64 rounded-full bg-brand-turquoise/12 blur-[90px]" />
              <div className="pointer-events-none absolute bottom-[-18%] right-[-6%] h-72 w-72 rounded-full bg-brand-green/10 blur-[100px]" />
              <div className="pointer-events-none absolute inset-0 rounded-[2.1rem] border border-white/40" />
              <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[68%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-turquoise/60 to-transparent" />

              <button
                type="button"
                onClick={() => setAgentOpen(false)}
                className="absolute right-5 top-5 z-10 rounded-xl border border-slate-300/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition-all hover:bg-white hover:text-slate-900"
              >
                Cerrar
              </button>

              <div className="relative rounded-[1.8rem] border border-[#d4ddda] bg-[linear-gradient(180deg,rgba(242,247,245,0.96),rgba(228,236,233,0.94))] p-6 shadow-[0_18px_50px_rgba(11,26,24,0.08)]">
                <p className="caption-pill">Agente externo</p>
                <h3 className="mt-5 text-3xl font-semibold text-slate-900">Conversación de trabajo</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  Simulación de cómo el agente ejecuta la investigación de forma secuencial y va dejando una traza legible del análisis.
                </p>

                <div className="mt-8 space-y-3">
                  {agentRun.map((run, index) => (
                    <div
                      key={run.id}
                      className={`rounded-[1.2rem] border px-4 py-3 transition-all ${
                        index === agentStep
                          ? 'border-brand-turquoise/30 bg-brand-turquoise/12'
                          : index < agentStep
                            ? 'border-brand-green/24 bg-brand-green/10'
                            : 'border-slate-300/80 bg-white/55'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <run.Icon size={18} className={index === agentStep ? 'text-brand-turquoise' : index < agentStep ? 'text-brand-green' : 'text-brand-gray'} />
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">{run.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-[1.4rem] border border-slate-300/80 bg-white/68 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Caso simulado</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">Nova Premium Services</p>
                  <p className="mt-2 text-base text-slate-600">Chequeo contextual abierto para priorización operativa.</p>
                </div>
              </div>

              <div className="relative rounded-[1.8rem] border border-[#d4ddda] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(239,244,242,0.96))] p-6 shadow-[0_22px_60px_rgba(11,26,24,0.10)]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[1.8rem] bg-[radial-gradient(circle_at_top,rgba(71,235,221,0.14),transparent_68%)]" />
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-turquoise/30 bg-brand-turquoise/12 text-brand-turquoise shadow-[0_0_25px_rgba(71,235,221,0.12)]">
                      <ActiveRunIcon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-turquoise">Ejecución en curso</p>
                      <h4 className="mt-1 text-3xl font-semibold text-slate-900">{activeRun.title}</h4>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-300/80 bg-white/68 px-4 py-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Conversación guiada</p>
                  </div>
                </div>

                <div ref={conversationRef} className="presentation-scroll relative mt-6 h-[56vh] overflow-y-auto pr-3">
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-[88%] rounded-[1.25rem] border border-slate-300/80 bg-white/78 px-4 py-4"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Sistema</p>
                      <p className="mt-2 text-base leading-relaxed text-slate-700">{systemIntro}</p>
                    </motion.div>
                    {completedRuns.map((run, runIndex) => {
                      const state = runStates[runIndex] ?? { prompt: '', findings: [], done: false };
                      const isCurrent = runIndex === agentStep;
                      const promptDone = state.prompt.length === run.prompt.length;
                      const preview = run.id === 'web' ? run.preview : undefined;
                      return (
                      <div key={run.id} className="space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: runIndex * 0.05 }}
                          className="ml-auto max-w-[86%] rounded-[1.25rem] border border-brand-turquoise/24 bg-[linear-gradient(180deg,rgba(214,247,244,0.95),rgba(198,239,235,0.88))] px-4 py-4 shadow-[0_0_20px_rgba(71,235,221,0.06)]"
                        >
                          <div className="flex items-center gap-2">
                            <Search size={16} className="text-brand-turquoise" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-turquoise">Acción predefinida</p>
                          </div>
                          <p className="mt-2 text-base leading-relaxed text-slate-800">
                            {state.prompt}
                            {isCurrent && state.prompt.length < run.prompt.length ? (
                              <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-brand-turquoise align-middle" />
                            ) : null}
                          </p>
                        </motion.div>

                        {promptDone ? (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 }}
                            className="max-w-[92%] rounded-[1.25rem] border border-slate-300/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(240,244,242,0.92))] px-4 py-4"
                          >
                            <div className="flex items-center gap-3">
                              <run.Icon size={18} className="text-brand-green" />
                              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-green">Agente</p>
                            </div>
                            <p className="mt-2 text-base leading-relaxed text-slate-700">{run.note}</p>

                            <div className="mt-4 space-y-3">
                              {preview ? (
                                <div className="overflow-hidden rounded-[1.1rem] border border-slate-300/70 bg-[#f7faf9] shadow-[0_10px_30px_rgba(11,26,24,0.08)]">
                                  <div className="flex items-center gap-2 border-b border-slate-200 bg-white/90 px-3 py-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
                                    <div className="ml-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
                                      {preview.domain}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-[1.2fr_0.8fr] gap-0">
                                    <div className="border-r border-slate-200 bg-[linear-gradient(180deg,#eef7f4,#e4f2ee)] p-4">
                                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-turquoise">
                                        {preview.eyebrow}
                                      </p>
                                      <h5 className="mt-2 max-w-[18rem] text-xl font-semibold leading-tight text-slate-900">
                                        {preview.headline}
                                      </h5>
                                      <div className="mt-4 flex gap-2">
                                        <div className="rounded-full bg-brand-turquoise px-3 py-1.5 text-[11px] font-semibold text-slate-900">
                                          Start now
                                        </div>
                                        <div className="rounded-full border border-slate-300 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-600">
                                          Learn more
                                        </div>
                                      </div>
                                      <div className="mt-5 h-20 rounded-2xl border border-white/70 bg-white/75 p-3">
                                        <div className="h-2 w-24 rounded-full bg-slate-200" />
                                        <div className="mt-3 h-2 w-full rounded-full bg-slate-100" />
                                        <div className="mt-2 h-2 w-5/6 rounded-full bg-slate-100" />
                                        <div className="mt-2 h-2 w-2/3 rounded-full bg-slate-100" />
                                      </div>
                                    </div>

                                    <div className="bg-white/80 p-4">
                                      <div className="rounded-2xl border border-slate-200 bg-white p-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                          Agent Snapshot
                                        </p>
                                        <div className="mt-3 space-y-2">
                                          {preview.details.map((detail) => (
                                            <div
                                              key={detail}
                                              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] leading-relaxed text-slate-600"
                                            >
                                              {detail}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : null}

                              {run.findings.map((finding, findingIndex) => {
                                const visibleFinding = state.findings[findingIndex] ?? '';
                                const isCurrentFinding =
                                  isCurrent &&
                                  findingIndex === state.findings.length - 1 &&
                                  visibleFinding.length < finding.length;
                                const shouldRender = visibleFinding.length > 0;

                                if (!shouldRender) return null;

                                return (
                                  <div key={`${run.id}-${finding}`} className="rounded-[1rem] border border-slate-300/70 bg-white/70 px-3 py-3">
                                    <p className="text-sm leading-relaxed text-slate-700">
                                      {visibleFinding}
                                      {isCurrentFinding ? (
                                        <span className="ml-1 inline-block h-3.5 w-[2px] animate-pulse bg-brand-green align-middle" />
                                      ) : null}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>

                            {typeof run.score === 'number' && state.done ? (
                              <div className="mt-4 grid grid-cols-[0.34fr_0.66fr] gap-3">
                                <div className="rounded-[1.1rem] border border-brand-amber/24 bg-brand-amber/15 p-4 text-center">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-amber">Score</p>
                                  <p className="mt-2 text-5xl font-semibold text-slate-900">{run.score}</p>
                                </div>
                                <div className="rounded-[1.1rem] border border-brand-red/20 bg-brand-red/10 p-4">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-red">Valoración final</p>
                                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                    Contexto externo compatible con revisión prioritaria. Recomendable reforzar investigación antes de aumento adicional de exposición.
                                  </p>
                                </div>
                              </div>
                            ) : null}
                          </motion.div>
                        ) : null}
                      </div>
                    )})}
                  </div>
                  <div className="pointer-events-none sticky bottom-0 mt-4 h-12 bg-gradient-to-t from-[#edf2f0] to-transparent" />
                </div>

                <div className="mt-6 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setAgentStep(0)}
                    className="rounded-2xl border border-slate-300/80 bg-white/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition-all hover:bg-white hover:text-slate-900"
                  >
                    Reiniciar
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgentStep((value) => Math.min(value + 1, agentRun.length - 1))}
                    disabled={agentStep >= agentRun.length - 1}
                    className="rounded-2xl border border-brand-green/30 bg-brand-green/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-green transition-all hover:bg-brand-green hover:text-brand-dark-green disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Siguiente paso
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
