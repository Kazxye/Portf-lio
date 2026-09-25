# Retomada — Systems Observatory

## Pedido

Rebuild completo do portfólio pessoal de Kazys na direção Systems Observatory. Preservar fatos e links reais; não inventar experiência, métricas ou funcionalidades. Responder ao usuário em português. Conteúdo do site em inglês conforme briefing. O usuário pediu uma pausa por limite de créditos, com entrega do estado atual e prompt para continuar.

## Implementado

- Homepage completa: hero, mapa de projetos com links, três showcases editoriais, Other Work, About/formação, stack agrupada, contato/footer.
- Case studies estáticas: `/projects/vaultkeeper`, `/projects/kazz-injector`, `/projects/phishguard`.
- Narrativa e diagramas derivados do código real, decisões técnicas, limitações, créditos e links de implementação.
- Screenshots reais do login do VaultKeeper e configurações do popup do PhishGuard; screenshot preexistente do SolarHub otimizado.
- Cmd/Ctrl+K, busca, navegação por teclado, foco inicial no input, Escape, menu mobile, links e cópia de email.
- SEO por rota, canonical, sitemap, robots, Open Graph gerado e JSON-LD Person.
- Server Components, fontes Geist locais, CSS para motion e reduced-motion; nenhuma dependência de runtime adicionada.
- README, auditoria de conteúdo e este handoff.

## Fontes e correções essenciais

Leia `docs/content-audit.md` antes de alterar claims.

- Nome oficial: VaultKeeper; repo `Kazxye/PasswordManager`. giiuk recebe crédito pelo frontend.
- Kazz Injector NÃO implementa manual mapping. `injectManualMap` delega a LoadLibrary. Não reintroduzir o claim do README antigo.
- PhishGuard executa cinco análises em paralelo; formulários são analisados depois, quando há HTML.
- A extensão PhishGuard mantém histórico em chrome.storage.local. Não afirmar ausência absoluta de armazenamento.
- LinkedIn consta no CV/site, mas bloqueou validação automatizada com HTTP 999.
- Formação: FIAP, conclusão prevista dezembro/2028. Certificações conflitantes foram omitidas.

## Validações já concluídas

- `npm run lint` passou.
- `VERCEL_ENV=production npm run build` passou com Turbopack após remover cache gerado por uma tentativa dentro do sandbox.
- `VERCEL_ENV=production npm run build -- --webpack` também passou.
- Todas as rotas de conteúdo são estáticas/prerenderizadas.
- HTTP de produção: quatro páginas 200; 15 assets locais 200; âncoras válidas; um H1 por página; canonical, descriptions, Open Graph/Twitter válidos; currículo, icon, sitemap e robots 200; duas rotas inválidas 404 com noindex.
- Headers de produção: CSP presente, frame-ancestors none, X-Frame-Options DENY, nosniff, ausência de X-Powered-By.
- Responsividade medida em 320, 390, 768 e 1024 px nas quatro páginas: sem overflow horizontal. Resultados em `/tmp/kazys-audit/responsive-results.json`, se ainda existir.
- Revisão visual de hero, projetos, case study VaultKeeper e versões mobile/tablet. Ctrl+K, busca e Enter para abrir case study confirmados; menu mobile abriu com foco na busca.
- Corrigidos foco inicial da palette, quebra dos botões em 320 px, hints longos no menu, navegação do header no tablet e aviso Next sobre smooth scrolling.

## Limpeza feita ao pausar

O fixture temporário `public/__responsive-check.html` foi removido. O header temporário SAMEORIGIN usado SOMENTE no dev para testes em iframe foi restaurado para DENY em todos os ambientes. O último build foi feito antes dessa restauração; a política de produção já era DENY durante o build/teste. Nenhum commit, push ou deploy foi feito.

## O que falta para encerrar com polimento

1. Inspecionar `git diff` e `git status`; preservar todas as mudanças existentes. Não recomeçar o rebuild.
2. Fazer uma revisão final curta de desktop/mobile, sobretudo parte inferior da home, screenshot gallery, menu com email longo e foco após Escape. Não repetir a auditoria de repositórios nem reescrever o design.
3. Confirmar reduced-motion e semântica/foco. Não alegar auditoria WCAG completa ou Lighthouse sem executar.
4. Se houver ajustes, rodar TypeScript e um build final. Checar ausência de fixture de teste e DENY no config.
5. Salvar screenshots finais de apresentação e abrir uma prévia local funcional. A tentativa de navegar o IAB para o servidor de produção em 3001 falhou por conexão; a verificação HTTP do mesmo servidor passou. Diagnosticar só se ainda ocorrer.
6. Entregar resumo, link da prévia e limitações reais. Publicação não foi solicitada; não fazer push/deploy automaticamente.

## Ambiente e ferramentas

Projeto: `/home/kazys/DEV/Portf-lio`.

Servidores iniciados nesta sessão (podem já ter encerrado): Next dev 127.0.0.1:3000, Next production 127.0.0.1:3001, VaultKeeper original :4173, popup PhishGuard :4174. Não depender deles; conferir antes de reiniciar. Fontes públicas temporárias em `/tmp/kazys-audit/*-main`. Não copiar esses repositórios para o portfólio.

A capability de viewport do IAB não alterou as dimensões. A validação responsiva foi feita com um fixture temporário same-origin e iframe real, com medição exposta em um output visível. O fixture já foi removido. Não deixar alterações em headers de produção para testes.

Capturas reais em `public/projects/*.webp`. Código formatado com Prettier usando instalação temporária em `/tmp/kazys-npm-cache`, sem dependência adicionada.
