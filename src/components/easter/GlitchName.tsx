import { useCallback, useEffect, useRef, useState } from "react";
import { useAchievements } from "../../context/AchievementContext";

interface Props {
  text: string;
  className?: string;
  /** se true, força o efeito (debug / preview) */
  forceActive?: boolean;
}

export function GlitchName({ text, className = "", forceActive }: Props) {
  const { unlock } = useAchievements();
  const [touchActive, setTouchActive] = useState(false);
  const triggered = useRef(false);

  const fire = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;
    unlock("glitch-name");
  }, [unlock]);

  const onTouch = useCallback(() => {
    fire();
    setTouchActive(true);
    setTimeout(() => setTouchActive(false), 700);
  }, [fire]);

  // Se forceActive, aplica classe direto
  useEffect(() => { if (forceActive) fire(); }, [forceActive, fire]);

  return (
    <span
      className={
        "glitch-name relative inline-block cursor-default select-none " +
        (touchActive || forceActive ? "glitch-name--active " : "") +
        className
      }
      data-text={text}
      onMouseEnter={fire}
      onTouchStart={onTouch}
      aria-label={text}
    >
      {text}
    </span>
  );
}
