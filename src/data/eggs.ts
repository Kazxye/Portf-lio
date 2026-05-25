/**
 * Catálogo central de easter eggs.
 * Adicione novos eggs aqui — o AchievementContext lê dessa lista.
 */

export type EggKey =
    | "konami"
    | "terminal"
    | "glitch-name"
    | "dont-click"
    | "console"
    | "devtools"
    | "sudo-hire"
    | "rm-shyness"
    | "cursor-trail"
    | "sudo-page"
    | "keyboard-sound";

export interface EggDef {
    key: EggKey;
    /** Nome curto pra toast e console */
    name: string;
    /** Dica curta — usada em painel /eggs ou console */
    hint: string;
}

export const EGG_CATALOG: EggDef[] = [
    { key: "konami",        name: "Konami / Matrix Mode", hint: "↑↑↓↓←→←→BA" },
    { key: "terminal",      name: "Terminal Secreto",      hint: "Aperte ~ ou ` em qualquer lugar" },
    { key: "glitch-name",   name: "Glitch RGB no nome",    hint: "Passe o mouse sobre KAZYS" },
    { key: "dont-click",    name: "Botão Proibido",        hint: "Clique no botão NÃO CLIQUE do rodapé" },
    { key: "console",       name: "Banner do DevTools",    hint: "Abra o console e digite kazys.eggs()" },
    { key: "devtools",      name: "DevTools detectado",    hint: "Abra DevTools com largura suficiente" },
    { key: "sudo-hire",     name: "sudo hire-me",          hint: "No terminal, digite: sudo hire-me" },
    { key: "rm-shyness",    name: "rm -rf /shyness",       hint: "No terminal, digite: rm -rf /shyness" },
    { key: "cursor-trail",  name: "Cursor com rastro",     hint: "Comando trail no terminal" },
    { key: "sudo-page",     name: "Página /sudo",          hint: "Visite /sudo e adivinhe a senha" },
    { key: "keyboard-sound",name: "Som de teclado",        hint: "Comando sound on no terminal" },
];

export const STORAGE_KEY = "kazys:eggs";
