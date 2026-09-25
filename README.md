# ColorsClean

Landing page da ColorsClean — limpeza e impermeabilização.

## Arquitetura atual

A produção continua usando a implementação estática existente em `index.html`, com `src/styles.css` e JavaScript nativo inline, empacotados pelo Vite.

React, React DOM, TypeScript e Lucide permanecem instalados no repositório porque existe uma implementação React desconectada em `src/main.tsx`, mas ela **não controla a interface publicada atualmente**.

A migração da produção para React não foi aprovada e não deve ser feita sem uma decisão explícita.

## Stack

- Vite 8.3.0
- TypeScript 7.0.2
- React 19.3.0 / React DOM 19.3.0 (instalados, mas fora do render de produção)
- Lucide React 1.46.0
- HTML, CSS e JavaScript nativo na produção
- npm 11.19.0
- Node.js 24.x

## Desenvolvimento local

Instale exatamente as dependências registradas no lockfile:

```bash
npm ci
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Gere o build de produção:

```bash
npm run build
```

Visualize o build localmente:

```bash
npm run preview
```

O build é gerado em `dist/`.

## Vercel

O projeto está conectado ao Vercel com preset **Vite** e produção vinculada à branch `main`.

Fluxo atual:

1. commit em `main`;
2. Vercel executa `npm ci`;
3. Vercel executa `npm run build`;
4. Vite gera `dist/`;
5. o deploy de produção é publicado após o build concluir com sucesso.

O projeto não exige banco de dados nem variáveis de ambiente no fluxo atual.
