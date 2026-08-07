# 03 — Como funciona

## 3.1 Visão geral

O Circula·MG organiza o reaproveitamento em torno de **um objeto central — o bem
móvel — que percorre um fluxo de seis etapas**, do cadastro pelo setor de
patrimônio até o reaproveitamento efetivo por outra unidade da rede. Em volta
desse fluxo há quatro módulos: um para **publicar** (Cadastrar bem), um para
**descobrir** (Vitrine), um para **ser avisado** (Notificações) e um para
**medir** (Painel).

```
   SETOR DE                COMISSÃO DE              SERVIDOR
   PATRIMÔNIO              AVALIAÇÃO                SOLICITANTE
       │                       │                        │
       │  cadastra o bem       │                        │
       ├──────────────────────►│                        │
       │                       │  confirma a            │
       │                       │  classificação         │
       │                       ├───────────► VITRINE    │
       │                       │                │       │
       │                       │                ├──────►│  notificação
       │                       │                │       │  automática
       │                       │                │       │
       │                       │                │◄──────┤  manifesta
       │                       │                │       │  interesse
       │                       │  aprova a      │       │
       │◄──────────────────────┤  transferência │       │
       │                       │                        │
       │  registra o reaproveitamento                   │
       └───────────────────────────────────────────────►│
```

---

## 3.2 Ciclo de vida do bem

O fluxo tem **seis etapas**, exibidas como *stepper* no detalhe de cada bem.
Elas estão implementadas no protótipo como o campo `step` (1 a 6).

| # | Etapa | Quem atua | O que acontece | Artefato |
|---|---|---|---|---|
| 1 | **Cadastrado** | Setor de Patrimônio | O bem é registrado com nome, campus, setor, descrição, estado de conservação e uma **classificação proposta** | Registro do bem |
| 2 | **Classificado** | Comissão de Avaliação | A comissão confirma ou altera a classificação nas 5 categorias do art. 3º do Decreto nº 12.785/2025 | Decisão da comissão |
| 3 | **Publicado** | Sistema | O bem entra na vitrine com status `Disponível` e dispara as notificações compatíveis | Publicação + notificações |
| 4 | **Interesse** | Servidor Solicitante | Uma unidade manifesta interesse; o bem passa a `Reservado` | Manifestação de interesse |
| 5 | **Aprovado** | Comissão / autoridade competente | A transferência é autorizada | Autorização |
| 6 | **Reaproveitado** | Setor de Patrimônio (origem e destino) | O bem é entregue e o ciclo se encerra; status vira `Transferido` | Termo de transferência |

> **Nota de implementação:** no protótipo, o `step` é um valor fixo por registro
> nos dados simulados; não há transição automática entre etapas. A máquina de
> estados descrita acima é a especificação a implementar no piloto.

### Estados do bem

Paralelamente ao *stepper*, cada bem carrega um **status** — o que aparece como
selo na vitrine:

| Status | Rótulo | Cor | Significado | Etapas correspondentes |
|---|---|---|---|---|
| `disponivel` | Disponível | `#3E8E7E` | Publicado e sem reserva | 3 |
| `reservado` | Reservado | `#C6862B` | Há manifestação de interesse em curso | 4–5 |
| `transferido` | Transferido | `#5C7A99` | Ciclo concluído | 6 |

---

## 3.3 Regras de classificação

A classificação é a decisão mais importante do fluxo, porque determina o destino
possível do bem. Os critérios são os do **art. 3º do Decreto nº 12.785/2025**:

```
O bem está em condições de uso?
│
├── SIM ──► A manutenção/utilização é vantajosa?
│           │
│           ├── SIM ──► Está sendo aproveitado pelo órgão?
│           │            ├── SIM ──► USO REGULAR
│           │            └── NÃO ──► OCIOSO          ◄── circula na rede
│           │
│           └── NÃO ──► custo de manutenção supera
│                       o valor/utilidade do bem
│                       └──────────────► ANTIECONÔMICO ◄── preferência:
│                                                          cooperativas
└── NÃO ──► Custo de recuperação ≤ 50% do valor de mercado?
             ├── SIM ──► RECUPERÁVEL                  ◄── circula na rede
             └── NÃO ──► IRRECUPERÁVEL                ◄── preferência:
                                                          cooperativas
```

**Consequência prática por categoria:**

| Categoria | Destino típico |
|---|---|
| Uso regular | Permanece na unidade; publicado apenas para visibilidade de inventário |
| **Ocioso** | Núcleo do produto — transferência direta para outra unidade da rede |
| **Recuperável** | Transferência para unidade disposta a arcar com a recuperação |
| **Antieconômico** | Doação, com preferência para cooperativas de catadores (art. 13, IV) |
| **Irrecuperável** | Doação, com preferência para cooperativas de catadores (art. 13, IV) |

---

## 3.4 Os módulos

### Vitrine

O catálogo dos bens publicados. É a tela de entrada do produto.

**Controles disponíveis:**

- **Busca textual** por nome do bem, número de patrimônio ou setor (substring,
  sem diferenciação de maiúsculas);
- **Filtro por categoria** — as 5 do decreto, mais "Todas as categorias";
- **Filtro por campus** — mais "Todos os campi";
- **Filtro por status** — mais "Todos os status";
- **Filtros de tipo** — etiquetas clicáveis com a contagem de bens em cada uma.

As quatro primeiras dimensões são **combinadas por E lógico**. Os filtros de tipo
combinam **por OU entre si** (o bem aparece se tiver ao menos um dos marcados) e
por E com as demais. O total filtrado é exibido acima da grade, junto da
combinação ativa — `5 bens publicados na vitrine · Mobiliário ou Armazenamento`.

No site, a seleção fica na URL
(`/vitrine?filtros=mobiliario,informatica&campus=Alfenas`), o que torna qualquer
busca filtrada um link que um servidor pode mandar para o colega.

**Cada card mostra:** número de patrimônio (em monoespaçada, como um carimbo de
tombamento), nome do bem, o **selo circular** da categoria, os selos de
categoria e status, campus · setor, e há quantos dias foi publicado.

Clicar em qualquer card abre o detalhe.

### Detalhe do bem (modal)

Abre sobre a vitrine e reúne, num só lugar:

- identificação (número de patrimônio e nome);
- selos de categoria e status;
- localização (campus — setor);
- o texto de referência normativa, que explicita que a classificação foi
  atribuída pela comissão de avaliação local conforme o art. 3º do decreto;
- o **stepper das 6 etapas**, com as concluídas marcadas;
- o botão **"Manifestar interesse neste bem"**.

Ao manifestar interesse, o sistema confirma: *"Interesse registrado em «X». A
unidade solicitante será notificada."*

### Cadastrar bem

Formulário de entrada do bem na rede, usado pelo Setor de Patrimônio.

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome do bem | texto livre | **Sim** — o envio é bloqueado sem ele |
| Campus | seleção entre os campi da rede | Sim (valor padrão pré-selecionado) |
| Setor / unidade | texto livre | Não — vira `—` se vazio |
| Classificação proposta | seleção visual entre as 5 categorias | Sim (padrão: `Ocioso`) |
| **Filtros do bem** | seleção **múltipla** entre os 10 filtros de tipo | **Sim — ao menos um** |
| Descrição e estado de conservação | texto longo | Não |

> **Por que os filtros são obrigatórios.** A categoria do art. 3º diz o que pode
> acontecer com o bem, mas não o que ele é. Quem procura na vitrine procura por
> tipo — "algo de informática", "uma mesa" —, e não por categoria normativa. Um
> bem sem filtro entra na vitrine praticamente invisível. Por isso o cadastro
> exige ao menos um, e a mensagem de erro diz exatamente isso: *"Selecione ao
> menos um filtro para o bem ser encontrado na vitrine."*
>
> A atribuição é múltipla porque um bem pertence a mais de um tipo ao mesmo
> tempo: um armário de aço é *Mobiliário* **e** *Armazenamento*. Taxonomia
> completa em [04 §4.4](04-especificacoes.md#44-enumerações-normativas).

O formulário deixa explícito, antes dos campos, que **"o cadastro segue para a
comissão de avaliação do campus"** — reforçando que a classificação informada é
uma *proposta*, não uma decisão. O botão de envio é rotulado
**"Enviar à comissão de avaliação"**.

> **Nota de implementação:** no protótipo, o bem enviado entra imediatamente na
> vitrine com status `disponivel` e `step: 1`, sem passar por fila de aprovação.
> A confirmação exibida ao usuário já descreve o comportamento correto — a
> retenção até a decisão da comissão é o que falta implementar.

### Notificações

O módulo que materializa o diferencial de *push*. Cada notificação informa:

> Novo bem **{nome}** classificado como **{categoria}** em **{campus}** —
> compatível com **{setor}** · {tempo relativo}

**Regra de segmentação (especificação):** a notificação é enviada a servidores e
unidades **pré-cadastradas com interesse declarado** naquela combinação de
**categoria × campus**, sem depender de busca manual no catálogo. O campo
"compatível com {setor}" indica qual regra de interesse foi acionada.

> **Nota de implementação:** a lista do protótipo é estática e ilustrativa. O
> cadastro de regras de interesse e o disparo real não existem ainda.

### Painel

A camada de gestão. Divide-se em duas faixas:

**Faixa de KPIs (4 indicadores):** bens cadastrados (com o subtítulo "rede de 4
campi"), disponíveis na vitrine, reaproveitados ("ciclo concluído") e tempo
médio em dias ("publicação → interesse").

**Faixa de gráficos (2 visualizações):**

- **Distribuição por categoria** — donut com as 5 categorias do art. 3º, nas
  cores normativas, legendado abaixo; categorias sem nenhum bem são omitidas;
- **Bens publicados por campus** — barras verticais, rotulado no próprio produto
  como *"indicador local — diferencial frente ao sistema nacional"*.

Todos os números são calculados em tempo real sobre a base corrente, incluindo
bens recém-cadastrados na sessão.

---

## 3.5 Papéis e permissões

Matriz proposta para o piloto. **Nenhuma permissão está implementada no
protótipo** — hoje qualquer visitante acessa todos os módulos.

| Ação | Patrimônio | Comissão | Solicitante | Consulta Pública |
|---|:---:|:---:|:---:|:---:|
| Ver a vitrine | ✓ | ✓ | ✓ | ✓ |
| Ver detalhe do bem | ✓ | ✓ | ✓ | ✓ |
| Cadastrar bem | ✓ | — | — | — |
| Editar bem antes da classificação | ✓ | — | — | — |
| Confirmar/alterar classificação | — | ✓ | — | — |
| Publicar na vitrine | — | ✓ | — | — |
| Manifestar interesse | ✓ | — | ✓ | — |
| Aprovar transferência | — | ✓ | — | — |
| Registrar reaproveitamento | ✓ | — | — | — |
| Configurar regras de notificação | ✓ | — | ✓ (as suas) | — |
| Ver painel do próprio campus | ✓ | ✓ | ✓ | ✓ |
| Ver painel consolidado da rede | ✓ | ✓ | — | ✓ |
| Ver trilha de auditoria | ✓ | ✓ | — | — |

---

## 3.6 Jornadas de uso

### Jornada A — Desfazimento de um armário ocioso

1. A Secretaria Acadêmica do campus de Poços de Caldas devolve ao Almoxarifado
   Central um armário de aço que não usa mais.
2. O **Setor de Patrimônio** abre *Cadastrar bem*, informa nome, campus, setor,
   marca a classificação proposta como **Ocioso** e descreve o estado de
   conservação. Envia à comissão.
3. A **Comissão de Avaliação** recebe o item na fila, confirma que o bem está em
   condições de uso mas não está sendo aproveitado — a classificação **Ocioso**
   se mantém — e libera a publicação.
4. O bem entra na **Vitrine** com status `Disponível`. No mesmo instante, o
   sistema dispara **notificação** a todas as unidades que declararam interesse
   em bens *Ociosos* em *Poços de Caldas*.
5. A Coordenação de Curso do campus de Varginha recebe o aviso, abre o detalhe e
   clica em **Manifestar interesse**. O bem passa a `Reservado`.
6. A transferência é **aprovada** e o bem é entregue. O Patrimônio registra o
   reaproveitamento: status `Transferido`, *stepper* completo.
7. O **Painel** incorpora o ciclo: +1 em *Reaproveitados* e recálculo do *tempo
   médio*.

### Jornada B — Servidor que precisa de um projetor

1. O Núcleo de Tecnologia precisa de um projetor e não tem orçamento para
   compra.
2. O servidor cadastra uma **regra de interesse**: categoria *Recuperável* +
   campus *Alfenas*.
3. Semanas depois, um projetor multimídia é publicado em Alfenas como
   *Recuperável*. O servidor recebe a notificação — sem nunca ter consultado a
   vitrine.
4. Ele abre o bem, lê o estado de conservação, avalia que o custo de recuperação
   compensa e manifesta interesse.
5. O que seria um processo de aquisição de meses vira uma transferência interna.

### Jornada C — Bem antieconômico destinado a cooperativa

1. Um ar-condicionado split é classificado pela comissão como
   **Antieconômico**: funciona, mas o custo de manutenção supera sua utilidade.
2. Ele é publicado na vitrine e fica filtrável por essa categoria.
3. Não havendo interesse de unidades da rede, aciona-se a destinação
   preferencial do **art. 13, IV** do decreto: doação a cooperativas de
   catadores de materiais recicláveis.
4. O Circula·MG serve como o registro de que a oferta interna foi feita e não
   encontrou destinatário — evidência do rito para os órgãos de controle.

---

## 3.7 Interoperabilidade

O Circula·MG opera **ao lado**, não no lugar, dos sistemas oficiais:

| Sistema | Papel | Relação prevista |
|---|---|---|
| **Siads** | Fonte de verdade patrimonial obrigatória da APF | Importar dados do bem pelo número de patrimônio; evitar dupla digitação |
| **Doações gov.br** (Seges/MGI) | Publicidade nacional obrigatória (art. 20) | Publicar/espelhar itens que exijam divulgação nacional |
| **SSO institucional / CAFe** | Identidade dos servidores | Autenticação e derivação de perfil e campus |

> Toda essa camada é **roadmap** (item 5). O protótipo não tem integração
> nenhuma.

---

**Anterior:** [02 — Benefícios](02-beneficios.md) · **Próximo:** [04 — Especificações](04-especificacoes.md)
