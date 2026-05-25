import { useEffect, useRef } from "react";

const SEQUENCE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "b", "a",
] as const;

export function useKonami(onTrigger: () => void) {
    // Stable ref para evitar re-attach a cada render
    const cb = useRef(onTrigger);
    cb.current = onTrigger;

    useEffect(() => {
        let idx = 0;

        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const tag = target?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            const expected = SEQUENCE[idx];

            if (key === expected) {
                idx++;
                if (idx === SEQUENCE.length) {
                    idx = 0;
                    cb.current();
                }
            } else {
                // se errou mas digitou o início da sequência, conta como 1ª tecla
                idx = key === SEQUENCE[0] ? 1 : 0;
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
}
