# 06 — Estrutura do site

Documento de arquitetura de informação do site público do Circula·MG,
construído a partir da análise de duas referências deliberadamente opostas.

---

## 6.1 Por que duas referências opostas

| | [UNIFAL-MG](https://www.unifal-mg.edu.br/portal/) | [Apple — iPhone 17 Pro](https://www.apple.com/br/iphone-17-pro/) |
|---|---|---|
| **Tipo** | Portal institucional | Página de produto |
| **Pressuposto sobre o visitante** | Já sabe o que quer; veio buscar | Não sabe se quer; precisa ser convencido |
| **Estrutura** | Densa, paralela, muitos pontos de entrada | Linear, um scroll, uma ideia por vez |
| **Navegação** | 12 menus + abas + atalhos + acesso rápido | Menu local curto + CTA repetido |
| **Densidade** | Alta — dezenas de links por tela | Baixa — muito respiro, uma headline por seção |
| **Sucesso é** | O visitante encontrar o link certo | O visitante rolar até o fim e clicar em "Comprar" |

O Circula·MG precisa das duas coisas, porque tem **dois visitantes com estados
mentais diferentes**:

- **O visitante que ainda não aderiu** — um pró-reitor de administração, um chefe
  de setor de patrimônio de outra universidade federal. Ele nunca ouviu falar do
  produto e precisa entender, em um scroll, o que é e por que vale a pena.
  → **lógica Apple**.
- **O visitante que já opera o sistema** — o servidor que vai cadastrar um bem ou
  procurar um projetor. Ele quer chegar rápido ao que precisa.
  → **lógica UNIFAL**.

**Decisão de arquitetura:** o site é uma **página de apresentação em scroll
narrativo (padrão Apple) apoiada sobre uma base institucional (padrão UNIFAL)** —
com a aplicação em si vivendo atrás do login, sem competir com a narrativa.

> Há uma armadilha aqui: o Circula·MG é um produto **público**, de universidade
> federal. Uma landing page puramente "Apple" — sem barra do governo, sem
> acessibilidade, sem transparência, sem identificação institucional — pareceria
> um produto comercial e **perderia legitimidade justamente com o público que
> precisa aprová-lo**. É por isso que a base institucional não é opcional.

---

## 6.2 Mapa da referência A — Portal UNIFAL-MG

| # | Seção | Função | Aplica? | Como entra no Circula·MG |
|---|---|---|---|---|
| 1 | Barra do governo brasileiro + logo + redes sociais | Identificação institucional | ✅ **Sim** | Obrigatória. Marca o produto como público e federal |
| 2 | Menu principal com 12 itens (Institucional, Pró-Reitorias, Ensino, Pesquisa…) | Navegação por estrutura organizacional | ❌ **Não** | Nosso produto tem um propósito só. Menu de 5 itens basta |
| 3 | Banner carrossel rotativo | Destaques rotativos | ❌ **Não** | Carrossel dilui a mensagem e tem baixa taxa de leitura. Nosso hero é fixo e único |
| 4 | Blocos temáticos em cards (Ensino, Pesquisa, Extensão…) | Segmentação por área | 🔶 **Adaptado** | Vira segmentação **por perfil de usuário**: Patrimônio, Comissão, Solicitante, Sociedade |
| 5 | Jornal / notícias por categoria | Conteúdo editorial contínuo | 🔶 **Adaptado** | Vira **"Casos de reaproveitamento"** — histórias reais de bens que circularam. É a nossa prova social |
| 6 | Oportunidades / Concursos / Editais | Chamadas com prazo | ❌ **Não** | Não se aplica |
| 7 | Eventos / Agenda | Calendário | ❌ **Não** | Eventual: capacitações do piloto. Não estrutura de home |
| 8 | Acesso rápido em abas (Alunos / Servidores) | Atalhos por público | ✅ **Sim** | **Excelente ideia.** Vira o bloco de acesso por perfil, no rodapé da home |
| 9 | Atalhos em ícones (Sistema Acadêmico, SEI, Moodle…) | Links diretos a sistemas | ✅ **Sim** | Vira links para **Siads, Doações gov.br, SEI, texto do decreto** — os sistemas vizinhos |
| 10 | **UNIFAL-MG em números** | Prova quantitativa institucional | ✅ **Sim — essencial** | Vira **"A rede em números"**: bens reaproveitados, campi ativos, tempo médio. Alimentado pelos KPIs reais do Painel |
| 11 | Mapa de localização dos campi | Presença territorial | ✅ **Sim** | Vira **mapa da rede** — as universidades federais de MG participantes. Comunica escala melhor que texto |
| 12 | Mídia e plataformas | Ecossistema de comunicação | ❌ **Não** | Não se aplica |
| 13 | Rodapé com contatos por campus + transparência + acesso à informação | Obrigações e contato | ✅ **Sim** | Obrigatório em produto público |

**O que a UNIFAL ensina:** legitimidade institucional se comunica por sinais
concretos — barra gov.br, contato real com endereço, link de transparência, selo
de acesso à informação, números auditáveis. Nada disso é decoração.

**O que evitar dela:** navegação espelhando o organograma, carrossel, e a
densidade de links que obriga o visitante a caçar.

---

## 6.3 Mapa da referência B — Apple iPhone 17 Pro

| # | Seção | Função narrativa | Aplica? | Como entra no Circula·MG |
|---|---|---|---|---|
| 1 | Navegação global + menu local do produto | Orientação | 🔶 **Adaptado** | Só o menu local, com 5 itens |
| 2 | **Hero** — produto + nome + "Comprar" | Impacto e CTA imediato | ✅ **Sim** | Hero com a frase-tese do produto e CTA duplo (ver vitrine / aderir) |
| 3 | **Seis cards de destaques** | Resumo escaneável do todo | ✅ **Sim** | Vira **3 cards** — os três diferenciais. Três é o número certo aqui; seis diluiria |
| 4 | Design — headline + visual interativo + cards técnicos | Especificação com prova visual | 🔶 **Adaptado** | Vira **"Como funciona"** com o *stepper* das 6 etapas como peça visual central |
| 5 | Câmeras — slider interativo de zoom + tabela | Demonstração interativa | ✅ **Sim** | Vira **demo da vitrine embutida na página** — filtros funcionando com dados reais. É a nossa "câmera" |
| 6 | Desempenho — "40% melhor" | Ganho quantificado | ✅ **Sim** | Vira o ganho de tempo: publicação → reaproveitamento, contra a linha de base |
| 7 | Bateria — números + tabela comparativa | Benefício mensurável | 🔶 **Adaptado** | Funde-se com a seção de números |
| 8–11 | iOS, Apple Intelligence, Segurança | Profundidade de recursos | 🔶 **Condensado** | Vira **uma** seção de recursos por módulo (Vitrine, Cadastro, Notificações, Painel) |
| 12 | **Comparação de upgrade com seletor** | Justificar a troca | ✅ **Sim — importante** | Vira **"Circula·MG e o Doações gov.br"**: tabela honesta de complementaridade, não de concorrência. Responde à objeção nº 1 |
| 13 | Acessórios | Catálogo adjacente | ❌ **Não** | Não se aplica |
| 14 | Migração do Android | Reduzir atrito de troca | ✅ **Sim** | Vira **"Como aderir"** — o passo a passo para uma universidade entrar na rede |
| 15 | Razões para comprar na Apple | Reassurance | ✅ **Sim** | Vira **FAQ / objeções**: "isso substitui o Siads?", "e a baixa patrimonial?", "quanto custa?" |
| 16 | **Impacto ambiental com estatísticas** | Valores | ✅ **Sim — central** | Não é acessório aqui, é a **razão de ser**: economia circular, art. 13 do decreto, cooperativas de catadores |
| 17 | Valores da empresa | Marca | 🔶 **Adaptado** | Vira **base normativa** — o Decreto nº 12.785/2025 é a nossa credencial |
| 18 | Comparação entre modelos | Escolha dentro da linha | ❌ **Não** | Produto único |
| 19 | Rodapé multicoluna | Navegação secundária | ✅ **Sim** | Combinado com o rodapé institucional da UNIFAL |

**O que a Apple ensina:** uma ideia por seção, headline curta em destaque
tipográfico, número grande quando há número, demonstração no lugar de descrição,
e a objeção principal enfrentada de frente (a tabela de comparação) em vez de
escondida.

**O que evitar dela:** superlativo vazio, animação pesada e o tom publicitário —
que, em produto público, soa como desperdício de recurso.

---

## 6.4 Síntese

```
        APPLE                                    UNIFAL
   (narrativa, conversão)                 (legitimidade, acesso)
           │                                        │
           ├── hero único e forte                   ├── barra gov.br
           ├── 3 cards de diferenciais              ├── "em números"
           ├── demo interativa                      ├── mapa da rede
           ├── números grandes                      ├── acesso por perfil
           ├── tabela que enfrenta a objeção        ├── links a sistemas vizinhos
           ├── passo a passo de adesão              ├── contato real
           └── seção de valores/ambiental           └── transparência + acessibilidade
                            │                        │
                            └───────────┬────────────┘
                                        ▼
                              SITE DO CIRCULA·MG
```

---

## 6.5 Mapa do site

```
circula.mg (ou circula.unifal-mg.edu.br)
│
├── /                      HOME — narrativa completa em scroll
├── /vitrine               Vitrine pública (consulta sem login)
│   └── /vitrine/{id}      Detalhe do bem
├── /como-funciona         Fluxo das 6 etapas, papéis, regras
├── /para-sua-universidade Adesão: requisitos, passo a passo, contato
├── /transparencia         Indicadores públicos da rede (Painel aberto)
├── /base-normativa        Decreto 12.785/2025, categorias, relação com Siads/Doações
├── /casos                 Casos de reaproveitamento
│   └── /casos/{slug}
├── /ajuda                 FAQ e materiais de apoio
├── /acessibilidade        Declaração de acessibilidade (obrigatória)
│
├── /entrar                Tela de acesso — SSO institucional
│
└── /app                   ── APLICAÇÃO (requer login) ──
    ├── /app/vitrine
    ├── /app/cadastrar
    ├── /app/comissao      fila de classificação
    ├── /app/notificacoes  + regras de interesse
    └── /app/painel
```

**Menu principal — 5 itens:**
`Vitrine` · `Como funciona` · `Transparência` · `Para sua universidade` · `Entrar`

Cinco, não doze. O único item destacado visualmente é **Entrar**.

---

## 6.6 Estrutura da home, seção a seção

Ordem de scroll. As headlines abaixo são propostas de trabalho, ancoradas no
produto real — não texto final.

---

### 0 · ~~Barra institucional~~  *(removida em 06/08/2026)*

Era a barra do governo brasileiro. Removida — ver
[§6.9](#69-requisitos-obrigatórios). A identificação institucional passou para o
cabeçalho.

---

### 1 · Cabeçalho  `[UNIFAL + APPLE]`

**Assinatura conjunta:** logotipo oficial da UNIFAL-MG (30 px), divisor vertical
e a marca do produto (selo circular + `Circula·MG`). A instituição vem primeiro —
o Circula·MG é um sistema dela. Em seguida, o menu de 4 itens e o botão
**Entrar**, que leva a `/entrar`.

---

### 2 · Hero  `[APPLE]`

Uma tela. Uma ideia.

> ## O que sobra em um campus falta no outro.
> Rede de reaproveitamento de bens móveis das universidades federais de Minas Gerais.
>
> **[Ver a vitrine]**  ·  [Como funciona]

Visual: a grade de selos circulares das cinco categorias, ou uma foto real de
almoxarifado. **Sem carrossel.** Sem vídeo autoplay.

---

### 3 · O problema  `[APPLE — seção de tensão]`

Três frases curtas, muito espaço em branco. Estabelece a dor antes da solução.

> Um armário em condições de uso parado há oito meses em Alfenas.
> Um processo de compra aberto para o mesmo armário em Varginha.
> Nenhum dos dois setores sabe da existência do outro.

---

### 4 · Os três diferenciais  `[APPLE — cards de destaque]`

Três cards. Ícone, headline de 3–5 palavras, uma frase.

| | Headline | Frase |
|---|---|---|
| 🔔 | **Você é avisado** | Declare o que procura uma vez. O sistema avisa quando aparecer — sem depender de busca manual |
| ✅ | **A comissão dentro do fluxo** | A classificação do art. 3º acontece no sistema, não em processo paralelo |
| 📊 | **Indicadores do seu campus** | Tempo médio de reaproveitamento e volume por campus, que a visão nacional não mostra |

---

### 5 · A rede em números  `[UNIFAL — "em números"]`

Faixa horizontal, números grandes em Source Serif 4, alimentada pelos **KPIs
reais do Painel** — os mesmos quatro já implementados.

```
    1.284            312              47 dias           11
bens cadastrados  reaproveitados   tempo médio      universidades
                                                      na rede
```

> Enquanto o piloto não gerar volume, esta seção mostra os números da UNIFAL-MG
> com o rótulo explícito de piloto. **Números inventados destroem a credibilidade
> do produto inteiro** — se não houver dado, a seção não entra.

---

### 6 · Vitrine ao vivo  `[APPLE — demo interativa]`

O equivalente ao slider de zoom da Apple: **a vitrine real embutida na home**,
com os filtros de categoria e campus funcionando, mostrando 6 a 8 bens
publicados. O visitante entende o produto usando, não lendo.

CTA: **[Ver a vitrine completa]**

---

### 7 · Como funciona  `[APPLE — especificação visual]`

O *stepper* das 6 etapas como peça gráfica central, horizontal:

`Cadastrado → Classificado → Publicado → Interesse → Aprovado → Reaproveitado`

Abaixo, quem atua em cada etapa. Uma frase por etapa, no máximo.

CTA: [Ver o fluxo completo] → `/como-funciona`

---

### 8 · As cinco categorias  `[APPLE + base normativa]`

Os cinco selos circulares lado a lado, cada um com o critério do art. 3º em uma
linha. É a seção que **traduz a norma em algo visual** — e a peça de identidade
mais forte do produto.

---

### 9 · Circula·MG e o Doações gov.br  `[APPLE — tabela de comparação]`

A seção que enfrenta a objeção número 1. Tom: complementaridade, nunca
concorrência.

| | Doações gov.br (Seges/MGI) | Circula·MG |
|---|---|---|
| Alcance | Nacional, obrigatório | Rede das federais de MG |
| Descoberta | Busca ativa no catálogo | Notificação automática |
| Comissão de avaliação | Fora do sistema | Dentro do fluxo |
| Indicadores | Agregados nacionais | Por campus e por instituição |
| Publicação legal | **Continua obrigatória** | Camada complementar |

> **O Circula·MG não substitui o sistema nacional.** A publicação exigida pelo
> art. 20 continua sendo feita lá.

---

### 10 · Impacto  `[APPLE — ambiental / UNIFAL — valores]`

Não é rodapé de responsabilidade social: é a razão de ser do produto.

Três blocos: **economia circular** (vida útil prolongada, descarte evitado),
**economia orçamentária** (compras evitadas), **destinação social** (bens
antieconômicos e irrecuperáveis com preferência para cooperativas de catadores,
art. 13, IV).

---

### 11 · Base normativa  `[UNIFAL — credibilidade]`

Bloco sóbrio, tipografia serifada, sem imagem. Decreto nº 12.785/2025, art. 3º,
19 e 20; relação com Siads e Lei nº 14.133/2021. Link para `/base-normativa` e
para o texto oficial.

---

### 12 · Casos de reaproveitamento  `[UNIFAL — jornal / APPLE — prova]`

Três cards com histórias reais: o bem, os dois campi, o tempo, o valor evitado.
Prova social concreta. **Só entra quando houver caso real.**

---

### 13 · Para sua universidade  `[APPLE — migração do Android]`

Reduz o atrito da adesão. Passo a passo em 4 etapas, o que a instituição precisa
ter, quanto custa, quanto tempo leva.

CTA: **[Falar com a equipe]** → `/para-sua-universidade`

---

### 14 · Acesso por perfil  `[UNIFAL — acesso rápido em abas]`

Quatro colunas, uma por perfil, com os links diretos de cada um:

| Setor de Patrimônio | Comissão de Avaliação | Servidor Solicitante | Sociedade |
|---|---|---|---|
| Cadastrar bem | Fila de classificação | Buscar na vitrine | Vitrine pública |
| Meus bens | Critérios do art. 3º | Minhas regras de interesse | Indicadores |
| Painel do campus | Histórico de decisões | Meus interesses | Base normativa |

---

### 15 · Sistemas relacionados  `[UNIFAL — atalhos em ícones]`

Faixa de links externos: **Siads · Doações gov.br · SEI · Decreto 12.785/2025 ·
Portal de Compras**. Comunica que o produto conhece e respeita o ecossistema.

---

### 16 · Rodapé  `[UNIFAL]`

Quatro colunas de navegação + contato institucional real (unidade responsável,
endereço, e-mail) + **Transparência e Prestação de Contas** + **Acesso à
Informação** + **Acessibilidade** + **Política de Privacidade (LGPD)** +
créditos, incluindo a menção ao projeto de pesquisa da UNIFAL-MG.

---

## 6.7 Páginas internas

| Página | Estrutura | Referência |
|---|---|---|
| **/vitrine** | Filtros no topo (categoria, campus, status, busca) + grade de cartões + paginação. Sem hero — é ferramenta | UNIFAL |
| **/como-funciona** | Scroll narrativo: stepper detalhado → papéis → regras de classificação (árvore de decisão) → jornadas | Apple |
| **/transparencia** | Painel público: KPIs, distribuição por categoria, volume por campus, série temporal. Filtro por instituição e período | UNIFAL |
| **/para-sua-universidade** | Hero curto → requisitos → 4 passos → FAQ de objeções → formulário de contato | Apple |
| **/base-normativa** | Documento estruturado, tipografia serifada, sumário lateral fixo | UNIFAL |
| **/casos/{slug}** | Foto do bem → dados (origem, destino, categoria, tempo) → narrativa curta | Apple |
| **/ajuda** | FAQ em acordeão, agrupado por perfil | UNIFAL |

---

## 6.8 Padrões visuais

O site **herda o design system já definido** em
[§4.9](04-especificacoes.md#49-design-system) — não se cria linguagem nova.

| Elemento | Regra |
|---|---|
| Cor de fundo | `#F1F1EA` (paper); seções alternadas em `#FFFFFF` para separar sem borda |
| Primária / CTA | `#2F5D50` (forest) |
| Headlines de seção | Source Serif 4, 40–56 px |
| Corpo | Inter, 16–18 px, linha 1.6 |
| Números grandes | Source Serif 4, 56–72 px |
| Dados e códigos | IBM Plex Mono |
| Selo circular | Elemento de identidade — logo, categorias, marca-d'água de seção |
| Largura de leitura | 1080 px na aplicação; até 1200 px nas seções da home |
| Ritmo vertical | 96–128 px entre seções — o respiro é o que separa o tom Apple do tom portal |
| Movimento | Só *fade-in* discreto ao entrar na viewport. Respeitar `prefers-reduced-motion` |

---

## 6.9 Requisitos obrigatórios

Não são escolha de design. São condição para um site de universidade federal.

> **Revisão de 06/08/2026.** O Circula·MG passou a ser tratado como **sistema
> interno da UNIFAL-MG**, e não como portal público do governo. A barra do
> governo brasileiro foi **removida** do cabeçalho: ela identifica sítios
> institucionais de órgãos federais, papel que quem cumpre é o portal da
> universidade, não um sistema interno. A identificação institucional passou a
> ser feita pelo **logotipo oficial da UNIFAL-MG no cabeçalho**, em assinatura
> conjunta com a marca do produto. Os demais requisitos continuam valendo, e os
> selos de Acesso à Informação, Transparência, Acessibilidade e Privacidade
> permanecem no rodapé.

| Requisito | Origem | O que implica |
|---|---|---|
| ~~Barra do governo brasileiro~~ | — | **Removida** — ver nota acima. Substituída pelo logotipo da UNIFAL-MG no cabeçalho |
| **Acessibilidade WCAG 2.1 AA / eMAG** | Lei Brasileira de Inclusão; padrão gov | Navegação por teclado, contraste, textos alternativos, hierarquia de headings, página `/acessibilidade` |
| **Acesso à Informação** | Lei nº 12.527/2011 | Selo e link no rodapé |
| **Transparência** | Dever de publicidade | Página `/transparencia` com indicadores abertos |
| **LGPD** | Lei nº 13.709/2018 | Política de privacidade; aviso de cookies com recusa por padrão |
| **Identificação institucional** | Legitimidade | Vínculo explícito com UNIFAL-MG e com o projeto de pesquisa |
| **Responsividade** | Uso real | Servidor consulta a vitrine do celular no almoxarifado — o mobile não é secundário |

---

## 6.10 O que não copiar

| De onde | O quê | Por quê |
|---|---|---|
| UNIFAL | Carrossel rotativo no hero | Baixa leitura e dilui a mensagem única |
| UNIFAL | Menu espelhando o organograma | Navegação deve seguir a tarefa do usuário, não a estrutura interna |
| UNIFAL | Densidade de dezenas de links por tela | Obriga a caçar; nosso produto tem um propósito só |
| Apple | Superlativo publicitário | Em produto público, soa como desperdício e derruba a credibilidade |
| Apple | Animação pesada, vídeo autoplay | Custo de banda e barreira de acessibilidade |
| Apple | Números sem lastro | Todo número exibido tem de vir do banco e ser auditável |
| Ambos | Foto de banco de imagens | Foto real de almoxarifado comunica mais que *stock photo* de escritório |

---

## 6.11 Ordem de construção sugerida

| Fase | Entrega | Depende de |
|---|---|---|
| 1 | Home com seções 0–4, 7, 8, 9, 11, 16 — o essencial para explicar e ganhar credibilidade | Nada além do conteúdo |
| 2 | `/vitrine` pública e `/base-normativa` | Back-end (roadmap item 1) |
| 3 | Seção 6 (vitrine ao vivo) e seção 5 (números reais) | Back-end + dados do piloto |
| 4 | `/transparencia`, `/para-sua-universidade`, seção 14 | Painel + definição do modelo de adesão |
| 5 | `/casos` e seção 12 | Casos reais de reaproveitamento no piloto |

---

**Anterior:** [05 — Glossário e referências](05-glossario-referencias.md) · **Índice:** [README](README.md)

### Referências analisadas

- [Portal UNIFAL-MG](https://www.unifal-mg.edu.br/portal/) — referência de portal institucional público
- [Apple — iPhone 17 Pro (BR)](https://www.apple.com/br/iphone-17-pro/) — referência de página de produto
