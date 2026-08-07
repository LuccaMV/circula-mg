# 01 — Descrição do produto

## 1.1 O que é

**Circula·MG** é uma plataforma web de reaproveitamento de bens móveis para as
universidades federais de Minas Gerais. Ela permite que cada campus **publique
seus bens ociosos, recuperáveis, antieconômicos e irrecuperáveis em uma vitrine
compartilhada**, e que outras unidades da rede manifestem interesse e recebam
esses bens — substituindo o descarte e a nova compra pela circulação interna do
patrimônio já existente.

O produto é a materialização, em software, da ferramenta digital prevista no
projeto de pesquisa *"Reaproveitamento de bens públicos: pesquisa sobre gargalos
operacionais no Portal Doações gov.br e ferramenta digital de reuso"* (Augusto
Carlos Marchetti — PPG em Ciências Ambientais, UNIFAL-MG), correspondendo ao
**Apêndice A** do projeto de qualificação.

> **Slogan operacional do cabeçalho:** `Circula·MG — REDE DE REAPROVEITAMENTO —
> UNIVERSIDADES FEDERAIS DE MG`

---

## 1.2 O problema

A administração pública federal já dispõe de um canal nacional para desfazimento
de bens: o **Portal Doações gov.br** (antigo Reuse), operado pela Seges/MGI. Ele
resolve a publicidade, mas deixa três lacunas operacionais que o projeto de
pesquisa identificou como gargalos:

| # | Gargalo | Consequência prática |
|---|---|---|
| 1 | **Modelo puramente "pull"** — quem precisa de um bem tem de descobrir sozinho que ele existe, buscando ativamente no catálogo nacional | Bens ficam publicados sem encontrar destinatário; o interessado natural nunca é avisado |
| 2 | **Processo desacoplado da comissão de avaliação** — o sistema publica, mas o rito de classificação continua correndo em paralelo, no papel ou em processo SEI | Retrabalho, prazo longo entre a decisão da comissão e a publicação efetiva |
| 3 | **Ausência de indicadores locais** — não há visão de desempenho por campus ou por instituição | A gestão não sabe quanto tempo um bem leva para circular, nem qual campus concentra ociosidade |

A esses gargalos somam-se dificuldades já documentadas em auditoria sobre os
sistemas de doação federais, como a **dificuldade de integração entre sistemas**.

O resultado é o cenário que o produto ataca: **armários, cadeiras, projetores e
computadores em condições de uso parados em almoxarifados**, enquanto setores da
mesma instituição — às vezes do mesmo campus — abrem processo de compra para
adquirir item equivalente.

---

## 1.3 Contexto normativo

Em **19 de dezembro de 2025** foi publicado o **Decreto nº 12.785/2025**, que
dispõe sobre mecanismos de promoção da **circularidade de bens móveis** na
administração pública federal direta, autárquica e fundacional. Ele **revogou os
Decretos nº 9.373/2018 e nº 10.340/2020** e mudou o marco de referência do
desfazimento de bens.

O que o decreto passou a exigir e que o Circula·MG incorpora como regra de
produto:

### a) Classificação obrigatória em 5 categorias (art. 3º)

| Categoria | Definição normativa | Cor no produto |
|---|---|---|
| **Uso regular** | Bem em condições de uso, cuja manutenção e utilização sejam vantajosas e que esteja sendo aproveitado pelo órgão | `#5C7A99` |
| **Ocioso** | Bem em condições de uso, com manutenção vantajosa, **mas que não está sendo aproveitado** pelo órgão detentor | `#C6862B` |
| **Recuperável** | Bem não está em condições de uso e o **custo de recuperação é de até 50%** do valor de mercado (ou é justificável) | `#3E8E7E` |
| **Antieconômico** | Bem em condições de uso, mas cuja manutenção/conservação/utilização **gera custo superior ao valor ou à utilidade** | `#A8623F` |
| **Irrecuperável** | Bem que não pode ser utilizado e cujo **custo de recuperação supera 50%** do valor de mercado | `#7A4438` |

Essa taxonomia é a espinha dorsal do produto: ela organiza o cadastro, os
filtros da vitrine, o gráfico do painel e as regras de notificação.

### b) Comissão de avaliação formal (art. 19)

A classificação não é atribuição livre do setor de patrimônio: deve ser
atribuída por **comissão instituída pela autoridade competente, com no mínimo
três membros** — servidores efetivos ou profissionais com conhecimento técnico
certificado, na forma da Lei nº 14.133/2021. No Circula·MG, a comissão é um
**perfil de usuário com etapa própria no fluxo**, não uma formalidade externa ao
sistema.

### c) Divulgação em sistema informatizado nacional (art. 20)

A divulgação dos bens se dá por sistema gerenciado pela **Secretaria de Gestão e
Inovação (Seges/MGI)**. O decreto prevê expressamente que, enquanto o sistema
evolui, os procedimentos podem correr em processo administrativo.

### d) Doação com ordem de preferência (arts. 11 e 13)

A doação para fins de interesse social pode ter como destinatários Estados e
Municípios, organizações da sociedade civil, organizações sociais, OSCIPs,
fundações e empreendimentos de economia solidária — com **preferência para
cooperativas de catadores de materiais recicláveis nos casos de bens
antieconômicos ou irrecuperáveis**.

Some-se a isso o **Siads** (Sistema Integrado de Gestão Patrimonial),
obrigatório para gerenciamento e controle do patrimônio da administração pública
federal direta, autárquica e fundacional — e, portanto, a fonte de verdade
patrimonial com a qual o Circula·MG precisa conversar.

---

## 1.4 Posicionamento

> **O Circula·MG não compete com o sistema nacional da Seges/MGI.**

Ele é uma **camada complementar, de escala local/estadual**, para a rede de
universidades federais de Minas Gerais, cobrindo três frentes que uma solução
nacional genérica dificilmente endereça no curto prazo:

1. **Notificação automática de interessados** por categoria de bem e campus —
   transforma o modelo de *pull* (buscar) em *push* (ser avisado);
2. **Fluxo de aprovação já vinculado à comissão de avaliação** exigida pelo
   decreto, sem retrabalho de processo;
3. **Indicadores locais de desempenho** — tempo médio de reaproveitamento e
   volume por campus.

```
┌──────────────────────────────────────────────────────────────┐
│  NACIONAL — Doações gov.br / Siads (Seges/MGI)               │
│  Publicidade legal, alcance nacional, obrigatoriedade         │
└───────────────────────────▲──────────────────────────────────┘
                            │  interoperabilidade (roadmap)
┌───────────────────────────┴──────────────────────────────────┐
│  LOCAL/ESTADUAL — Circula·MG                                 │
│  Notificação ativa · Workflow da comissão · Indicadores       │
│  Rede: 11 universidades federais de MG                       │
└──────────────────────────────────────────────────────────────┘
```

**O que o Circula·MG não é:**

- não substitui o Siads como sistema de registro patrimonial;
- não substitui a publicação obrigatória no sistema nacional;
- não é um marketplace com transação financeira;
- não emite documentos oficiais de baixa patrimonial.

---

## 1.5 Público-alvo

**Universo:** as **11 universidades federais de Minas Gerais**.

**Piloto institucional:** **UNIFAL-MG** — identificada no cabeçalho do protótipo
como `UNIFAL-MG · Piloto institucional`.

### Perfis de usuário

| Perfil | Quem é | O que faz no produto |
|---|---|---|
| **Setor de Patrimônio** | Servidores responsáveis pela gestão patrimonial do campus | Cadastra bens, acompanha o fluxo, opera o painel |
| **Comissão de Avaliação** | Colegiado de no mínimo 3 membros (art. 19) | Confirma ou altera a classificação proposta e libera a publicação |
| **Servidor Solicitante** | Qualquer servidor ou unidade com demanda por bens | Consulta a vitrine, recebe notificações, manifesta interesse |
| **Consulta Pública** | Sociedade, órgãos de controle, cooperativas | Visualiza a vitrine e os indicadores em modo leitura |

> Os quatro perfis estão definidos no roadmap do projeto (item 1 — Autenticação
> institucional). **Ainda não existem no protótipo**, que opera em sessão única
> sem autenticação.

---

## 1.6 Escopo

### Implementado no protótipo

Quatro módulos navegáveis por abas, com dados simulados em memória:

- **Vitrine** — catálogo de bens publicados, com busca textual e filtros por
  categoria e por campus;
- **Cadastrar bem** — formulário com seletor visual das 5 categorias
  normativas;
- **Painel** — 4 KPIs, gráfico de distribuição por categoria (donut) e de bens
  por campus (barras);
- **Notificações** — lista simulada de avisos automáticos por categoria + campus
  + setor compatível;
- **Detalhe do bem** (modal) — *stepper* de 6 etapas do fluxo e botão de
  manifestação de interesse.

### Fora do escopo do protótipo (roadmap do piloto)

Autenticação institucional, back-end e persistência, workflow de aprovação real
com auditoria, upload de imagens, camada de interoperabilidade com Siads e
Doações gov.br, e testes de usabilidade com servidores.

Detalhamento completo em [04 — Especificações §4.11](04-especificacoes.md#411-roadmap--do-protótipo-ao-piloto).

---

## 1.7 Identidade

A linguagem visual é deliberadamente **documental**, não *startup*: fundo cor de
papel (`#F1F1EA`), tipografia serifada nos títulos (**Source Serif 4**,
remetendo ao texto de decreto), monoespaçada nos números de patrimônio (**IBM
Plex Mono**, como um carimbo de tombamento) e um **selo circular tracejado** em
cada bem, representando a classificação atribuída pela comissão de avaliação.

A cor primária é o verde-floresta `#2F5D50` (circularidade/sustentabilidade),
com azul institucional `#2B4570` como referência federal.

Tokens completos em [04 — Especificações §4.9](04-especificacoes.md#49-design-system).

---

**Próximo:** [02 — Benefícios](02-beneficios.md)
