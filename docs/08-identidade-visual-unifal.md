# 08 — Identidade visual da UNIFAL-MG

Captura da identidade visual do portal oficial, para servir de referência
institucional ao Circula·MG.

> **O que este documento é:** uma análise técnica do site
> [unifal-mg.edu.br/portal](https://www.unifal-mg.edu.br/portal/), feita para
> orientar o desenvolvimento do Circula·MG.
> **O que não é:** manual de marca oficial da UNIFAL-MG. Antes de qualquer uso
> público de logotipo ou identidade da universidade, validar com a **Dicom**
> (Diretoria de Comunicação Social), que assina o desenvolvimento do portal.

---

## 8.1 Método

Os valores abaixo **não foram estimados a olho**. Foram extraídos por inspeção
dos estilos computados de todos os elementos visíveis da página inicial, em
navegador, em **6 de agosto de 2026**:

- cores medidas por área ocupada (fundos) e por volume de texto (cores de texto);
- tipografia medida por volume de caracteres renderizados em cada família;
- botões e títulos amostrados um a um, com `getComputedStyle`;
- contraste calculado pela fórmula de luminância relativa da WCAG 2.1.

O portal é construído em **WordPress + Elementor** — o que explica a
proliferação de variantes de cor documentada em [§8.8](#88-inconsistências-observadas).

---

## 8.2 Paleta

### Azul institucional — a cor da marca

| Hex | Papel observado | Texto branco |
|---|---|---|
| `#083780` | Faixa do menu principal, bloco "Para a Comunidade", navegação do carrossel | **11,24:1** ✅ |
| `#07378D` | Botões primários ("Ver mais notícias"), editoria "UNIFAL-MG em Ação" | **10,82:1** ✅ |
| `#0D388B` | Variante residual, uso pontual | — |

> As três são **a mesma intenção de cor** com três valores diferentes. Ver
> [§8.8](#88-inconsistências-observadas).

### Cores de área — o sistema temático

Cada grande área da universidade tem uma cor própria. É o dispositivo estrutural
mais forte da identidade: o visitante aprende a reconhecer a área pela cor antes
de ler o rótulo.

| Hex | Área | Texto branco |
|---|---|---|
| `#0091D1` | **Ensino** · editoria "Destaques" · "Giro Acadêmico" | 3,52:1 ❌ |
| `#E9004D` | **Pesquisa** · editoria "Acontece" | 4,59:1 ⚠️ |
| `#FFC617` | **Extensão e Cultura** | 1,57:1 ❌ |
| `#51BC5E` | **Assistência Estudantil** | 2,41:1 ❌ |
| `#083780` | **Para a Comunidade** | 11,24:1 ✅ |

### Cores de apoio

| Hex | Papel observado | Texto branco |
|---|---|---|
| `#00AEEE` | Ciano de elementos secundários | 2,53:1 ❌ |
| `#1BAFEC` | Etiqueta de data em eventos | 2,50:1 ❌ |
| `#FDB025` | Editoria "Literatura pelas Bordas" | 1,84:1 ❌ |
| `#00A0D2` | Variante de ciano, uso pontual | — |
| `#ED40BE` | Rosa, uso residual | — |

### Neutros

| Hex | Papel | Contraste sobre branco |
|---|---|---|
| `#FFFFFF` | Fundo dominante — cerca de 70% da área da página | — |
| `#F1F1F1` | Faixa do governo brasileiro, no topo | — |
| `#F7F7F7` · `#F9F9F9` · `#F1F2F3` | Fundos de seção alternados | — |
| `#222222` | Texto de corpo | 15,91:1 ✅ |
| `#202020` | Títulos e links de conteúdo | 16,4:1 ✅ |
| `#626262` | Texto secundário | 6,10:1 ✅ |
| `#767676` | Texto terciário | 4,54:1 ✅ *(no limite)* |
| `#E8E8E8` | Bordas e divisores | — |

---

## 8.3 Acessibilidade da paleta — o achado mais relevante

O portal aplica **texto branco sobre todas as cores de área**, em
Roboto Condensed 16 px peso 700. Como 16 px em negrito **não** se qualifica como
"texto grande" na WCAG (que exige 18,66 px em negrito ou 24 px), o critério
aplicável é **4,5:1**.

| Cor | Contraste com branco | AA (4,5:1) | Situação |
|---|---|---|---|
| `#083780` | 11,24:1 | ✅ | Aprovado com folga |
| `#07378D` | 10,82:1 | ✅ | Aprovado com folga |
| `#E9004D` | 4,59:1 | ✅ | Aprovado no limite |
| `#0091D1` | 3,52:1 | ❌ | Reprovado |
| `#00AEEE` | 2,53:1 | ❌ | Reprovado |
| `#1BAFEC` | 2,50:1 | ❌ | Reprovado |
| `#51BC5E` | 2,41:1 | ❌ | Reprovado |
| `#FDB025` | 1,84:1 | ❌ | Reprovado |
| `#FFC617` | **1,57:1** | ❌ | **Reprovado com folga** — praticamente ilegível |

**Consequência direta para o Circula·MG:** a doc
[06 §6.9](06-estrutura-do-site.md#69-requisitos-obrigatórios) estabelece
WCAG 2.1 AA como requisito obrigatório. Portanto:

> **Herdar a paleta da UNIFAL tal como está aplicada no portal reprovaria o
> Circula·MG no próprio critério que ele se compromete a cumprir.**

As mesmas cores **funcionam bem sobre fundo escuro** — `#FFC617` sobre `#222222`
alcança 10,11:1. A correção é inverter a aplicação, não descartar a cor:

| Cor | Sobre branco | Sobre `#222222` |
|---|---|---|
| `#FFC617` | 1,57:1 ❌ | **10,11:1** ✅ |
| `#FDB025` | 1,84:1 ❌ | **8,65:1** ✅ |
| `#51BC5E` | 2,41:1 ❌ | **6,59:1** ✅ |
| `#0091D1` | 3,52:1 ❌ | **4,52:1** ✅ |

---

## 8.4 Tipografia

Quatro famílias em uso simultâneo, cada uma com um papel distinguível:

| Família | Papel | Volume de texto |
|---|---|---|
| **Jost** | Corpo de texto — a fonte padrão do `<body>` | ~1.078.000 caracteres |
| **Poppins** | Títulos de notícia e chamadas editoriais | ~862.000 |
| **Roboto Condensed** | Títulos de seção, editorias, botões | ~6.100 |
| **Open Sans** | Exclusiva da barra do governo brasileiro | ~675 |

> Jost e Poppins são ambas **geométricas sem serifa** e muito próximas em
> desenho. A distinção entre elas é sutil demais para carregar hierarquia —
> ver [§8.8](#88-inconsistências-observadas).

### Espécimes medidos

| Nível | Família | Tamanho | Peso | Caixa | Espaçamento | Cor | Exemplo real |
|---|---|---|---|---|---|---|---|
| `h1` | Roboto Condensed | 30 px | 800 | maiúsculas | normal | `#202020` | JORNAL UNIFAL-MG |
| `h2` | Roboto Condensed | 18 px | 700 | — | 0,5 px | `#FFFFFF` | Ensino |
| `h3` | Roboto Condensed | 23 px | 700 | — | normal | `#FFFFFF` | Alunos |
| `h4` | Poppins | 29 px | 700 | — | **−1 px** | `#202020` | Inscrições abertas para o projeto… |
| Corpo | Jost | 17 px | 400 | — | normal | `#222222` | — |
| Barra gov | Open Sans | 12 px | 500 | — | normal | `#606060` | Simplifique! |

### Escala em uso

`12 · 13 · 14 · 15 · 16 · 17 · 18 · 23 · 29 · 30 · 35 · 50 px`

O corpo em **17 px/400** é, isolado, o par tamanho-peso mais frequente da página.
O título de notícia em Poppins usa **espaçamento negativo de −1 px**, que fecha o
texto e é uma marca reconhecível do portal.

---

## 8.5 Botões

### Botão primário

| Propriedade | Valor |
|---|---|
| Fundo | `#07378D` |
| Texto | `#FFFFFF` |
| Fonte | Roboto Condensed 15 px / peso 700 |
| Raio | `5px` |
| Preenchimento | `12px 24px` |
| Borda | nenhuma |
| Exemplo | `VER MAIS NOTÍCIAS` |

### Etiqueta de editoria

| Propriedade | Valor |
|---|---|
| Fundo | cor da editoria (`#0091D1`, `#07378D`, `#E9004D`, `#FDB025`) |
| Texto | `#FFFFFF` |
| Fonte | Roboto Condensed 16 px / peso 700 |
| Raio | `0px` — **canto vivo** |
| Preenchimento | `10px 15px 8px 10px` — assimétrico |
| Exemplos | `DESTAQUES` · `ACONTECE` · `UNIFAL-MG EM AÇÃO` |

### Botão fantasma (barra do governo)

| Propriedade | Valor |
|---|---|
| Fundo | transparente |
| Borda | `1px solid #FFFFFF` |
| Texto | `#FFFFFF`, 12 px / peso 600, maiúsculas, espaçamento 1 px |
| Raio | `0px` |

---

## 8.6 Forma e profundidade

| Propriedade | Valor observado | Leitura |
|---|---|---|
| Raios | `50%` (14×) · `4px` · `5px` · `8px` | Círculo para ícones e avatares; raio pequeno para botões; etiquetas com canto vivo |
| Sombras | `rgba(0,0,0,0.016) 0 2px 0` — praticamente imperceptível | **Design plano.** Separação por cor e por linha, não por elevação |
| Bordas | `1px #E8E8E8` | Divisor discreto |
| Fundo dominante | `#FFFFFF` | Alto contraste com os blocos coloridos |

O portal **não usa elevação**. A hierarquia é construída por bloco de cor sólida
e por peso tipográfico. É uma decisão coerente com o tom institucional.

---

## 8.7 Tom de voz

Amostras colhidas na própria página.

### Padrões identificados

**1. Título de seção em maiúsculas, separado por barra vertical**

> `OPORTUNIDADES | CONCURSOS | EDITAIS`
> `EVENTOS | AGENDA`
> `ACESSO RÁPIDO | LINKS ÚTEIS`
> `UNIFAL-MG EM NÚMEROS`

A barra agrupa sinônimos e amplia a chance de o visitante reconhecer o que
procura. É um recurso de portal, não de produto.

**2. Rótulos substantivos, nunca verbais**

> `Cursos de Graduação` · `Sistema Acadêmico` · `Bibliotecas` ·
> `Repositório Institucional` · `Técnicos-administrativos`

O portal nomeia coisas; não conversa com o usuário. Não há "acesse", "descubra",
"confira" nos rótulos de navegação.

**3. Chamadas de ação curtas, imperativas, em maiúsculas**

> `VER MAIS NOTÍCIAS` · `TODOS OS EVENTOS`

**4. Editorias com nome próprio, tratadas como marca**

> `LITERATURA PELAS BORDAS` · `GIRO ACADÊMICO` · `UNIFAL-MG EM AÇÃO` ·
> `DESTAQUES` · `ACONTECE`

É o traço mais editorial do portal: as seções de notícia têm identidade própria,
com cor e nome, como cadernos de jornal.

**5. Assinatura territorial**

> `UNIVERSIDADE FEDERAL DE ALFENAS`
> `Alfenas | Poços de Caldas | Varginha`
> `Sul de Minas Gerais`

Os três campi aparecem sempre juntos, na mesma ordem. É a forma como a
instituição se apresenta.

**6. Prova por número**

A seção `UNIFAL-MG EM NÚMEROS` lista oito indicadores com rótulo descritivo
completo — "Alunos matriculados: Graduação e Pós-Graduação", "Projetos de
Pesquisa e Iniciação Científica". Os valores são **contadores animados a partir
de zero** ao entrar na viewport.

### Síntese do tom

**Institucional, descritivo e impessoal.** Nomeia com precisão, não persuade, não
usa primeira pessoa e não adjetiva. A autoridade vem da exatidão do rótulo.

É **o mesmo princípio** já adotado no tom de voz do Circula·MG em
[07 §7.1](07-conteudo-do-site.md#71-tom-de-voz) — o que confirma a direção.

---

## 8.8 Inconsistências observadas

Registradas porque o Circula·MG **não deve reproduzi-las**.

| # | Observação | Impacto |
|---|---|---|
| 1 | **Dois azuis institucionais quase idênticos** — `#083780` e `#07378D`, diferença imperceptível | Duplicação sem função; sinal de acúmulo, não de decisão |
| 2 | **Quatro cianos** — `#0091D1`, `#00AEEE`, `#1BAFEC`, `#00A0D2` | Mesma questão, ampliada |
| 3 | **Quatro famílias tipográficas**, sendo duas (Jost e Poppins) geométricas quase intercambiáveis | A distinção não carrega hierarquia; custo de carregamento sem retorno |
| 4 | **Caixa alta inconsistente** — `OPORTUNIDADES \| CONCURSOS \| eDITAIS`, `PLATAFORMA G sUITE`, `comunicação e IMPRENSA` | Maiúsculas digitadas manualmente em vez de `text-transform`; aparece como erro de digitação |
| 5 | **Contraste reprovado** em 6 das 9 cores de destaque com texto branco | Barreira real de acessibilidade — ver [§8.3](#83-acessibilidade-da-paleta--o-achado-mais-relevante) |
| 6 | **Preenchimento assimétrico** nas etiquetas (`10px 15px 8px 10px`) | Provável ajuste manual para compensar a métrica da fonte; frágil |

---

## 8.9 O que o Circula·MG herda

> **Decisão de 06/08/2026:** o Circula·MG passou a ser tratado como **sistema
> interno da UNIFAL-MG**. A identidade própria original (fundo cor de papel,
> verde de circularidade, Source Serif 4) foi **inteiramente substituída** pela
> identidade institucional da universidade, com foco em tons de azul. O único
> elemento próprio preservado é o **selo circular de classificação**, agora
> colorido pela rampa azul.

### Como o conflito de contraste foi resolvido

O [§8.3](#83-acessibilidade-da-paleta--o-achado-mais-relevante) mostra que a
paleta da UNIFAL, aplicada como está no portal, reprova em AA. A adoção foi feita
com a correção que o próprio §8.3 prescreve — **inverter a aplicação, não
descartar a cor**:

- `color` — a cor de marca da UNIFAL, no selo, no ponto, na borda e no fundo. É o
  que se lê como identidade.
- `ink` — a mesma cor escurecida até ≥4,5:1 sobre fundo claro, usada só em texto.

Resultado medido no site em execução: **todas as etiquetas de categoria e status
passam em AA** — 4,84:1 · 4,90:1 · 5,30:1 · 7,86:1 · 16,91:1.

### Foco em tons de azul

Em vez das cinco cores de área da UNIFAL (que incluem magenta, amarelo e verde),
as cinco categorias do art. 3º usam uma **rampa monocromática azul**, ancorada
nos azuis reais do portal. Tabela completa em
[04 §4.4](04-especificacoes.md#44-enumerações-normativas).

Como a escala é monocromática, a cor deixa de ser suficiente para distinguir
categorias — por isso **todo selo e etiqueta carrega o rótulo por extenso**
(WCAG 1.4.1). A separação perceptual entre passos adjacentes foi verificada em
ΔL* CIELAB (mínimo 9,9; alvo ≥ 8).

### Marca institucional

O logotipo oficial da UNIFAL-MG (`public/marca/unifal-mg.png`, 1100×303, PNG com
transparência) foi obtido do cabeçalho do portal e aparece na barra
institucional e no rodapé, com link para o portal.

> ⚠️ Uso interno. Antes de qualquer publicação externa, validar o uso da marca
> com a **Dicom**.

### Quadro de herança

| Elemento da UNIFAL | Herda? | Como |
|---|---|---|
| **Barra do governo brasileiro** | ✅ Integral | Mesma barra, mesma posição, `#F1F1F1`, Open Sans 12 px |
| **Azul institucional `#083780`** | ✅ **Aplicado** | É a cor primária do produto: botões, foco, gráficos e stepper |
| **Sistema de cor por área** | ✅ Como princípio | O Circula·MG já faz isso: as 5 categorias do art. 3º têm cor própria. É a mesma lógica, aplicada a outro domínio |
| **"UNIFAL-MG em Números"** | ✅ Como padrão de seção | Vira "A rede em números" ([07 §7.2, seção 5](07-conteudo-do-site.md#seção-5--a-rede-em-números)) — mas **sem contador animado partindo de zero**, que atrapalha leitor de tela |
| **Assinatura territorial** | ✅ Adaptada | `Alfenas \| Poços de Caldas \| Varginha` vira a lista de campi da rede |
| **Tom institucional e descritivo** | ✅ Integral | Já é o tom definido em [07 §7.1](07-conteudo-do-site.md#71-tom-de-voz) |
| **Design plano, sem elevação** | ✅ Compatível | O Circula·MG usa sombra apenas no *hover* dos cartões; coerente |
| **Rodapé com contato por campus** | ✅ Integral | Endereço real, Acesso à Informação, Transparência |
| **Roboto Condensed** | ✅ **Aplicado** | Rótulos, etiquetas e números de patrimônio |
| **Jost / Poppins** | ✅ **Aplicado** | Jost no corpo, Poppins nos títulos (700, −1px) |
| **Paleta aplicada como está no portal** | ❌ Não | Reprovaria em WCAG AA. Adotada com a correção `color`/`ink` descrita acima |
| **Carrossel rotativo** | ❌ Não | Já descartado em [06 §6.10](06-estrutura-do-site.md#610-o-que-não-copiar) |
| **Menu de 12 itens** | ❌ Não | O produto tem 5 |

### Estado da aplicação

A substituição está implementada em `circula-mg-app/src/site/tokens.js`, que é a
fonte única de verdade de cor e tipografia — inclusive para o protótipo em
`src/App.jsx`.

---

## 8.10 Brand board

Peça visual com paleta, espécimes tipográficos, botões e amostras de tom:

📄 [`brand-board-unifal.html`](brand-board-unifal.html) — abrir no navegador

Contém as três tipografias reais embutidas no arquivo (não depende de internet),
os valores hexadecimais copiáveis e o contraste calculado de cada cor.

---

**Anterior:** [07 — Conteúdo do site](07-conteudo-do-site.md) · **Índice:** [README](README.md)
