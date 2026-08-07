# 07 — Conteúdo do site

*Copy deck* — texto pronto para implementação, seguindo a arquitetura definida em
[06 — Estrutura do site](06-estrutura-do-site.md).

**Como ler este documento**

- Texto entre aspas ou em bloco é **copy final**, pronto para o HTML.
- `{{variavel}}` é **dado vindo do banco** — nunca digitar o número no código.
- 🎬 marca **descrição de mídia** (formato, conteúdo, tratamento, alt).
- ⚠️ marca **condição de publicação** — a seção não vai ao ar sem isso.

---

## 7.1 Tom de voz

O Circula·MG fala como **servidor público competente explicando o próprio
trabalho**: direto, preciso, sem vender. A credibilidade vem da exatidão, não da
adjetivação.

| Princípio | Sim | Não |
|---|---|---|
| **Concreto acima de abstrato** | "Um armário parado há oito meses" | "Otimização da gestão patrimonial" |
| **Número com lastro** | "{{n}} bens reaproveitados desde {{data}}" | "Centenas de bens reaproveitados" |
| **Verbo na voz ativa** | "A comissão confirma a classificação" | "A classificação é confirmada" |
| **Norma citada, não invocada** | "art. 3º do Decreto nº 12.785/2025" | "conforme a legislação vigente" |
| **Honestidade sobre limites** | "Não substitui o Siads" | silêncio sobre a sobreposição |

**Palavras banidas:** revolucionário, inovador, disruptivo, solução completa,
plataforma inteligente, ecossistema digital, transformação digital.

**Vocabulário obrigatório** (termos do decreto, sempre nesta forma): *bem móvel*,
*classificação*, *comissão de avaliação*, *manifestação de interesse*,
*reaproveitamento*, *circularidade*, *desfazimento*.

**Pessoa:** o site fala com a instituição em 3ª pessoa e com o servidor em 2ª
("você declara", "você é avisado"). Nunca "nós oferecemos".

---

## 7.2 Home — conteúdo seção a seção

### Seção 0 · Barra institucional

Barra padrão do governo brasileiro. Sem copy própria.

---

### Seção 1 · Cabeçalho

**Marca:**

> **Circula·MG**
> REDE DE REAPROVEITAMENTO — UNIVERSIDADES FEDERAIS DE MG

*(mantém o texto exato já usado no cabeçalho da aplicação)*

**Menu:** `Vitrine` · `Como funciona` · `Transparência` · `Para sua universidade`

**Botão destacado:** `Entrar`

🎬 **Logo** — selo circular do produto: círculo de 34 px, borda `2px #2F5D50`,
ícone de carimbo centralizado, rotação −8°. Já implementado no protótipo.
`alt="Circula·MG"`

---

### Seção 2 · Hero

**Headline:**

> # O que sobra em um campus falta no outro.

**Subheadline:**

> Rede de reaproveitamento de bens móveis das universidades federais de Minas
> Gerais. Um bem ocioso em Alfenas pode ser exatamente o que Varginha precisa —
> e agora os dois ficam sabendo.

**Botões:**

| Prioridade | Rótulo | Destino |
|---|---|---|
| Primário | `Ver a vitrine` | `/vitrine` |
| Secundário | `Como funciona` | `#como-funciona` (âncora) |

**Rodapé do hero (linha de credencial, corpo 13 px):**

> Alinhado ao Decreto nº 12.785/2025 · Piloto institucional na UNIFAL-MG

🎬 **Mídia principal** — duas opções, em ordem de preferência:

1. **Fotografia real** de um almoxarifado universitário com bens armazenados —
   armários, cadeiras empilhadas, caixas. Tratamento: luz natural, sem
   saturação, leve sobreposição do tom `paper #F1F1EA` a 20% para o texto
   respirar. Proporção 16:9, largura mínima 2000 px.
   `alt="Bens móveis armazenados em almoxarifado universitário"`
2. **Composição gráfica** dos cinco selos circulares das categorias em grade
   irregular, cores normativas sobre fundo `paper`, rotações entre −12° e +8°.
   `alt="Os cinco selos de classificação de bens do Decreto 12.785/2025"`

⚠️ **Sem carrossel. Sem vídeo com reprodução automática.**

---

### Seção 3 · O problema

**Antetítulo:** `O PROBLEMA`

**Headline:**

> ## Ninguém sabe o que o outro tem.

**Corpo** — três frases isoladas, muito espaço entre elas:

> Um armário de aço em condições de uso, parado há oito meses no almoxarifado de
> Alfenas.
>
> Um processo de compra aberto em Varginha para adquirir um armário de aço.
>
> Nenhum dos dois setores sabe da existência do outro.

**Fechamento:**

> O catálogo nacional existe e funciona. Mas depende de alguém suspeitar que o
> bem está lá e ir procurar — e é aí que a circulação para.

🎬 **Mídia** — nenhuma, ou ilustração mínima em linha: dois prédios com uma seta
tracejada e interrompida entre eles, traço 1,5 px na cor `line #DBD8CB`.
O vazio da seção é o recurso narrativo.

---

### Seção 4 · Os três diferenciais

**Antetítulo:** `O QUE MUDA`

**Headline:**

> ## Três coisas que a busca manual não resolve.

**Cards:**

| | Headline | Corpo |
|---|---|---|
| 🔔 | **Você é avisado** | Declare uma vez a categoria e o campus que interessam ao seu setor. Quando um bem compatível for publicado, o aviso chega até você — sem depender de consultar catálogo. |
| ✅ | **A comissão dentro do fluxo** | A classificação exigida pelo art. 19 acontece dentro do sistema, com justificativa registrada. O rito deixa de correr em paralelo ao processo. |
| 📊 | **Indicadores do seu campus** | Quanto tempo um bem leva para circular e onde a ociosidade está concentrada — recortes que a visão nacional agregada não entrega. |

🎬 **Ícones** — traço `lucide-react`, 24 px, `strokeWidth 1.6`, cor
`forest #2F5D50`. Sem preenchimento, sem fundo colorido. Ícones sugeridos:
`Bell`, `CheckCircle2`, `BarChart3` — os mesmos já usados na navegação da
aplicação, o que dá continuidade visual entre site e produto.

---

### Seção 5 · A rede em números

**Antetítulo:** `A REDE HOJE`

**Headline:**

> ## Números da rede

**Indicadores** — quatro, nesta ordem:

| Valor | Rótulo | Nota |
|---|---|---|
| `{{bens_cadastrados}}` | bens cadastrados | |
| `{{bens_reaproveitados}}` | reaproveitados | ciclo concluído |
| `{{tempo_medio_dias}} dias` | tempo médio | publicação → manifestação de interesse |
| `{{campi_ativos}}` | campi na rede | |

**Nota de rodapé da seção (11,5 px, cor `text-faint`):**

> Dados apurados em {{data_apuracao}}. Período: {{periodo}}.
> [Ver todos os indicadores →](/transparencia)

⚠️ **Condição de publicação:** os quatro valores vêm dos KPIs reais do Painel.
Enquanto o piloto não gerar volume, a seção exibe os números da UNIFAL-MG com o
rótulo `Piloto institucional — UNIFAL-MG` acima do bloco. **Se não houver dado, a
seção não entra no ar.** Número ilustrativo em site de universidade federal
derruba a credibilidade de tudo o que está em volta.

🎬 **Tratamento** — sem imagem. Os números *são* a mídia: Source Serif 4, 56–72 px,
cor `ink #17211C`, sobre fundo branco, separados por linha vertical `1px #ECE9DE`.

---

### Seção 6 · Vitrine ao vivo

**Antetítulo:** `VEJA FUNCIONANDO`

**Headline:**

> ## A vitrine, agora, com bens reais.

**Corpo:**

> Filtre por categoria e por campus. É a mesma vitrine que os setores de
> patrimônio usam todos os dias.

**Botão:** `Ver a vitrine completa` → `/vitrine`

🎬 **Mídia — componente funcional, não imagem.** Instância real do módulo
`Vitrine` com:

- os dois seletores ativos (categoria e campus) e a busca desabilitada;
- 6 a 8 cartões de bens publicados, ordenados pelos mais recentes;
- cartões com o mesmo desenho do produto: número de patrimônio em IBM Plex Mono,
  nome em Source Serif 4, selo circular da categoria, selos de categoria e
  status, campus · setor;
- clique no cartão leva a `/vitrine/{id}`, não abre modal.

**Estado vazio** (se não houver bem publicado):

> Nenhum bem publicado no momento. A vitrine é alimentada pelos setores de
> patrimônio da rede.

---

### Seção 7 · Como funciona

**Antetítulo:** `O FLUXO`

**Headline:**

> ## Do almoxarifado à sala que precisa dele.

**Corpo:**

> Todo bem percorre seis etapas. Cada uma tem um responsável definido, e o
> estado do bem é visível a qualquer momento.

**Etapas** — uma frase por etapa, exatamente estes rótulos:

| # | Etapa | Frase | Quem |
|---|---|---|---|
| 1 | **Cadastrado** | O setor de patrimônio registra o bem e propõe uma classificação. | Setor de Patrimônio |
| 2 | **Classificado** | A comissão confirma ou altera a classificação, com justificativa. | Comissão de Avaliação |
| 3 | **Publicado** | O bem entra na vitrine e os interessados são avisados. | Sistema |
| 4 | **Interesse** | Uma unidade manifesta interesse e o bem fica reservado. | Servidor Solicitante |
| 5 | **Aprovado** | A transferência é autorizada. | Comissão / autoridade |
| 6 | **Reaproveitado** | O bem é entregue e volta a ser usado. | Setor de Patrimônio |

**Botão:** `Ver o fluxo completo` → `/como-funciona`

🎬 **Mídia** — o componente `Stepper` já implementado, em versão horizontal
ampliada: seis círculos de 26 px ligados por linha de 2 px, todos no estado
concluído (`#2F5D50`), rótulo abaixo de cada um. Em telas abaixo de 768 px, gira
para vertical. Elemento gráfico próprio, sem imagem de apoio.
`alt="Fluxo do bem em seis etapas: cadastrado, classificado, publicado, interesse, aprovado, reaproveitado"`

---

### Seção 8 · As cinco categorias

**Antetítulo:** `ART. 3º DO DECRETO Nº 12.785/2025`

**Headline:**

> ## Cinco categorias. Cada bem em uma delas.

**Corpo:**

> A classificação não é etiqueta: ela define o que pode acontecer com o bem.
> Quem atribui é a comissão de avaliação do campus.

**Os cinco blocos** — selo circular + rótulo + critério:

| Selo | Categoria | Critério |
|---|---|---|
| ⬤ `#5C7A99` | **Uso regular** | Em condições de uso, manutenção vantajosa e efetivamente aproveitado pela unidade. |
| ⬤ `#C6862B` | **Ocioso** | Em condições de uso, manutenção vantajosa, mas **sem aproveitamento** pela unidade que o detém. |
| ⬤ `#3E8E7E` | **Recuperável** | Fora de condições de uso, com custo de recuperação de até 50% do valor de mercado. |
| ⬤ `#A8623F` | **Antieconômico** | Em condições de uso, mas cuja manutenção custa mais do que o bem vale. |
| ⬤ `#7A4438` | **Irrecuperável** | Não pode ser utilizado e a recuperação custa mais de 50% do valor de mercado. |

**Nota de fechamento:**

> Bens antieconômicos e irrecuperáveis têm destinação preferencial a
> cooperativas de catadores de materiais recicláveis, conforme o art. 13, IV.

🎬 **Mídia** — os cinco selos circulares (componente `Stamp_`, 58 px) lado a
lado, cada um na cor da sua categoria, com rotação de −8°. É a peça de identidade
mais forte do produto e não deve ser substituída por ícones genéricos.

---

### Seção 9 · Circula·MG e o Doações gov.br

**Antetítulo:** `A PERGUNTA MAIS FREQUENTE`

**Headline:**

> ## Isso não é o que o Doações gov.br já faz?

**Corpo:**

> Não. O sistema nacional resolve a publicidade legal, com alcance que nenhuma
> rede estadual alcança. O Circula·MG opera na camada que sobra: descoberta
> ativa, rito da comissão e indicadores por campus.

**Tabela:**

| | Doações gov.br (Seges/MGI) | Circula·MG |
|---|---|---|
| **Alcance** | Nacional, obrigatório | Universidades federais de MG |
| **Descoberta** | Busca ativa no catálogo | Notificação por interesse declarado |
| **Comissão de avaliação** | Fora do sistema | Etapa do próprio fluxo |
| **Indicadores** | Agregados nacionais | Por campus e por instituição |
| **Publicação legal** | Continua obrigatória | Camada complementar |

**Fechamento em destaque:**

> **O Circula·MG não substitui o sistema nacional.** A divulgação prevista no
> art. 20 continua sendo feita lá — e o Siads continua sendo o sistema de
> registro patrimonial da instituição.

🎬 **Mídia** — nenhuma. Tabela em tipografia, com a coluna do Circula·MG marcada
por fundo `#2F5D50` a 6% de opacidade. Ilustração aqui enfraqueceria o tom de
resposta técnica.

---

### Seção 10 · Impacto

**Antetítulo:** `POR QUE ISSO IMPORTA`

**Headline:**

> ## Reaproveitar é mais barato que comprar — e que descartar.

**Três blocos:**

**1. Economia circular**

> Cada bem que volta a ser usado é um bem que não vira resíduo e uma compra que
> não precisa acontecer. É o que o Decreto nº 12.785/2025 chama de
> circularidade, e é o objetivo declarado da norma.

**2. Orçamento**

> Um armário transferido entre campi resolve em dias o que um processo de
> aquisição resolveria em meses — quando há orçamento para isso.

**3. Destinação social**

> Bens antieconômicos e irrecuperáveis que não encontram destino na rede seguem
> para cooperativas de catadores de materiais recicláveis, com a preferência que
> o art. 13, IV estabelece.

🎬 **Mídia** — três ícones de traço (`Recycle`, `Wallet`/`TrendingDown`, `Users`),
24 px, cor `forest`. Se houver dado apurado, cada bloco recebe um número:
`{{residuo_evitado_kg}}`, `{{valor_compras_evitadas}}`, `{{bens_destinados_cooperativas}}`.
⚠️ Mesma regra da Seção 5: sem dado, sem número.

---

### Seção 11 · Base normativa

**Antetítulo:** `FUNDAMENTO`

**Headline:**

> ## O que a norma exige, o sistema faz.

**Corpo:**

> O **Decreto nº 12.785/2025**, publicado em 19 de dezembro de 2025, instituiu o
> marco de circularidade de bens móveis na administração pública federal e
> revogou os Decretos nº 9.373/2018 e nº 10.340/2020. O Circula·MG foi desenhado
> a partir dele.

**Lista de dispositivos:**

| Dispositivo | O que exige | Onde aparece no sistema |
|---|---|---|
| **Art. 3º** | Classificação em cinco categorias | Cadastro, filtros da vitrine e painel |
| **Art. 19** | Comissão de avaliação com no mínimo três membros | Etapa 2 do fluxo, com justificativa registrada |
| **Art. 20** | Divulgação em sistema gerenciado pela Seges/MGI | Camada de interoperabilidade |
| **Arts. 11 e 13** | Doação e ordem de preferência | Identificação das categorias com destinação preferencial |

**Botão:** `Ler a base normativa completa` → `/base-normativa`
**Link secundário:** `Texto oficial do decreto ↗`

🎬 **Mídia** — nenhuma. Bloco sóbrio, fundo branco, tipografia serifada,
tratamento de documento. A ausência de imagem é o que dá o tom.

---

### Seção 12 · Casos de reaproveitamento

**Antetítulo:** `NA PRÁTICA`

**Headline:**

> ## Bens que voltaram a ser usados.

**Estrutura de cada card:**

> **{{nome_do_bem}}**
> {{campus_origem}} → {{campus_destino}}
> Classificado como {{categoria}} · {{dias}} dias entre a publicação e a entrega
>
> "{{depoimento_curto_do_servidor}}"

**Botão:** `Ver todos os casos` → `/casos`

🎬 **Mídia** — **foto real do bem**, feita pelo próprio setor de patrimônio, em
proporção 4:3. Objeto no ambiente de destino, luz disponível, sem produção.
`alt="{{nome_do_bem}} em uso no {{setor_destino}} do campus {{campus_destino}}"`

⚠️ **Condição de publicação:** só entra com caso real e autorização de quem for
citado. Sem caso, a seção inteira sai do ar — não se preenche com exemplo
fictício.

---

### Seção 13 · Para sua universidade

**Antetítulo:** `ADESÃO`

**Headline:**

> ## Sua universidade pode entrar na rede.

**Corpo:**

> O Circula·MG foi desenhado para as onze universidades federais de Minas
> Gerais. A adesão não exige troca do sistema de patrimônio nem alteração do
> rito da comissão de avaliação.

**Quatro passos:**

| # | Passo | Descrição |
|---|---|---|
| 1 | **Contato inicial** | A pró-reitoria de administração ou o setor de patrimônio manifesta interesse. |
| 2 | **Configuração** | Cadastro da instituição, dos campi, dos setores e da comissão de avaliação. |
| 3 | **Acesso institucional** | Integração com a identidade única da universidade — os servidores entram com a conta que já usam. |
| 4 | **Operação assistida** | Capacitação do setor de patrimônio e acompanhamento nos primeiros ciclos. |

**Botão primário:** `Falar com a equipe`
**Link secundário:** `Ver requisitos técnicos`

🎬 **Mídia** — mapa de Minas Gerais com as onze universidades federais marcadas;
as aderentes em `forest #2F5D50` preenchido, as demais em contorno `line`.
Comunica escala e convida à adesão sem uma linha de texto.
`alt="Mapa de Minas Gerais com as universidades federais participantes da rede"`

---

### Seção 14 · Acesso por perfil

**Antetítulo:** `ACESSO RÁPIDO`

**Headline:**

> ## Vá direto ao que você faz.

**Quatro colunas:**

| Setor de Patrimônio | Comissão de Avaliação | Servidor Solicitante | Sociedade |
|---|---|---|---|
| Cadastrar bem | Fila de classificação | Buscar na vitrine | Vitrine pública |
| Meus bens publicados | Critérios do art. 3º | Minhas regras de interesse | Indicadores da rede |
| Painel do campus | Histórico de decisões | Meus interesses | Base normativa |
| Manual do patrimônio | Manual da comissão | Como manifestar interesse | Perguntas frequentes |

🎬 **Mídia** — nenhuma. Quatro colunas de links, separadas por linha vertical
`1px #ECE9DE`, título de coluna em maiúsculas 11,5 px cor `text-faint`.

---

### Seção 15 · Sistemas relacionados

**Headline (12,5 px, discreta):**

> ### Sistemas relacionados

**Links externos:**

`Siads` · `Doações gov.br` · `Portal de Compras` · `SEI` · `Decreto nº 12.785/2025`

**Nota:**

> O Circula·MG opera ao lado desses sistemas, não no lugar deles.

🎬 **Mídia** — faixa horizontal com os nomes em texto, não logotipos (evita
problema de uso de marca). Ícone de link externo de 12 px após cada item.

---

### Seção 16 · Rodapé

**Coluna 1 — Produto**
`Vitrine` · `Como funciona` · `Transparência` · `Casos de reaproveitamento`

**Coluna 2 — Institucional**
`Base normativa` · `Para sua universidade` · `Perguntas frequentes` · `Contato`

**Coluna 3 — Obrigatórios**
`Acessibilidade` · `Transparência e Prestação de Contas` · `Acesso à Informação` ·
`Política de Privacidade`

**Coluna 4 — Contato**

> **Circula·MG**
> {{unidade_responsavel}}
> Universidade Federal de Alfenas
> Rua Gabriel Monteiro da Silva, 700 — Centro
> Alfenas/MG — CEP 37130-001
> {{email_contato}}

**Linha de créditos:**

> Circula·MG é uma ferramenta desenvolvida no âmbito do Programa de
> Pós-Graduação em Ciências Ambientais da UNIFAL-MG. Não substitui o sistema
> oficial da Seges/MGI previsto no Decreto nº 12.785/2025.

🎬 **Mídia** — selo de Acesso à Informação (padrão gov.br) e logotipo da
UNIFAL-MG, ambos em versão monocromática.

---

## 7.3 Páginas internas

### /vitrine

**Título da página:** `Vitrine`

**Subtítulo:**

> Bens publicados pelas universidades federais de Minas Gerais e disponíveis
> para manifestação de interesse.

**Rótulos dos filtros:**

| Elemento | Copy |
|---|---|
| Busca | placeholder: `Buscar por nome, número de patrimônio ou setor…` |
| Categoria | `Todas as categorias` |
| Campus | `Todos os campi` |
| Status | `Todos os status` |
| Rótulo dos filtros de tipo | `FILTROS` |
| Etiqueta de filtro | `{{rótulo}} {{contagem}}` — a contagem fica ao lado, em corpo menor |
| Contador | `{{n}} bens publicados na vitrine` · com filtros: `… · Mobiliário ou Armazenamento` |
| Limpar | `limpar tudo` |

**Regra de exibição das etiquetas:** um filtro sem nenhum bem não é mostrado —
exceto se estiver marcado, para que dê para desmarcá-lo. Etiqueta com contagem
zero é convite para um beco sem saída.

**No cadastro** (rótulo e ajuda do campo):

> **Filtros do bem** — selecione um ou mais
>
> É por aqui que outras unidades encontram o bem na vitrine. Marque tudo que se
> aplica: um armário é *Mobiliário* e *Armazenamento*.

**Erro quando nenhum filtro é marcado:**

> Selecione ao menos um filtro para o bem ser encontrado na vitrine.

**Estado vazio (sem resultado para o filtro):**

> Nenhum bem corresponde a esses filtros.
> Botão: `Limpar filtros`

**Estado vazio (vitrine sem nenhum bem):**

> Ainda não há bens publicados. A vitrine é alimentada pelos setores de
> patrimônio da rede.

**Card do bem** — microcopy:
`publicado há {{n}} dias` · `ver detalhes →`

---

### /vitrine/{id} — detalhe do bem

**Estrutura:**

> `{{numero_patrimonio}}`
> # {{nome_do_bem}}
> [selo categoria] [selo status]
> 📍 {{campus}} — {{setor}}

**Bloco normativo** (texto fixo, já usado no protótipo):

> Classificação atribuída pela comissão de avaliação local, conforme art. 3º do
> Decreto nº 12.785/2025. Bem publicado na vitrine institucional para
> manifestação de interesse por servidores e unidades cadastradas.

**Rótulo do stepper:** `FLUXO DO BEM`

**Botão:** `Manifestar interesse neste bem`

**Botão — visitante sem login:** `Entrar para manifestar interesse`

**Botão — bem reservado:** `Bem reservado` *(desabilitado)*
**Nota:** `Já há manifestação de interesse em andamento para este bem.`

**Botão — bem transferido:** `Ciclo concluído` *(desabilitado)*

🎬 **Mídia** — galeria de até 5 fotos do bem, proporção 4:3, primeira em
destaque. Sem foto, exibe o selo circular da categoria ampliado sobre fundo
`paper`. `alt="{{nome_do_bem}} — {{campus}}, {{setor}}"`

---

### /como-funciona

**Título:** `Como funciona`

**Subtítulo:**

> Do cadastro do bem ao reaproveitamento: quem faz o quê, em que ordem e com
> qual fundamento.

**Seções:** as seis etapas em detalhe · papéis e permissões · árvore de decisão
da classificação · três jornadas de uso.

*Conteúdo integral já especificado em [03 — Como funciona](03-como-funciona.md);
esta página é a transposição pública daquele documento.*

---

### /transparencia

**Título:** `Transparência`

**Subtítulo:**

> Indicadores abertos da rede. Atualizados diariamente, sem cadastro.

**Rótulos dos indicadores** (idênticos aos do Painel da aplicação):

`Bens cadastrados` · `Disponíveis na vitrine` · `Reaproveitados` · `Tempo médio`

**Legendas dos gráficos:**

- `Distribuição por categoria` — sublegenda: `art. 3º, Decreto nº 12.785/2025`
- `Bens publicados por campus`

**Filtros:** `Instituição` · `Campus` · `Período`

**Nota de metodologia:**

> *Tempo médio* considera os dias entre a publicação do bem na vitrine e a
> primeira manifestação de interesse. *Reaproveitados* contabiliza bens com
> transferência concluída. Dados apurados em {{data_apuracao}}.

**Botão:** `Baixar dados (CSV)`

---

### /para-sua-universidade

**Título:** `Para sua universidade`

**Hero:**

> # Entrar na rede não exige trocar de sistema.
> O Circula·MG funciona ao lado do Siads e do rito que a sua comissão de
> avaliação já segue.

**Blocos:** o que a instituição precisa ter · os quatro passos · o que
acontece no primeiro ciclo · perguntas de gestor.

**Formulário — rótulos e microcopy:**

| Campo | Rótulo | Placeholder / ajuda |
|---|---|---|
| Nome | `Nome completo` | |
| E-mail | `E-mail institucional` | ajuda: `Use o e-mail da sua universidade` |
| Instituição | `Universidade` | seletor com as 11 federais de MG |
| Cargo | `Cargo ou função` | `Ex.: Chefe do Setor de Patrimônio` |
| Mensagem | `Como podemos ajudar?` | `Conte em que ponto está a sua instituição` |

**Botão:** `Enviar mensagem`
**Confirmação:** `Mensagem enviada. Retornamos pelo e-mail institucional informado.`
**Erro:** `Não foi possível enviar. Tente novamente ou escreva para {{email_contato}}.`
**Nota LGPD (11,5 px):**

> Os dados informados são usados apenas para responder a este contato, conforme
> a Lei nº 13.709/2018.

---

### /base-normativa

**Título:** `Base normativa`

**Subtítulo:**

> O Decreto nº 12.785/2025 e o que ele determina sobre classificação, comissão
> de avaliação, divulgação e doação de bens móveis.

**Seções:** o que mudou em dezembro de 2025 · as cinco categorias e seus
critérios · a comissão de avaliação (art. 19) · divulgação e o sistema nacional
(art. 20) · doação e ordem de preferência (arts. 11 e 13) · relação com o Siads
e com a Lei nº 14.133/2021.

🎬 **Mídia** — sumário lateral fixo, sem imagens. Tratamento de documento
oficial: Source Serif 4 no corpo, largura de leitura de 680 px.

---

### /ajuda — Perguntas frequentes

**Título:** `Perguntas frequentes`

**Grupo — Sobre o produto**

> **O Circula·MG substitui o Doações gov.br?**
> Não. A divulgação prevista no art. 20 do decreto continua sendo feita no
> sistema gerenciado pela Seges/MGI. O Circula·MG é uma camada local que trata
> da descoberta ativa, do rito da comissão e dos indicadores por campus.

> **E o Siads?**
> O Siads continua sendo o sistema obrigatório de registro e controle
> patrimonial. O Circula·MG não registra patrimônio: ele conecta oferta e
> demanda entre unidades e conversa com o Siads pelo número de patrimônio.

> **O sistema faz a baixa patrimonial?**
> Não. Ele registra a publicação, a manifestação de interesse e a conclusão do
> reaproveitamento. Os atos formais continuam no rito administrativo da
> instituição.

> **Quanto custa para a universidade?**
> {{modelo_de_custeio}} — a definir com a instituição durante a adesão.

**Grupo — Classificação**

> **Quem classifica o bem?**
> A comissão de avaliação do campus, instituída pela autoridade competente com
> no mínimo três membros, conforme o art. 19 do Decreto nº 12.785/2025. O setor
> de patrimônio propõe; a comissão decide.

> **Posso publicar um bem sem passar pela comissão?**
> Não. A publicação na vitrine só acontece depois da confirmação da
> classificação.

> **E se a comissão discordar da classificação proposta?**
> Ela altera a categoria e registra a justificativa. As duas informações — o que
> foi proposto e o que foi decidido — ficam no histórico do bem.

**Grupo — Uso**

> **Como recebo aviso de bens que me interessam?**
> Cadastre uma regra de interesse indicando categoria e campus. Toda vez que um
> bem compatível for publicado, você é notificado.

> **Quem pode ver os bens publicados?**
> Qualquer pessoa pode consultar a vitrine e os indicadores. Cadastrar bens,
> classificar e manifestar interesse exige login institucional.

> **E os bens antieconômicos e irrecuperáveis?**
> Ficam identificados na vitrine com a categoria própria. Não havendo interesse
> na rede, seguem para doação com preferência a cooperativas de catadores de
> materiais recicláveis, conforme o art. 13, IV.

---

## 7.4 Microcopy da aplicação

Textos de sistema. Os dois primeiros **já existem no protótipo** e devem ser
mantidos.

### Confirmações (toasts)

| Evento | Texto |
|---|---|
| Cadastro enviado | `"{{nome}}" enviado à comissão de avaliação de {{campus}}.` ✅ *já implementado* |
| Interesse registrado | `Interesse registrado em "{{nome}}". A unidade solicitante será notificada.` ✅ *já implementado* |
| Classificação confirmada | `Classificação confirmada. "{{nome}}" foi publicado na vitrine.` |
| Classificação alterada | `Classificação alterada para {{categoria}}. Justificativa registrada.` |
| Transferência aprovada | `Transferência aprovada. O setor de origem foi notificado.` |
| Reaproveitamento registrado | `Ciclo concluído. "{{nome}}" consta como reaproveitado.` |
| Regra de interesse criada | `Pronto. Você será avisado sobre bens {{categoria}} em {{campus}}.` |

### Rótulos de botão

| Contexto | Rótulo |
|---|---|
| Enviar cadastro | `Enviar à comissão de avaliação` ✅ *já implementado* |
| Manifestar interesse | `Manifestar interesse neste bem` ✅ *já implementado* |
| Comissão — aprovar | `Confirmar classificação e publicar` |
| Comissão — alterar | `Alterar classificação` |
| Comissão — devolver | `Devolver ao setor de patrimônio` |
| Aprovar transferência | `Aprovar transferência` |
| Concluir ciclo | `Registrar reaproveitamento` |
| Criar regra | `Criar regra de interesse` |
| Cancelar | `Cancelar` |

### Validações de formulário

| Situação | Mensagem |
|---|---|
| Nome vazio | `Informe o nome do bem.` |
| Setor vazio | *(opcional — sem erro)* |
| Justificativa obrigatória | `Justifique a alteração da classificação proposta.` |
| Sessão expirada | `Sua sessão expirou. Entre novamente para continuar.` |
| Erro de servidor | `Não foi possível concluir. Tente novamente em instantes.` |

### Estados vazios

| Tela | Texto |
|---|---|
| Vitrine sem resultado | `Nenhum bem corresponde a esses filtros.` |
| Fila da comissão vazia | `Nenhum bem aguardando classificação.` |
| Sem notificações | `Nenhuma notificação. Crie uma regra de interesse para ser avisado sobre novos bens.` |
| Sem regras de interesse | `Você ainda não tem regras de interesse. Escolha uma categoria e um campus para começar a receber avisos.` |
| Painel sem dados | `Ainda não há dados suficientes para calcular os indicadores.` |

> ⚠️ **Corrigir no protótipo:** com a lista vazia, o KPI de tempo médio exibe
> `NaNd` — ver [§4.13, item 5](04-especificacoes.md#413-pendências-e-inconsistências-detectadas).
> O texto acima é o comportamento correto.

---

## 7.5 Metadados e SEO

| Página | `<title>` | `meta description` |
|---|---|---|
| `/` | `Circula·MG — Rede de reaproveitamento de bens das universidades federais de MG` | `Bens móveis ociosos de um campus podem atender à necessidade de outro. Vitrine compartilhada, notificação automática e indicadores, conforme o Decreto nº 12.785/2025.` |
| `/vitrine` | `Vitrine de bens — Circula·MG` | `Bens móveis publicados pelas universidades federais de Minas Gerais e disponíveis para manifestação de interesse.` |
| `/como-funciona` | `Como funciona — Circula·MG` | `As seis etapas do reaproveitamento de um bem móvel: do cadastro pelo setor de patrimônio à entrega na unidade de destino.` |
| `/transparencia` | `Transparência — Circula·MG` | `Indicadores abertos da rede: bens cadastrados, reaproveitados, tempo médio e distribuição por categoria e campus.` |
| `/para-sua-universidade` | `Para sua universidade — Circula·MG` | `Como uma universidade federal de Minas Gerais adere à rede de reaproveitamento de bens móveis.` |
| `/base-normativa` | `Base normativa — Circula·MG` | `O Decreto nº 12.785/2025 e o que determina sobre classificação, comissão de avaliação, divulgação e doação de bens móveis.` |
| `/ajuda` | `Perguntas frequentes — Circula·MG` | `Dúvidas sobre classificação, relação com o Siads e o Doações gov.br, e como manifestar interesse em um bem.` |

**Open Graph:** imagem 1200×630 com o selo circular e a assinatura
`Circula·MG — Rede de reaproveitamento`, fundo `paper #F1F1EA`.

---

## 7.6 Regras de mídia

| Regra | Detalhe |
|---|---|
| **Foto real, sempre** | Nada de banco de imagens. Almoxarifado de verdade comunica mais do que escritório genérico |
| **Sem pessoas identificáveis** sem autorização | Se houver servidor na foto, autorização de uso de imagem por escrito |
| **Alt text descritivo** | Descreve o conteúdo, não o arquivo. `alt=""` apenas em elemento puramente decorativo |
| **Peso** | Imagem de hero até 300 KB; demais até 150 KB. WebP com fallback JPEG |
| **Proporções** | Hero 16:9 · cards de caso 4:3 · fotos de bem 4:3 |
| **Sem texto dentro da imagem** | Texto em imagem não é lido por leitor de tela nem indexado |
| **Movimento** | Só *fade-in* na entrada da viewport. Respeitar `prefers-reduced-motion: reduce` |
| **Vídeo** | Se houver, nunca com reprodução automática; sempre com legenda |

---

## 7.7 Checklist antes de publicar

- [ ] Nenhum `{{placeholder}}` restou no HTML
- [ ] Todo número exibido vem do banco e tem data de apuração visível
- [ ] Seções 5, 10 e 12 saem do ar se não houver dado ou caso real
- [ ] Toda imagem tem `alt` e as decorativas têm `alt=""`
- [ ] Hierarquia de headings sem salto (um `h1` por página)
- [ ] Todo link externo indicado como tal
- [ ] Rodapé com Acessibilidade, Acesso à Informação, Transparência e Privacidade
- [ ] Aviso de cookies com recusa por padrão
- [ ] Nenhuma palavra da lista banida em §7.1
- [ ] Os textos normativos citam artigo e decreto por extenso

---

**Anterior:** [06 — Estrutura do site](06-estrutura-do-site.md) · **Índice:** [README](README.md)
