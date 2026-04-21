import { motion } from 'framer-motion';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="pointer-events-none absolute left-[12%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-brand-green/14 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[16%] right-[18%] h-[18rem] w-[18rem] rounded-full bg-brand-turquoise/16 blur-[110px]" />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-[42rem] w-[42rem] rounded-full border border-brand-green/20" />
        <div className="absolute h-[28rem] w-[28rem] rounded-full border border-brand-turquoise/18" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <div className="mb-14">
          <h1 className="flex items-center text-7xl font-bold tracking-tight text-white">
            <span className="mr-1 text-brand-green drop-shadow-[0_0_15px_rgba(43,202,149,0.5)]">d</span>
            aliä
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.52em] text-brand-turquoise">
            AI-Driven · People First
          </p>
        </div>

        <div className="mb-14 space-y-5">
          <p className="text-sm font-bold uppercase tracking-[0.36em] text-brand-turquoise">Presentación interactiva</p>
          <h2 className="max-w-4xl text-5xl font-light leading-tight text-white md:text-6xl">
            Sistema de detección de patrones en operaciones
          </h2>
          <h3 className="text-5xl font-bold tracking-tight text-brand-green drop-shadow-[0_0_18px_rgba(43,202,149,0.22)] md:text-6xl">
            MIT/MOTO
          </h3>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white/70">
            Una propuesta para reducir reclamaciones asumidas mediante inteligencia operativa, scoring explicable y priorización de acción.
          </p>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="group relative overflow-hidden rounded-2xl border border-brand-turquoise/30 bg-brand-black px-10 py-5 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-brand-turquoise/5 transition-colors duration-300 group-hover:bg-brand-turquoise/15" />
          <span className="relative text-sm font-medium uppercase tracking-[0.24em] text-white transition-colors group-hover:text-brand-turquoise">
            Iniciar análisis
          </span>
          <div className="absolute bottom-0 left-0 top-0 w-1 bg-brand-turquoise transition-shadow group-hover:shadow-[0_0_15px_#47EBDD]" />
          <div className="absolute bottom-0 right-0 top-0 w-1 bg-brand-green transition-shadow group-hover:shadow-[0_0_15px_#2BCA95]" />
        </motion.button>
      </motion.div>
    </div>
  );
}
