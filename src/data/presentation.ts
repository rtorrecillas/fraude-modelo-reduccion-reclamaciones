import {
  Bot,
  BriefcaseBusiness,
  BrainCircuit,
  RefreshCcwDot,
} from 'lucide-react';
import type { SceneDefinition } from '../types';

export const SCENES: SceneDefinition[] = [
  {
    id: 'intro',
    number: '01',
    title: 'Introducción',
    shortTitle: 'Intro',
    icon: BriefcaseBusiness,
    steps: [
      { id: 'objetivo', label: 'Objetivo del proyecto', shortLabel: 'Objetivo' },
      { id: 'modelo', label: 'Modelo híbrido', shortLabel: 'Modelo' },
    ],
  },
  {
    id: 'phase-a',
    number: '02',
    title: 'Fase A · Descubrimiento de Patrones',
    shortTitle: 'Fase A',
    icon: BrainCircuit,
    steps: [
      { id: 'historico', label: 'Analítica histórica', shortLabel: 'Histórico' },
      { id: 'modelos', label: 'Modelado', shortLabel: 'Modelado' },
      { id: 'salida', label: 'Patrones y reglas', shortLabel: 'Salida' },
    ],
  },
  {
    id: 'phase-b',
    number: '03',
    title: 'Fase B · Detección Continua',
    shortTitle: 'Fase B',
    icon: RefreshCcwDot,
    steps: [
      { id: 'batch', label: 'Aplicación periódica', shortLabel: 'Batch' },
      { id: 'calculo', label: 'Cálculo de señales', shortLabel: 'Señales' },
      { id: 'identificacion', label: 'Comercios detectados', shortLabel: 'Detección' },
    ],
  },
  {
    id: 'phase-c',
    number: '04',
    title: 'Fase C · Enriquecimiento con Agentes',
    shortTitle: 'Fase C',
    icon: Bot,
    steps: [
      { id: 'investigan', label: 'Qué investigan', shortLabel: 'Chequeo' },
      { id: 'senales', label: 'Qué señales buscan', shortLabel: 'Señales' },
      { id: 'entrega', label: 'Qué entregan', shortLabel: 'Entrega' },
    ],
  },
];
