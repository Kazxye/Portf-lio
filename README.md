<h1 align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&pause=1000&color=8B5CF6&center=true&vCenter=true&width=600&lines=Kazys+Tatarunas+-+Portfolio;Defensive+Security+%7C+Fullstack+Dev;Building+tools+that+protect." alt="Typing SVG" />
</h1>

<p align="center">
  <a href="https://github.com/Kazxye"><img src="https://img.shields.io/badge/GitHub-Kazxye-8b5cf6?style=flat-square&logo=github" /></a>
  <a href="https://www.linkedin.com/in/kazystatarunas/"><img src="https://img.shields.io/badge/LinkedIn-kazystatarunas-8b5cf6?style=flat-square&logo=linkedin" /></a>
  <a href="mailto:kazysdzigantatarunas@outlook.com"><img src="https://img.shields.io/badge/Email-Outlook-8b5cf6?style=flat-square&logo=microsoft-outlook" /></a>
  <img src="https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178c6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

---

## Sobre

Portfólio pessoal de **Kazys Tatarunas** — estudante de Engenharia de Software na FIAP com foco em **segurança defensiva** e desenvolvimento fullstack.

Construído do zero com React + TypeScript, o site serve como vitrine de projetos reais: desde packet sniffers e sistemas de detecção de phishing até dashboards de monitoramento de rede. Toda a interface foi desenhada com tema cybersecurity — dark mode, animações fluidas e suporte bilíngue PT-BR / EN.

> Se você é recrutador: o [LinkedIn](https://www.linkedin.com/in/kazystatarunas/) tem o CV completo. Se você é dev: o código está aqui para explorar.

---

## Stack

| Tecnologia | Função |
|---|---|
| **React 18** | UI framework principal |
| **TypeScript 5** | Tipagem estática em todo o projeto |
| **Tailwind CSS 3** | Estilização utility-first |
| **Framer Motion** | Animações e transições (carrossel 3D, glitch, fade-ins) |
| **Vite 5** | Build tool — HMR instantâneo, bundle otimizado |
| **Lucide React** | Ícones consistentes |

---

## Funcionalidades

- **Bilíngue** — alternância PT-BR / EN via context API, sem recarregar a página
- **Carrossel 3D** — navegação entre projetos com perspectiva CSS e animações Framer Motion
- **Glitch effect** — efeito de texto glitch no hero, referência ao tema cyber
- **Modal de projeto** — detalhes, stack, highlights e link para o repositório
- **Seção Updates** — changelog in-page com histórico de adições ao portfólio
- **Download de CV** — botão direto para baixar o currículo em PDF
- **Totalmente responsivo** — mobile, tablet e desktop

---

## Projetos em Destaque

### PhishGuard
> Detecção de phishing em tempo real com extensão de navegador + REST API.

Extensão que intercepta requisições no browser e consulta uma API FastAPI com análise de URLs e heurísticas de phishing. Foco em baixa latência e alta taxa de detecção com mínimos falsos positivos.

`Python` `FastAPI` `TypeScript` `Browser Extension` `REST API`

[Ver repositório](https://github.com/Kazxye/PhishGuard)

---

### Network Radar
> Dashboard fullstack de monitoramento de rede em tempo real.

Captura e analisa pacotes com Scapy, expõe via WebSocket para um frontend React com gráficos ao vivo. Arquitetura event-driven com atualizações a cada 500ms.

`React` `TypeScript` `FastAPI` `Scapy` `WebSocket` `Pydantic`

[Ver repositório](https://github.com/Kazxye/Network-Radar)

---

### Password Manager
> Gerenciador de senhas local com criptografia AES e interface desktop.

Armazenamento seguro de credenciais com vault criptografado localmente. Sem dependência de nuvem — dados ficam na máquina do usuário.

`Python` `AES Encryption` `CustomTkinter`

---

### Loot Logger — Albion Online
> Sistema de logging de loot para Albion Online com integração Discord.

Captura pacotes UDP do jogo, parseia eventos de loot e os exibe em interface gráfica + notificações no Discord via webhook em tempo real.

`Python` `Scapy` `CustomTkinter` `Discord API` `Threading`

[Ver repositório](https://github.com/Kazxye/Loot-Logger-Albion-Online)

---

## Como Rodar Localmente

```bash
# 1. Clonar o repositório
git clone https://github.com/Kazxye/portfolio.git
cd portfolio

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
# → http://localhost:5173

# 4. Build para produção
npm run build

# 5. Prévia do build
npm run preview
```

**Requisitos:** Node.js 18+ e npm 9+

---

## Estrutura do Projeto

```
src/
├── assets/              # Imagens de projetos e perfil
├── components/
│   ├── Header.tsx       # Navegação flutuante + toggle de idioma
│   ├── Hero.tsx         # Seção principal, typing effect, download CV
│   ├── Projects.tsx     # Carrossel 3D com modal de detalhes
│   ├── ProjectCard.tsx  # Card individual de projeto
│   ├── About.tsx        # Bio, foco técnico e skill domains
│   ├── Contact.tsx      # Links de contato
│   ├── Updates.tsx      # Changelog de atualizações do portfólio
│   └── Footer.tsx       # Rodapé com navegação e social links
├── i18n/
│   ├── translations.ts  # Todos os textos em PT-BR e EN
│   ├── LanguageContext.tsx
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css            # Tema global, variáveis CSS, animações
```

---

## Contato

<p align="center">
  <a href="https://github.com/Kazxye">
    <img src="https://img.shields.io/badge/GitHub-@Kazxye-171515?style=for-the-badge&logo=github" />
  </a>
  <a href="https://www.linkedin.com/in/kazystatarunas/">
    <img src="https://img.shields.io/badge/LinkedIn-kazystatarunas-0077b5?style=for-the-badge&logo=linkedin" />
  </a>
  <a href="mailto:kazysdzigantatarunas@outlook.com">
    <img src="https://img.shields.io/badge/Email-Outlook-0078d4?style=for-the-badge&logo=microsoft-outlook" />
  </a>
  <a href="https://discord.com/users/kazys_">
    <img src="https://img.shields.io/badge/Discord-kazys__-5865f2?style=for-the-badge&logo=discord&logoColor=white" />
  </a>
</p>

---

## Licença

MIT © [Kazys Tatarunas](https://github.com/Kazxye)
