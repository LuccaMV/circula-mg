# circula-mg-app

Pacote da aplicação web do Circula·MG — site público e protótipo da aplicação,
em React + Vite.

> A documentação completa do produto está na raiz do repositório:
> **[README principal](../README.md)** · **[docs/](../docs/)**

---

## Rodar

Pré-requisito: Node.js 18+.

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

---

## Organização

| Caminho | Papel |
|---|---|
| `src/main.jsx` | Ponto de entrada |
| `src/index.css` | Reset, responsividade, botão de destaque, foco visível |
| `src/App.jsx` | A aplicação — Vitrine, Cadastro, Painel, Notificações. Roda em `/app` |
| `src/site/Site.jsx` | Casca do site e tabela de rotas |
| `src/site/Home.jsx` | Seções da página inicial |
| `src/site/pages.jsx` | Vitrine, detalhe do bem, como funciona, transparência, adesão, base normativa, ajuda e páginas obrigatórias |
| `src/site/Entrar.jsx` | Tela de acesso |
| `src/site/ui.jsx` | Cabeçalho, rodapé, selo, cartão de bem, stepper, botões, tarja de protótipo |
| `src/site/tokens.js` | **Fonte única** de cor e tipografia — inclusive para `App.jsx` |
| `src/site/taxonomia.js` | Filtros de tipo de bem e regras de combinação |
| `src/site/data.js` | Dados e indicadores derivados |
| `src/site/sessao.js` | Sessão de demonstração (não é autenticação) |
| `public/marca/` | Logotipo institucional da UNIFAL-MG |
| `standalone/` | Versão em arquivo único, sem build — só para demonstração rápida |

### Onde mexer

| Quero mudar… | Arquivo |
|---|---|
| Cor ou fonte | `src/site/tokens.js` |
| Lista de filtros de tipo | `src/site/taxonomia.js` |
| Texto das seções da home | `src/site/Home.jsx` |
| Bens de demonstração | `SEED`, em `src/App.jsx` |
| Uma rota nova | `src/site/Site.jsx` |

---

## Convenções

- **Sem números inventados.** Todo indicador é derivado dos registros reais e
  carrega data de apuração. Seções sem dado não são renderizadas — ver
  `indicadores()` e `casos` em `src/site/data.js`.
- **Cor nunca é o único portador de informação.** As categorias usam uma rampa
  monocromática azul; o rótulo por extenso acompanha sempre (WCAG 1.4.1).
- **Um botão de destaque por tela**, na ação que a tela existe para provocar.
- Estilos ficam inline nos componentes; só o que precisa de media query,
  pseudo-elemento ou pseudo-classe vai para `index.css`.
