import { useCallback, useEffect, useRef, useState } from "react";
import { useAchievements } from "../../context/AchievementContext";

const SHAKE_MS = 600;
const REVERT_MS = 2500;

interface Props {
    /** classes extra (opcional) */
    className?: string;
    /** texto padrão */
    label?: string;
    /** texto após o clique */
    warnedLabel?: string;
}

export function DontClickButton({
                                    className = "",
                                    label = "NÃO CLIQUE",
                                    warnedLabel = "eu avisei.",
                                }: Props) {
    const { unlock } = useAchievements();
    const [warned, setWarned] = useState(false);
    const shakeTimer = useRef<number | null>(null);
    const revertTimer = useRef<number | null>(null);

    const handleClick = useCallback(() => {
        unlock("dont-click");
        setWarned(true);

        // Permite re-acionar mesmo durante uma sequência ativa
        document.body.classList.remove("shake-body");
        void document.body.offsetWidth; // força reflow para reiniciar animação
        document.body.classList.add("shake-body");

        if (shakeTimer.current) window.clearTimeout(shakeTimer.current);
        if (revertTimer.current) window.clearTimeout(revertTimer.current);

        shakeTimer.current = window.setTimeout(() => {
            document.body.classList.remove("shake-body");
        }, SHAKE_MS);

        revertTimer.current = window.setTimeout(() => {
            setWarned(false);
        }, REVERT_MS);
    }, [unlock]);

    useEffect(() => {
        return () => {
            if (shakeTimer.current) window.clearTimeout(shakeTimer.current);
            if (revertTimer.current) window.clearTimeout(revertTimer.current);
            document.body.classList.remove("shake-body");
        };
    }, []);

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-label={label}
            className={
                "font-mono text-[11px] tracking-[0.1em] " +
                "px-3.5 py-2 rounded border " +
                "border-red-900/40 text-red-500/70 bg-red-950/10 " +
                "hover:bg-red-950/30 hover:text-red-400/90 hover:border-red-800/60 " +
                "active:scale-[0.97] " +
                "transition-colors duration-150 select-none cursor-pointer " +
                className
            }
        >
            {warned ? warnedLabel : label}
        </button>
    );
}
