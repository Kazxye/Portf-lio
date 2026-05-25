/**
 * AchievementToast — Renderiza a fila de toasts vindos do AchievementContext.
 * Auto-dismiss após 4s, stackeável, slide-in com Framer Motion.
 *
 * Coloque uma única instância <AchievementToaster /> no topo do <App />.
 */

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useAchievements } from "../../context/AchievementContext";

const TOAST_DURATION = 4000;

export function AchievementToaster() {
  const { toasts, dismissToast, found, total } = useAchievements();

  return (
    <div
      className="fixed bottom-8 right-8 z-[10000] flex flex-col-reverse gap-3 pointer-events-none"
      aria-live="polite"
      role="status"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastCard
            key={t.id}
            id={t.id}
            name={t.egg.name}
            found={found}
            total={total}
            onDone={() => dismissToast(t.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({
  id,
  name,
  found,
  total,
  onDone,
}: {
  id: number;
  name: string;
  found: number;
  total: number;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, TOAST_DURATION);
    return () => clearTimeout(t);
  }, [id, onDone]);

  return (
    <motion.div
      layout
      initial={{ x: 420, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 420, opacity: 0 }}
      transition={{ type: "spring", damping: 22, stiffness: 260 }}
      className="pointer-events-auto min-w-[320px] max-w-[400px] flex items-center gap-4 px-5 py-4
                 rounded-xl border border-accent
                 bg-surface-light/95 backdrop-blur
                 shadow-[0_12px_40px_rgba(139,92,246,0.25),0_0_0_1px_rgba(139,92,246,0.15)]"
    >
      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/15 text-accent flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] text-accent tracking-[0.15em]">
          EASTER EGG DESBLOQUEADO
        </div>
        <div className="text-sm font-semibold text-text-primary truncate">{name}</div>
        <div className="font-mono text-[11px] text-text-muted mt-0.5">
          {found} / {total} encontrados
        </div>
      </div>
    </motion.div>
  );
}
