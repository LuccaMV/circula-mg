# Documentação — Circula·MG

Rede de reaproveitamento de bens móveis das universidades federais de Minas Gerais.

Esta pasta reúne a documentação de produto do Circula·MG. Ela foi construída a
partir do material-fonte do projeto:

| Fonte | O que é |
|---|---|
| `circula_mg_prototipo.jsx` | Protótipo React de referência (idêntico a `circula-mg-app/src/App.jsx`) |
| `circula-mg-app/` | Pacote executável do protótipo (Vite + React) |
| `circula-mg-app/README.md` | Contexto do projeto de pesquisa, roadmap e tokens visuais |
| `circula-mg-app/package.json` | Stack e dependências declaradas |

Todo o comportamento descrito como **"implementado"** nestes documentos foi
verificado diretamente no código do protótipo. Tudo que é **proposta** está
marcado como tal.

---

## Índice

| Documento | Conteúdo |
|---|---|
| [01 — Descrição](01-descricao.md) | O que é o produto, o problema que resolve, contexto normativo, posicionamento, público-alvo e escopo |
| [02 — Benefícios](02-beneficios.md) | Ganhos por stakeholder, diferenciais frente ao sistema nacional, indicadores de sucesso e limitações |
| [03 — Como funciona](03-como-funciona.md) | Ciclo de vida do bem, módulos, papéis, regras de negócio e jornadas de uso |
| [04 — Especificações](04-especificacoes.md) | Arquitetura, modelo de dados, API, requisitos funcionais e não funcionais, design system e roadmap |
| [05 — Glossário e referências](05-glossario-referencias.md) | Termos, siglas e fontes normativas |
| [06 — Estrutura do site](06-estrutura-do-site.md) | Análise das referências (UNIFAL-MG e Apple), mapa do site, estrutura da home seção a seção e requisitos obrigatórios |
| [07 — Conteúdo do site](07-conteudo-do-site.md) | *Copy deck*: tom de voz, títulos e textos de cada seção, microcopy de botões e formulários, descrição das mídias e SEO |
| [08 — Identidade visual da UNIFAL-MG](08-identidade-visual-unifal.md) | Paleta com hex, tipografia, botões e tom de voz capturados do portal oficial; contraste calculado e o que o produto herda |
| [Brand board](brand-board-unifal.html) | Peça visual da identidade da UNIFAL-MG — abrir no navegador |

---

## O site

O site público está implementado em `circula-mg-app/src/site/`, seguindo os
documentos 06 e 07. A aplicação original (protótipo) continua intacta e passou a
viver na rota `/app`.

```bash
npm install --prefix circula-mg-app
```

```bash
npm run dev --prefix circula-mg-app
```

| Arquivo | Papel |
|---|---|
| `src/site/Site.jsx` | Casca e rotas |
| `src/site/Home.jsx` | As 16 seções da home |
| `src/site/pages.jsx` | Vitrine, detalhe do bem, como funciona, transparência, adesão, base normativa, ajuda, casos e páginas obrigatórias |
| `src/site/ui.jsx` | Cabeçalho, rodapé, barra gov.br, selo, cartão de bem, stepper |
| `src/site/tokens.js` | Design system (docs 04 §4.9 + herança do doc 08) |
| `src/site/data.js` | Dados e indicadores derivados — nenhum número inventado |

---

## Publicação

| Arquivo | Papel |
|---|---|
| `.gitignore` | Impede `node_modules/`, `dist/`, `.env*`, chaves e o `.docx` do projeto de entrarem no repositório |
| `vercel.json` | Rewrite de SPA (sem ele `/vitrine` dá 404) + CSP e demais cabeçalhos de segurança |
| `.env.example` | Modelo de variáveis, com o alerta de que todo `VITE_*` é público |
| `public/robots.txt` | Pede para não indexar enquanto os dados forem simulados |

**Dois pontos exigem decisão antes de publicar:** o uso da marca da UNIFAL-MG em
domínio público precisa do aval da Dicom, e os indicadores rotulados como piloto
são simulados — a tarja de protótipo cobre isso e não deve ser desligada.

---

## Estado atual em uma linha

Protótipo de front-end funcional, com dados simulados em memória, sem back-end,
sem autenticação e sem persistência — desenhado para demonstrar o fluxo completo
de uso antes do desenvolvimento do piloto institucional.

## Origem

Apêndice A do projeto de qualificação *"Reaproveitamento de bens públicos:
pesquisa sobre gargalos operacionais no Portal Doações gov.br e ferramenta
digital de reuso"* — Augusto Carlos Marchetti, Programa de Pós-Graduação em
Ciências Ambientais, UNIFAL-MG.
