# 04 — Especificações

Este documento separa, o tempo todo, duas camadas:

- 🟢 **Implementado** — verificado no código de `circula-mg-app/src/App.jsx`
  (idêntico a `circula_mg_prototipo.jsx`);
- 🔵 **Proposta** — especificação do piloto institucional, ainda não construída.

---

## 4.1 Arquitetura

### 🟢 Arquitetura atual (protótipo)

Aplicação de página única, **sem back-end**. Todo o estado vive em memória, no
componente raiz.

```
┌─────────────────────────────────────────────┐
│  Browser                                    │
│  ┌───────────────────────────────────────┐  │
│  │  CirculaMG  (componente raiz)         │  │
│  │  useState: tab · bens · openBem · toast│  │
│  │  ┌─────────┬─────────┬────────┬─────┐ │  │
│  │  │ Vitrine │Cadastro │ Painel │Notif│ │  │
│  │  └─────────┴─────────┴────────┴─────┘ │  │
│  │  Modal (detalhe)  ·  Toast            │  │
│  └───────────────────────────────────────┘  │
│  Dados: constantes SEED e NOTIFS            │
└─────────────────────────────────────────────┘
```

Consequências diretas: **nada persiste** entre recarregamentos, não há
autenticação, e todo usuário vê o mesmo estado.

### 🔵 Arquitetura alvo (piloto)

```
┌──────────────┐   HTTPS    ┌───────────────────┐
│  SPA React   │───────────►│   API REST        │
│  (Vite)      │◄───────────│   (auth por JWT)  │
└──────┬───────┘            └────┬─────────┬────┘
       │                         │         │
       │ OIDC/SAML               │         │
       ▼                         ▼         ▼
┌──────────────┐        ┌────────────┐  ┌──────────────┐
│ SSO institu- │        │ PostgreSQL │  │ Object store │
│ cional /CAFe │        │            │  │ (imagens)    │
└──────────────┘        └────────────┘  └──────────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │ Fila de notificações   │
                  │ (e-mail / push)        │
                  └────────────────────────┘
                               │
                  ┌────────────┴───────────┐
                  ▼                        ▼
          ┌──────────────┐        ┌─────────────────┐
          │    Siads     │        │ Doações gov.br  │
          └──────────────┘        └─────────────────┘
```

---

## 4.2 Stack técnica

### 🟢 Atual

| Camada | Tecnologia | Versão declarada |
|---|---|---|
| UI | React + React DOM | `^18.2.0` |
| Build / dev server | Vite | `^5.2.0` |
| Plugin React | `@vitejs/plugin-react` | `^4.2.1` |
| Ícones | `lucide-react` | `^0.383.0` |
| Gráficos | `recharts` | `^2.12.0` |
| Estilos | CSS-in-JS via `style` inline | — sem framework |
| Fontes | Google Fonts via `@import` em `<style>` | Source Serif 4, Inter, IBM Plex Mono |

Não há TypeScript, linter, formatador, testes nem gerenciador de estado.

### 🔵 Proposta para o piloto

| Camada | Sugestão | Justificativa |
|---|---|---|
| Back-end | API REST (Node/TypeScript ou Python) | Alinha com a stack de front já escolhida |
| Banco | **PostgreSQL** | Definido no roadmap do projeto |
| Autenticação | OIDC/SAML — SSO institucional, CAFe | Definido no roadmap |
| Armazenamento de imagens | Object store ou repositório institucional | Definido no roadmap |
| Tipagem | TypeScript | Modelo de dados com 5 enums normativos exige rigor |
| Testes | Vitest + Testing Library | Regras de classificação e transição de estado precisam de cobertura |

---

## 4.3 Modelo de dados

### 🟢 Estrutura atual do bem

Objeto plano, definido no array `SEED`:

```js
{
  id:        "PAT-004821",              // string — número de patrimônio
  nome:      "Armário de aço 2 portas", // string
  campus:    "Alfenas",                 // string — deve existir em CAMPI
  categoria: "ocioso",                  // chave de CATS
  status:    "disponivel",              // chave de STATUS
  setor:     "Almoxarifado Central",    // string livre
  dias:      4,                         // number — dias desde a publicação
  step:      2,                         // number 1..6 — posição em STEPS
  filtros:   ["mobiliario",             // string[] — chaves de FILTROS,
              "armazenamento"],         //   ao menos uma, atribuídas no cadastro
  descricao: "…"                        // string — estado de conservação
}
```

Notificação simulada (`NOTIFS`):

```js
{ bem: "Cadeira giratória estofada", campus: "Poços de Caldas",
  cat: "ocioso", setor: "Almoxarifado", t: "há 8 min" }
```

### 🔵 Modelo relacional proposto

```
Instituicao ──1:N── Campus ──1:N── Setor
                       │              │
                       └──────┬───────┘
                              │
Usuario ──N:1── Perfil        │
   │                          │
   │            ┌─────────────┴──────────────┐
   │            │            Bem              │
   │            └──┬────────┬────────┬───────┘
   │               │        │        │
   │      Classificacao  Publicacao  Movimentacao
   │               │        │
   │               │        └──1:N── ManifestacaoInteresse ──N:1── Usuario
   │
   └──1:N── RegraNotificacao ──1:N── Notificacao
                                          │
                              Auditoria (transversal)
```

#### `bem`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | UUID | chave primária |
| `numero_patrimonio` | string | ex.: `PAT-004821`; único por instituição; chave de conciliação com o Siads |
| `nome` | string | obrigatório |
| `descricao` | text | descrição e estado de conservação |
| `campus_id` | FK | |
| `setor_id` | FK | |
| `categoria_atual` | enum | `regular · ocioso · recuperavel · antieconomico · irrecuperavel` |
| `status` | enum | `disponivel · reservado · transferido` |
| `step` | smallint | 1..6 |
| `valor_mercado_estimado` | decimal | insumo do critério dos 50% (art. 3º) |
| `custo_recuperacao_estimado` | decimal | idem |
| `filtros` | enum[] | 1..N chaves da taxonomia de tipo — obrigatório ao menos uma. No modelo relacional, tabela de junção `bem_filtro` |
| `imagens` | array de URL | roadmap item 4 |
| `publicado_em` | timestamp | **substitui o campo `dias`** — a idade passa a ser derivada |
| `criado_em` / `criado_por` | timestamp / FK | |

#### `classificacao`

Registro histórico — uma linha por decisão, nunca sobrescrita.

| Campo | Tipo | Notas |
|---|---|---|
| `id` | UUID | |
| `bem_id` | FK | |
| `categoria_proposta` | enum | o que o Setor de Patrimônio sugeriu |
| `categoria_confirmada` | enum | o que a Comissão decidiu |
| `justificativa` | text | obrigatória quando difere da proposta |
| `comissao_id` | FK | |
| `decidido_por` | FK usuário | |
| `decidido_em` | timestamp | |

#### `manifestacao_interesse`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | UUID | |
| `bem_id` / `usuario_id` / `setor_destino_id` | FK | |
| `justificativa` | text | destinação pretendida |
| `status` | enum | `pendente · aprovada · recusada · cancelada` |
| `criado_em` | timestamp | |

#### `regra_notificacao`

| Campo | Tipo | Notas |
|---|---|---|
| `id` | UUID | |
| `usuario_id` / `setor_id` | FK | |
| `categorias[]` | enum[] | vazio = todas |
| `campi[]` | FK[] | vazio = todos |
| `canal` | enum | `email · push · ambos` |
| `frequencia` | enum | `imediata · diaria · semanal` — controle contra ruído |
| `ativa` | boolean | |

#### `movimentacao` e `auditoria`

`movimentacao` registra a transferência efetiva (origem, destino, datas, termo).
`auditoria` registra toda transição de estado com autor, timestamp, valores
anterior e posterior — requisito do roadmap item 3.

---

## 4.4 Enumerações normativas

Valores exatos do código. **São a fonte de verdade da interface** e não devem
ser alterados sem alteração normativa correspondente.

### Categorias (art. 3º, Decreto nº 12.785/2025)

Rampa azul institucional: quanto mais escuro, mais próximo do fim de vida útil do
bem. `color` é a cor de marca (selo, ponto, borda); `ink` é a variante usada em
texto, escurecida até ≥4,5:1 sobre fundo claro.

| Chave | Rótulo | `color` | `ink` | Origem |
|---|---|---|---|---|
| `regular` | Uso regular | `#00AEEE` | `#007AA7` | UNIFAL — ciano de apoio (medido) |
| `ocioso` | Ocioso | `#0091D1` | `#0078AD` | UNIFAL — Ensino (medido) |
| `recuperavel` | Recuperável | `#0F6FB5` | `#0F6FB5` | derivada |
| `antieconomico` | Antieconômico | `#0B4C97` | `#0B4C97` | derivada |
| `irrecuperavel` | Irrecuperável | `#051B42` | `#051B42` | derivada de `#083780` |

Separação perceptual verificada entre passos adjacentes (ΔL* CIELAB, alvo ≥ 8):
**9,9 · 11,6 · 12,5 · 22,2**. Como a escala é monocromática, a cor nunca é o
único portador de informação — todo selo e etiqueta traz o rótulo por extenso
(WCAG 1.4.1).

### Status

| Chave | Rótulo | `color` | `ink` |
|---|---|---|---|
| `disponivel` | Disponível | `#0091D1` | `#0078AD` |
| `reservado` | Reservado | `#0F6FB5` | `#0F6FB5` |
| `transferido` | Transferido | `#051B42` | `#051B42` |

### Etapas do fluxo

`Cadastrado` → `Classificado` → `Publicado` → `Interesse` → `Aprovado` → `Reaproveitado`

### Filtros de tipo de bem 🟢

Dimensão **multivalorada**, atribuída no cadastro — distinta das outras três,
que aceitam um valor só. Um armário de aço é ao mesmo tempo *Mobiliário* e
*Armazenamento*. É por essa dimensão que o servidor procura na prática
("preciso de algo de informática"), e não pela categoria normativa.

Fonte: `circula-mg-app/src/site/taxonomia.js`.

| Chave | Rótulo | Abrange |
|---|---|---|
| `mobiliario` | Mobiliário | Mesas, cadeiras, armários, estantes e balcões |
| `armazenamento` | Armazenamento | Bens destinados a guardar materiais ou documentos |
| `informatica` | Informática | Computadores, periféricos e equipamentos de rede |
| `audiovisual` | Audiovisual | Projetores, telas, som e equipamentos de imagem |
| `salaDeAula` | Sala de aula | Bens de uso didático direto |
| `laboratorio` | Laboratório | Equipamentos e bancadas de laboratório |
| `climatizacao` | Climatização | Ar-condicionado, ventilação e aquecimento |
| `eletrodomesticos` | Eletrodomésticos | Aparelhos elétricos de uso geral |
| `copaRefeitorio` | Copa e refeitório | Bens de copa, cozinha e refeitório |
| `escritorio` | Escritório | Apoio administrativo e atendimento |

**Regra de combinação:** filtros selecionados combinam entre si por **OU**
(o bem casa se tiver ao menos um) e por **E** com categoria, campus, status e
busca textual. Seleção vazia não restringe nada.

**Estado na URL:** a vitrine do site guarda a seleção em query string
(`/vitrine?filtros=mobiliario,informatica&campus=Alfenas`), de modo que uma
busca filtrada é um link compartilhável entre servidores.

**Tolerância:** `filtrosDoBem()` ignora chaves desconhecidas e devolve lista
vazia para bens sem o campo — registros anteriores à introdução da taxonomia não
quebram a vitrine.

### Campi (piloto UNIFAL-MG)

`Alfenas` · `Poços de Caldas` · `Varginha` · `Santa Rita do Sapucaí`

> ⚠️ Ver [§4.13, item 1](#413-pendências-e-inconsistências-detectadas).

---

## 4.5 Requisitos funcionais

| ID | Requisito | Estado |
|---|---|---|
| **RF-01** | Cadastrar bem com nome, campus, setor, classificação proposta e descrição | 🟢 |
| **RF-02** | Bloquear envio de cadastro sem nome do bem | 🟢 |
| **RF-03** | Persistir a descrição e o estado de conservação informados | 🟢 *corrigido em 06/08/2026* |
| **RF-04** | Reter o bem em fila até a decisão da comissão, antes de publicar | 🔵 |
| **RF-05** | Permitir à comissão confirmar, alterar ou devolver a classificação, com justificativa | 🔵 |
| **RF-06** | Exibir vitrine de bens publicados em grade responsiva | 🟢 |
| **RF-07** | Buscar bens por nome, número de patrimônio e setor | 🟢 |
| **RF-08** | Filtrar por categoria, campus e status, combináveis | 🟢 |
| **RF-08a** | Atribuir um ou mais filtros de tipo ao bem no cadastro, com ao menos um obrigatório | 🟢 |
| **RF-08b** | Filtrar a vitrine por filtros de tipo, combinados por OU entre si | 🟢 |
| **RF-08c** | Refletir a seleção de filtros na URL, tornando a busca compartilhável | 🟢 |
| **RF-08d** | Exibir os filtros do bem no cartão e no detalhe, com atalho para a vitrine filtrada | 🟢 |
| **RF-09** | Exibir contagem de resultados filtrados | 🟢 |
| **RF-10** | Exibir detalhe do bem com categoria, status, localização e referência normativa | 🟢 |
| **RF-11** | Exibir o *stepper* das 6 etapas com progresso do bem | 🟢 |
| **RF-12** | Registrar manifestação de interesse | 🟡 *confirmação visual, sem persistência* |
| **RF-13** | Alterar status para `Reservado` ao registrar interesse | 🔵 |
| **RF-14** | Aprovar transferência e registrar reaproveitamento | 🔵 |
| **RF-15** | Exibir KPIs: cadastrados, disponíveis, reaproveitados, tempo médio | 🟢 |
| **RF-16** | Exibir distribuição por categoria (donut) | 🟢 |
| **RF-17** | Exibir volume de bens por campus (barras) | 🟢 |
| **RF-18** | Listar notificações por categoria + campus + setor compatível | 🟡 *lista estática* |
| **RF-19** | Cadastrar regras de interesse (categoria × campus) por usuário/setor | 🔵 |
| **RF-20** | Disparar notificação automática na publicação de bem compatível | 🔵 |
| **RF-21** | Autenticar via SSO institucional e derivar perfil e campus | 🔵 |
| **RF-22** | Aplicar permissões por perfil | 🔵 |
| **RF-23** | Upload e exibição de imagens do bem | 🔵 |
| **RF-24** | Trilha de auditoria de toda transição de estado | 🔵 |
| **RF-25** | Importar dados do bem a partir do Siads pelo número de patrimônio | 🔵 |
| **RF-26** | Espelhar publicação no Doações gov.br quando exigido | 🔵 |

🟢 implementado · 🟡 parcial · 🔴 defeito conhecido · 🔵 proposta

---

## 4.6 Requisitos não funcionais

| Categoria | Requisito |
|---|---|
| **Segurança** | Autenticação obrigatória para escrita; autorização por perfil verificada no servidor, nunca só na UI; HTTPS obrigatório |
| **LGPD** | Dados pessoais tratados: nome institucional, e-mail, lotação. Base legal: execução de política pública. Minimizar exposição no perfil de Consulta Pública |
| **Auditoria** | Toda transição de estado registrada com autor, data/hora e valores anterior/posterior — imutável |
| **Acessibilidade** | Alvo WCAG 2.1 AA. Já há `outline` visível em foco de `input`, `select`, `textarea` e `button:focus-visible`. Faltam: rótulos ARIA, navegação por teclado no modal (fechar com `Esc`, *focus trap*) e verificação de contraste dos textos secundários |
| **Responsividade** | Grade da vitrine já é fluida (`auto-fill`, coluna mínima de 250 px) e cabeçalho/filtros usam `flex-wrap`. Os gráficos do painel usam grade fixa de 2 colunas — precisa de *breakpoint* para telas estreitas |
| **Desempenho** | Vitrine paginada ou com carregamento incremental acima de ~200 bens; hoje toda a lista é filtrada em memória |
| **Disponibilidade** | Serviço não crítico: janela de manutenção aceitável; sem exigência de alta disponibilidade no piloto |
| **Internacionalização** | Não aplicável — produto monolíngue (pt-BR) por natureza normativa |
| **Navegadores** | Versões correntes de Chrome, Firefox e Edge |

---

## 4.7 API REST proposta 🔵

| Método | Rota | Descrição | Perfil |
|---|---|---|---|
| `GET` | `/bens` | Lista publicados. Query: `q`, `categoria`, `campus`, `status`, `page` | todos |
| `GET` | `/bens/{id}` | Detalhe do bem, com histórico de classificação | todos |
| `POST` | `/bens` | Cadastra bem com classificação proposta | Patrimônio |
| `PATCH` | `/bens/{id}` | Edita bem antes da classificação | Patrimônio |
| `POST` | `/bens/{id}/imagens` | Upload de imagem | Patrimônio |
| `GET` | `/comissao/fila` | Bens aguardando decisão | Comissão |
| `POST` | `/bens/{id}/classificacao` | Confirma/altera categoria, com justificativa | Comissão |
| `POST` | `/bens/{id}/publicar` | Publica na vitrine e dispara notificações | Comissão |
| `POST` | `/bens/{id}/interesse` | Registra manifestação de interesse | Solicitante |
| `POST` | `/interesses/{id}/aprovar` | Aprova a transferência | Comissão |
| `POST` | `/bens/{id}/reaproveitar` | Encerra o ciclo | Patrimônio |
| `GET` | `/notificacoes` | Notificações do usuário | autenticado |
| `GET`/`POST`/`DELETE` | `/regras-notificacao` | CRUD de regras de interesse | autenticado |
| `GET` | `/painel/indicadores` | KPIs. Query: `campus`, `de`, `ate` | todos |
| `GET` | `/painel/por-categoria` | Série do donut | todos |
| `GET` | `/painel/por-campus` | Série das barras | todos |
| `GET` | `/bens/{id}/auditoria` | Trilha de auditoria | Patrimônio, Comissão |

---

## 4.8 Autenticação e perfis

### Tela de acesso — implementada 🟢

`/entrar` (`src/site/Entrar.jsx`). Painel institucional à esquerda, acesso à
direita, com dois caminhos:

| Caminho | Estado | Comportamento |
|---|---|---|
| **Entrar com a identidade UNIFAL-MG** | 🔵 fachada | Botão primário. No piloto, redireciona ao provedor OIDC/SAML da universidade |
| **Acesso de demonstração** | 🟢 funcional | E-mail institucional + campus + escolha de perfil. Abre sessão local e leva a `/app` |

**Decisão de projeto: não há campo de senha.** Na arquitetura definida abaixo, a
autenticação ocorre no provedor de identidade da universidade e o Circula·MG
**nunca recebe nem armazena a senha do servidor**. Um formulário de senha dentro
do produto seria arquiteturalmente errado e ampliaria a superfície de ataque sem
necessidade.

A sessão de demonstração (`src/site/sessao.js`) guarda apenas o perfil escolhido
em `sessionStorage`, para que a aplicação saiba o que exibir. **Nenhuma
credencial é verificada, transmitida ou armazenada**, e a tela diz isso ao
usuário. `/app` sem sessão redireciona para `/entrar`.

### Arquitetura alvo 🔵

- **Protocolo:** OIDC ou SAML contra a identidade única da UNIFAL-MG; federação
  **CAFe** para expansão às demais universidades federais de MG.
- **Derivação automática:** campus e setor vêm dos atributos da identidade; o
  perfil é atribuído por administrador.
- **Perfis:** `Setor de Patrimônio`, `Comissão de Avaliação`, `Servidor
  Solicitante`, `Consulta Pública` (este último sem autenticação).
- **Multi-instituição:** o modelo já prevê a entidade `Instituicao` acima de
  `Campus`, condição para a rede das 11 universidades sem refatoração.

---

## 4.9 Design system

> **Atualizado em 06/08/2026.** A identidade própria original (fundo cor de
> papel, verde de circularidade, Source Serif 4) foi **substituída pela
> identidade institucional da UNIFAL-MG**, por decisão de projeto: o Circula·MG
> passou a ser tratado como sistema interno da universidade. Os valores abaixo
> são os medidos no portal oficial — ver
> [08 — Identidade visual da UNIFAL-MG](08-identidade-visual-unifal.md).
> Fonte única no código: `circula-mg-app/src/site/tokens.js`.

### Tokens de cor

| Token | Valor | Uso |
|---|---|---|
| `white` | `#FFFFFF` | fundo dominante |
| `paper` | `#F7F7F7` | fundo de seção alternada |
| `govBar` | `#F1F1F1` | faixa do governo brasileiro |
| `ink` | `#222222` | texto principal |
| `textMuted` | `#626262` | texto secundário — 6,10:1 |
| `textFaint` | `#767676` | rótulos e metadados — 4,54:1 |
| `line` | `#E8E8E8` | bordas |
| `lineSoft` | `#F1F1F1` | divisores internos e grade de gráfico |
| `brand` / `institutionalBlue` | **`#083780`** | primária: botões, foco, gráficos, stepper — 11,24:1 com branco |
| `brandHover` | `#07378D` | variante de botão do portal |

### Tipografia

| Família | Uso | Racional |
|---|---|---|
| **Poppins** | títulos (700, espaçamento −1px) | tratamento de manchete do portal da UNIFAL |
| **Jost** | interface, corpo, botões | fonte padrão do `body` no portal |
| **Roboto Condensed** | número de patrimônio, rótulos, etiquetas | usada em editorias e botões do portal |

### Botões

| Nível | Componente | Aparência |
|---|---|---|
| **Destaque** | `BtnDestaque` / `.cmg-btn-3d` | Relevo de 4 px, canto 16 px, Roboto Condensed 700 em caixa alta. Afunda ao clique |
| Primário | `Btn` | Fundo `brand`, canto 3 px, Jost 600 |
| Secundário | `Btn variant="secondary"` | Contorno `line`, fundo transparente |
| Etiqueta / chip | inline | Canto 20 px, usada em filtros e categorias |

**Regra de uso do botão de destaque:** ele marca a ação que a tela existe para
provocar, e só ela. Hoje aparece em quatro lugares — o CTA do hero, a adesão na
home (variante clara sobre o azul), o acesso por SSO em `/entrar` e a
manifestação de interesse no detalhe do bem e no modal da aplicação. Telas de
consulta (vitrine, transparência, como funciona) **não têm nenhum**.

O estilo veio de um componente do Uiverse (`cssbuttons-io`) e foi adaptado: o
original era um seletor global `button`, que atingiria chips de filtro, abas e
botões de fechar. Aqui é uma classe; as cores passaram para a paleta
institucional (`#083780` na face, `#041C4C` no relevo); `position: relative`
ficou explícito, em vez de depender do containing block criado por acaso pelo
`translateZ(0)`; e o `outline: none` do original foi substituído por um foco
visível, que ele removia.

Carregadas em `index.html`. As cores de categoria e status estão em
[§4.4](#44-enumerações-normativas).

### Elementos característicos

- **Selo circular** (`Stamp_`) — círculo de 58 px com borda dupla (sólida +
  tracejada), rotacionado −8°, na cor da categoria. Representa a classificação
  atribuída pela comissão. O mesmo elemento, em 34 px, é o logotipo.
- **Pill** — selo arredondado com ponto colorido, borda e fundo derivados da cor
  base por opacidade (`55` e `14` em hexadecimal).
- **Cartões** — fundo branco, borda `1px #DBD8CB`, raio 4 px; elevação e
  deslocamento de −2 px no *hover*.
- **Layout** — coluna central de **1080 px** máximos, com 24 px de recuo lateral.

---

## 4.10 Estrutura do repositório

```
circula-MG/
├── circula_mg_prototipo.jsx      # protótipo de referência (= src/App.jsx)
├── docs/                         # esta documentação
└── circula-mg-app/
    ├── index.html                # HTML raiz (Vite)
    ├── package.json
    ├── vite.config.js
    ├── README.md                 # contexto do projeto de pesquisa
    ├── src/
    │   ├── main.jsx              # ponto de entrada React
    │   ├── index.css             # reset e estilos globais mínimos
    │   └── App.jsx               # UI completa e dados simulados
    └── standalone/
        └── circula_mg.html       # versão React via CDN, sem build
```

### Componentes em `App.jsx`

| Componente | Responsabilidade |
|---|---|
| `CirculaMG` | Raiz — estado global, abas, cabeçalho, orquestração |
| `Vitrine` | Busca, filtros e grade de cartões |
| `Card` | Cartão do bem |
| `Modal` | Detalhe do bem com *stepper* e ação de interesse |
| `Stepper` | Trilha visual das 6 etapas |
| `Cadastro` | Formulário de entrada do bem |
| `Painel` | KPIs e os dois gráficos |
| `Notificacoes` | Lista de avisos |
| `KPI` | Cartão de indicador |
| `Pill` | Selo de categoria/status |
| `Stamp_` | Selo circular da classificação |
| `Toast` | Confirmação flutuante (fecha sozinho em 3,8 s) |

### Como executar

Pré-requisito: Node.js 18+.

```bash
npm install
```

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

Para demonstração sem instalar nada, abrir `standalone/circula_mg.html`
diretamente no navegador. Essa versão serve para apresentação — **não é a base
para evolução do código**.

---

## 4.11 Roadmap — do protótipo ao piloto

Ordem sugerida de execução, com as dependências explicitadas.

| # | Entrega | Depende de | Por que nessa ordem |
|---|---|---|---|
| 1 | **Back-end e persistência** (PostgreSQL + API REST), substituindo `SEED` | — | Sem estado durável, nenhuma outra funcionalidade se sustenta |
| 2 | **Autenticação institucional** (SSO/CAFe) e os 4 perfis | 1 | Permissões dependem de identidade |
| 3 | **Workflow de aprovação real** da comissão, com justificativa e auditoria | 1, 2 | É o diferencial nº 2 do produto |
| 4 | **Regras de interesse + disparo de notificações** | 1, 2 | É o diferencial nº 1 do produto |
| 5 | **Upload de imagens** | 1 | Aumenta muito a qualidade da decisão sobre bens recuperáveis |
| 6 | **Indicadores derivados de datas reais** (substituindo `dias` fixo) | 1, 3 | É o diferencial nº 3 do produto |
| 7 | **Interoperabilidade** — Siads e Doações gov.br | 1 | Elimina dupla digitação; pode correr em paralelo |
| 8 | **Testes de usabilidade** com servidores dos setores de patrimônio | 3, 4 | Ciclos de pesquisa-ação: diagnóstico → intervenção → avaliação |

---

## 4.12 Plano de validação

Alinhado ao desenho de **pesquisa-ação** do projeto, em três ciclos:

| Ciclo | Atividade | Saída |
|---|---|---|
| **Diagnóstico** | Levantamento dos gargalos operacionais com os setores de patrimônio; mapeamento do fluxo atual de desfazimento | Fluxo "como é hoje" e linha de base dos indicadores |
| **Intervenção** | Implantação do piloto na UNIFAL-MG; capacitação; operação assistida por um período definido | Sistema em uso com bens reais |
| **Avaliação** | Testes de usabilidade, entrevistas e comparação dos indicadores com a linha de base | Evidência de efeito e ajustes para expansão à rede |

**Critérios de sucesso do piloto** *(a calibrar com a linha de base)*: redução do
tempo médio entre publicação e manifestação de interesse; taxa de
reaproveitamento superior à do canal nacional para os mesmos bens; e adesão
efetiva dos campi participantes.

---

## 4.13 Pendências e inconsistências detectadas

Levantadas na leitura do código e do README. Ordenadas por impacto.

1. **`Santa Rita do Sapucaí` não é campus da UNIFAL-MG.** A constante `CAMPI`
   lista quatro campi, mas a UNIFAL-MG é estruturada em **Alfenas** (sede +
   Unidade Educacional Santa Clara), **Poços de Caldas** e **Varginha**. Como o
   cabeçalho identifica o piloto como UNIFAL-MG, ou o campus deve ser
   substituído pela Unidade Santa Clara, ou o rótulo do piloto deve ser
   ajustado.
2. ~~**A descrição do bem é descartada.**~~ **Corrigido em 06/08/2026.**
   `handleCadastro` passou a incluir `descricao` no objeto criado, e tanto o
   modal da aplicação quanto o detalhe do bem no site passaram a exibi-la.
   *(RF-03)*
3. **O cadastro não passa pela comissão.** O bem enviado entra direto na vitrine
   com status `disponivel`, contrariando o texto exibido ao próprio usuário
   ("segue para a comissão de avaliação") e o art. 19 do decreto. *(RF-04)*
4. **`dias` é um número fixo, não uma data.** "Publicado há N dias" nunca
   envelhece, e o KPI de tempo médio não reflete o tempo real. Substituir por
   `publicado_em` e derivar a idade.
5. **Divisão por zero no KPI de tempo médio.** `tempoMedio` divide pela
   contagem total sem verificar lista vazia — com zero bens, exibe `NaNd`.
6. **Subtítulo de KPI fixo em "rede de 4 campi".** É texto literal; não
   acompanha o tamanho de `CAMPI`.
7. **Formato de número de patrimônio inconsistente.** Os dados simulados usam
   `PAT-00XXXX` (com zeros à esquerda); os gerados no cadastro produzem seis
   dígitos entre 100000 e 999999. Além disso, o valor é aleatório, sem garantia
   de unicidade.
8. ~~**Busca limitada ao nome.**~~ **Corrigido.** A busca alcança nome, número
   de patrimônio e setor, no site e na aplicação.
9. **`step` e `status` são independentes.** Nada impede um registro com
   `status: "transferido"` e `step: 2`. A máquina de estados de
   [§3.2](03-como-funciona.md#32-ciclo-de-vida-do-bem) deve tornar um derivado
   do outro.
10. **Notificações desconectadas do estado real.** A lista é constante e não
    reage a cadastros feitos na sessão.
11. **Acessibilidade do modal.** Não fecha com `Esc`, não tem *focus trap* nem
    `role="dialog"`.
12. **Grade do painel não é responsiva.** Os dois gráficos usam colunas fixas
    `1fr 1.3fr`, sem *breakpoint*.
13. **Fontes carregadas por `@import` dentro de `<style>`.** Bloqueia a
    renderização e sofre com FOUT; preferir `<link rel="preconnect">` +
    `<link rel="stylesheet">` no `index.html`.
14. **Arquivos citados no README que não existem no pacote:**
    `prompt_claude_code.json` e
    `Projeto_Qualificacao_Augusto_Marchetti_Decreto12785.docx`. O README também
    cita `circula_mg.html` como se estivesse na raiz, mas o arquivo está em
    `standalone/`.

---

**Anterior:** [03 — Como funciona](03-como-funciona.md) · **Próximo:** [05 — Glossário e referências](05-glossario-referencias.md)
