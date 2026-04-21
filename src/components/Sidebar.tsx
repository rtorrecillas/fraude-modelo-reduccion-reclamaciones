import { motion } from 'framer-motion';
import type { SceneDefinition } from '../types';
import SideRail from './SideRail';

interface SidebarProps {
  scenes: SceneDefinition[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

export default function Sidebar({ scenes, activeIdx, onSelect }: SidebarProps) {
  return (
    <div className="relative flex h-screen w-56 items-center pr-5">
      <div className="absolute inset-y-0 right-0 w-32">
        <SideRail activeIdx={activeIdx} totalPhases={scenes.length} />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-around">
        {scenes.map((scene, idx) => {
          const Icon = scene.icon;
          const isActive = idx === activeIdx;
          const isPast = idx < activeIdx;

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => onSelect(idx)}
              className="group relative flex w-full items-center justify-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.14 : isPast ? 0.98 : 0.82,
                  opacity: isActive ? 1 : isPast ? 0.82 : 0.45,
                }}
                className={`relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl border transition-all duration-500 ${
                  isActive
                    ? 'border-brand-turquoise/35 bg-brand-turquoise/15 text-brand-turquoise shadow-[0_0_35px_rgba(71,235,221,0.18)]'
                    : isPast
                      ? 'border-brand-green/28 bg-brand-green/10 text-brand-green'
                      : 'border-white/10 bg-white/[0.03] text-brand-gray'
                }`}
              >
                <Icon size={30} strokeWidth={isActive ? 2 : 1.6} />
                {isActive ? (
                  <motion.div
                    layoutId="sidebar-orbit"
                    className="pointer-events-none absolute -inset-4 rounded-[2rem] border border-brand-turquoise/18"
                  />
                ) : null}
              </motion.div>

              <div className="pointer-events-none absolute right-full mr-5 flex w-44 justify-end">
                <div className="text-right">
                  <p
                    className={`text-[10px] font-bold uppercase tracking-[0.26em] ${
                      isActive ? 'text-brand-turquoise' : 'text-brand-gray/70'
                    }`}
                  >
                    {scene.number}
                  </p>
                  <p
                    className={`mt-1 text-xs font-semibold transition-all ${
                      isActive ? 'text-white' : 'text-white/55 group-hover:text-white/80'
                    }`}
                  >
                    {scene.shortTitle}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
