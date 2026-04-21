import type { StepDefinition } from '../types';

interface SceneHeaderProps {
  number: string;
  title: string;
  eyebrow?: string;
  activeStep: number;
  steps: StepDefinition[];
  onStepChange: (idx: number) => void;
}

export default function SceneHeader({
  number,
  title,
  eyebrow,
}: SceneHeaderProps) {
  return (
    <div className="mb-8 flex shrink-0 flex-col gap-5">
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-brand-turquoise">
            {number} / {eyebrow ?? title}
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white lg:text-[3rem]">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}
