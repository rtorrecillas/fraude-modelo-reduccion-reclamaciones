import type { LucideIcon } from 'lucide-react';

export interface StepDefinition {
  id: string;
  label: string;
  shortLabel: string;
}

export interface SceneDefinition {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  steps: StepDefinition[];
}

export interface ScreenProps {
  step: number;
  onStepChange: (idx: number) => void;
  onPhaseAdvance?: () => void;
}
