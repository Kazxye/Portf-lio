/**
 * AchievementContext — sistema central de easter eggs.
 *
 * Uso:
 *   const { unlock, eggs, found, total } = useAchievements();
 *   unlock('konami');
 *
 * Persiste em localStorage. Expõe window.kazys.eggs() no console.
 */

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import { EGG_CATALOG, STORAGE_KEY, type EggDef, type EggKey } from "../data/eggs";

export interface EggState extends EggDef {
    found: boolean;
    foundAt: number | null;
}

interface ToastEvent {
    id: number;
    egg: EggState;
}

interface AchievementCtx {
    eggs: EggState[];
    /** quantidade descoberta */
    found: number;
    /** total cadastrado */
    total: number;
    /** desbloqueia um egg. Idempotente: chamadas repetidas no mesmo egg não disparam toast de novo. */
    unlock: (key: EggKey) => void;
    /** apaga progresso (use em dev tools) */
    reset: () => void;
    /** stream de toasts pendentes */
    toasts: ToastEvent[];
    dismissToast: (id: number) => void;
}

const Ctx = createContext<AchievementCtx | null>(null);

interface StoredMap { [k: string]: number }

function loadStored(): StoredMap {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as StoredMap) : {};
    } catch {
        return {};
    }
}

function saveStored(map: StoredMap) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
        /* ignore quota errors */
    }
}

export function AchievementProvider({ children }: { children: ReactNode }) {
    const [eggs, setEggs] = useState<EggState[]>(() => {
        const stored = loadStored();
        return EGG_CATALOG.map<EggState>((def) => ({
            ...def,
            found: !!stored[def.key],
            foundAt: stored[def.key] ?? null,
        }));
    });

    const [toasts, setToasts] = useState<ToastEvent[]>([]);
    const toastIdRef = useRef(0);

    const unlock = useCallback((key: EggKey) => {
        setEggs((prev) => {
            const target = prev.find((e) => e.key === key);
            if (!target || target.found) return prev; // idempotente
            const now = Date.now();
            const next = prev.map((e) =>
                e.key === key ? { ...e, found: true, foundAt: now } : e
            );

            // persist
            const map: StoredMap = {};
            next.forEach((e) => {
                if (e.found && e.foundAt) map[e.key] = e.foundAt;
            });
            saveStored(map);

            // toast (push after state to avoid render warnings)
            const updated = next.find((e) => e.key === key)!;
            queueMicrotask(() => {
                toastIdRef.current += 1;
                setToasts((t) => [...t, { id: toastIdRef.current, egg: updated }]);
            });

            return next;
        });
    }, []);

    const dismissToast = useCallback((id: number) => {
        setToasts((t) => t.filter((x) => x.id !== id));
    }, []);

    const reset = useCallback(() => {
        saveStored({});
        setEggs(EGG_CATALOG.map((def) => ({ ...def, found: false, foundAt: null })));
    }, []);

    const found = useMemo(() => eggs.filter((e) => e.found).length, [eggs]);

    // expose window.kazys for the console egg
    useEffect(() => {
        const banner = `
%c
╔═══════════════════════════════════════════════╗
║   K A Z Y S   T A T A R U N A S               ║
║   Security & Systems Developer                ║
║                                               ║
║   Bem-vindo, dev curioso. 👁                   ║
║   Diga "oi" no LinkedIn citando este banner.  ║
║                                               ║
║   → digite  kazys.eggs()  pra ver os achievs  ║
╚═══════════════════════════════════════════════╝
`;
        console.log(banner, "color:#8b5cf6;font-family:monospace;font-size:12px;");

        Object.defineProperty(window, "kazys", {
            configurable: true,
            get() {
                unlock("console");
                return {
                    eggs: () => {
                        console.table(
                            Object.fromEntries(
                                eggs.map((e) => [
                                    e.key,
                                    { nome: e.name, encontrado: e.found, dica: e.hint },
                                ])
                            )
                        );
                        return `${found} / ${eggs.length} eggs encontrados`;
                    },
                    hire: () => "kazysdzigantatarunas@outlook.com",
                    reset,
                    about: "security developer · FIAP · sp/brasil",
                };
            },
        });
        return () => {
            try { delete (window as any).kazys; } catch { /* ignore */ }
        };
    }, [eggs, found, reset, unlock]);

    const value = useMemo<AchievementCtx>(
        () => ({ eggs, found, total: eggs.length, unlock, reset, toasts, dismissToast }),
        [eggs, found, unlock, reset, toasts, dismissToast]
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAchievements() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useAchievements precisa de <AchievementProvider>");
    return ctx;
}
