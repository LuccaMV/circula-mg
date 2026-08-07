# Circula·MG

**Rede de reaproveitamento de bens móveis das universidades federais de Minas Gerais.**

Um armário de aço em condições de uso, parado há oito meses no almoxarifado de
Alfenas. Um processo de compra aberto em Varginha para adquirir um armário de
aço. Nenhum dos dois setores sabe da existência do outro.

O Circula·MG existe para resolver isso: uma vitrine compartilhada entre campi,
com notificação automática para quem declarou interesse, fluxo acoplado à
comissão de avaliação e indicadores por campus — alinhado ao
**Decreto nº 12.785/2025**.

> ⚠️ **Protótipo de pesquisa.** Os bens e indicadores são **dados simulados**,
> para demonstração. Não representam o patrimônio nem os números oficiais da
> UNIFAL-MG. Não há back-end, persistência nem autenticação real.

---

## Sumário

- [Contexto](#contexto)
- [O que o produto faz](#o-que-o-produto-faz)
- [Como rodar](#como-rodar)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Documentação](#documentação)
- [Identidade visual](#identidade-visual)
- [Publicação](#publicação)
- [Roadmap](#roadmap)
- [Origem acadêmica](#origem-acadêmica)
- [Licença](#licença)

---

## Contexto

Em **19 de dezembro de 2025** foi publicado o **Decreto nº 12.785/2025**, que
instituiu o marco de circularidade de bens móveis na administração pública
federal e revogou os Decretos nº 9.373/2018 e nº 10.340/2020. Ele exige:

- **classificação obrigatória** de cada bem em cinco categorias (art. 3º);
- atribuição dessa classificação por **comissão de avaliação** formal, com no
  mínimo três membros (art. 19);
- **divulgação** em sistema gerenciado pela Seges/MGI (art. 20);
- **preferência de doação** a cooperativas de catadores para bens antieconômicos
  e irrecuperáveis (art. 13, IV).

O canal nacional — o **Portal Doações gov.br** — resolve a publicidade legal, mas
deixa três lacunas operacionais:

| Gargalo | Consequência |
|---|---|
| Modelo puramente *pull* | O interessado natural nunca é avisado; bens ficam publicados sem destinatário |
| Rito da comissão fora do sistema | Retrabalho e prazo longo entre a decisão e a publicação |
| Ausência de indicadores locais | A gestão não sabe quanto tempo um bem leva para circular |

**O Circula·MG não compete com o sistema nacional.** É uma camada complementar,
de escala local, para as 11 universidades federais de MG. A publicação exigida
pelo art. 20 continua no sistema da Seges/MGI, e o **Siads** continua sendo o
sistema de registro patrimonial.

---

## O que o produto faz

### Site público

| Rota | Conteúdo |
|---|---|
| `/` | Apresentação em 13 seções: o problema, os três diferenciais, a rede em números, vitrine ao vivo, o fluxo, as cinco categorias, comparação com o Doações gov.br, impacto, base normativa, adesão |
| `/vitrine` | Catálogo com busca e filtros combináveis; a seleção fica na URL |
| `/vitrine/:id` | Detalhe do bem, com o *stepper* das seis etapas |
| `/como-funciona` | Etapas, papéis e permissões, regras de classificação |
| `/transparencia` | Indicadores abertos: KPIs, distribuição por categoria, volume por campus |
| `/para-sua-universidade` | Requisitos e passo a passo de adesão |
| `/base-normativa` | O decreto, artigo por artigo, e a relação com o Siads |
| `/ajuda` | Perguntas frequentes |
| `/entrar` | Tela de acesso — SSO institucional |
| `/app` | A aplicação (Vitrine, Cadastrar bem, Painel, Notificações) |

### Ciclo de vida do bem

```
Cadastrado → Classificado → Publicado → Interesse → Aprovado → Reaproveitado
    │             │             │           │           │            │
 Patrimônio    Comissão      Sistema   Solicitante  Comissão    Patrimônio
```

### As cinco categorias do art. 3º

| Categoria | Critério |
|---|---|
| **Uso regular** | Em condições de uso, manutenção vantajosa e efetivamente aproveitado |
| **Ocioso** | Em condições de uso, mas sem aproveitamento pela unidade que o detém |
| **Recuperável** | Fora de uso, com recuperação de até 50% do valor de mercado |
| **Antieconômico** | Em uso, mas cuja manutenção custa mais do que o bem vale |
| **Irrecuperável** | Não utilizável e recuperação acima de 50% do valor de mercado |

### Filtros de tipo

Dimensão **multivalorada**, atribuída no cadastro e obrigatória: Mobiliário,
Armazenamento, Informática, Audiovisual, Sala de aula, Laboratório,
Climatização, Eletrodomésticos, Copa e refeitório, Escritório.

A categoria do decreto diz *o que pode acontecer* com o bem; o filtro diz *o que
ele é* — e é assim que o servidor procura. Filtros combinam por **OU** entre si e
por **E** com categoria, campus, status e busca textual:

```
/vitrine?filtros=mobiliario,informatica&campus=Alfenas
```

---

## Como rodar

Pré-requisito: **Node.js 18+**.

```bash
npm install --prefix circula-mg-app
```

```bash
npm run dev --prefix circula-mg-app
```

Abra o endereço que o Vite exibir (normalmente `http://localhost:5173`).

Build de produção:

```bash
npm run build --prefix circula-mg-app
```

Para uma demonstração sem instalar nada, abra
`circula-mg-app/standalone/circula_mg.html` no navegador. Essa versão serve para
apresentação rápida — **não é a base para evolução do código**.

---

## Estrutura do repositório

```
circula-MG/
├── README.md                    # este arquivo
├── vercel.json                  # rewrite de SPA + cabeçalhos de segurança
├── .env.example                 # modelo de variáveis (e o alerta do VITE_)
├── circula_mg_prototipo.jsx     # protótipo original de referência
├── docs/                        # documentação de produto (8 documentos)
└── circula-mg-app/
    ├── index.html
    ├── vite.config.js
    ├── public/
    │   ├── marca/unifal-mg.png  # logotipo institucional
    │   └── robots.txt
    ├── standalone/              # versão sem build, para demonstração
    └── src/
        ├── main.jsx
        ├── index.css            # reset, responsividade e botão de destaque
        ├── App.jsx              # a aplicação (protótipo original)
        └── site/
            ├── Site.jsx         # casca e rotas
            ├── Home.jsx         # as seções da home
            ├── pages.jsx        # páginas internas
            ├── Entrar.jsx       # tela de acesso
            ├── ui.jsx           # componentes compartilhados
            ├── tokens.js        # design system — fonte única de cor e tipografia
            ├── taxonomia.js     # filtros de tipo de bem
            ├── data.js          # dados e indicadores derivados
            └── sessao.js        # sessão de demonstração
```

### Stack

| Camada | Tecnologia |
|---|---|
| UI | React 18 |
| Roteamento | React Router 7 |
| Build | Vite 5 |
| Ícones | lucide-react |
| Gráficos | recharts |
| Estilos | CSS-in-JS inline + `index.css`, sem framework |

Sem TypeScript, linter ou testes — ver [Roadmap](#roadmap).

---

## Documentação

A pasta [`docs/`](docs/) contém a documentação de produto. Todo comportamento
descrito como *implementado* foi verificado no código; o que é proposta está
marcado como tal.

| Documento | Conteúdo |
|---|---|
| [01 — Descrição](docs/01-descricao.md) | O produto, o problema, contexto normativo, público-alvo |
| [02 — Benefícios](docs/02-beneficios.md) | Ganhos por stakeholder, indicadores de sucesso, limitações |
| [03 — Como funciona](docs/03-como-funciona.md) | Ciclo de vida, módulos, papéis, jornadas de uso |
| [04 — Especificações](docs/04-especificacoes.md) | Arquitetura, modelo de dados, API, requisitos, design system |
| [05 — Glossário](docs/05-glossario-referencias.md) | Termos, siglas e fontes normativas |
| [06 — Estrutura do site](docs/06-estrutura-do-site.md) | Arquitetura de informação e mapa do site |
| [07 — Conteúdo do site](docs/07-conteudo-do-site.md) | *Copy deck*: textos, microcopy e mídias |
| [08 — Identidade UNIFAL-MG](docs/08-identidade-visual-unifal.md) | Paleta, tipografia e contraste, medidos no portal oficial |

Há também um **brand board** visual em
[`docs/brand-board-unifal.html`](docs/brand-board-unifal.html) — abra no
navegador.

---

## Identidade visual

O produto adota a **identidade institucional da UNIFAL-MG**, com foco em tons de
azul.

| Token | Valor | Uso |
|---|---|---|
| `brand` | `#083780` | Primária — botões, foco, gráficos (11,24:1 com branco) |
| `ink` | `#222222` | Texto principal |
| `textMuted` | `#626262` | Texto secundário |
| `line` | `#E8E8E8` | Bordas |
| `paper` | `#F7F7F7` | Fundo de seção alternada |

Tipografia: **Poppins** nos títulos, **Jost** no corpo, **Roboto Condensed** em
rótulos — as mesmas do portal da universidade.

As cinco categorias usam uma **rampa azul monocromática**, do mais claro (uso
regular) ao mais escuro (irrecuperável). Cada cor tem duas variantes: `color`
para selo e preenchimento, `ink` para texto — porque a paleta da UNIFAL, aplicada
como no portal, reprova em contraste WCAG AA. O detalhe está em
[docs/08 §8.3](docs/08-identidade-visual-unifal.md).

Como a escala é monocromática, **a cor nunca é o único portador de informação**:
todo selo e etiqueta traz o rótulo por extenso (WCAG 1.4.1).

> O logotipo da UNIFAL-MG está em `public/marca/`. **Uso interno.** Antes de
> qualquer publicação externa, validar com a **Dicom**.

---

## Publicação

Deploy na Vercel: importe o repositório. O `vercel.json` cuida de build,
cabeçalhos e do *rewrite* de SPA — sem ele, acessar `/vitrine` direto pela URL
retorna 404. Nenhuma configuração adicional é necessária.

### Variáveis de ambiente

Copie `.env.example` para `.env` (ignorado pelo git).

> **Toda variável com prefixo `VITE_` é embutida no pacote JavaScript entregue ao
> navegador — ou seja, é pública.** Nunca coloque segredo nela. Quando o back-end
> do piloto existir, credenciais vão em variáveis **sem** o prefixo, lidas apenas
> em código de servidor.

Hoje o projeto não usa nenhuma chave: não há chamadas de rede no código.

| Variável | Padrão | Efeito |
|---|---|---|
| `VITE_AVISO_PROTOTIPO` | `on` | Tarja "dados simulados" no topo. Só desligue quando houver dados reais |

---

## Roadmap

Do protótipo ao piloto institucional, em ordem de dependência:

| # | Entrega | Depende de |
|---|---|---|
| 1 | Back-end e persistência (PostgreSQL + API REST) | — |
| 2 | Autenticação institucional (SSO/CAFe) e os 4 perfis | 1 |
| 3 | Workflow real da comissão, com justificativa e auditoria | 1, 2 |
| 4 | Regras de interesse e disparo de notificações | 1, 2 |
| 5 | Upload de imagens dos bens | 1 |
| 6 | Indicadores derivados de datas reais | 1, 3 |
| 7 | Interoperabilidade com Siads e Doações gov.br | 1 |
| 8 | Testes de usabilidade com servidores | 3, 4 |

Pendências conhecidas do protótipo estão em
[docs/04 §4.13](docs/04-especificacoes.md).

---

## Origem acadêmica

Este repositório corresponde ao **Apêndice A** do projeto de qualificação:

> **Reaproveitamento de bens públicos: pesquisa sobre gargalos operacionais no
> Portal Doações gov.br e ferramenta digital de reuso**
> Augusto Carlos Marchetti
> Programa de Pós-Graduação em Ciências Ambientais — UNIFAL-MG

O desenho funcional da ferramenta transformado em código executável, para servir
de prova de conceito na defesa e como ponto de partida para o desenvolvimento do
piloto institucional.

**Não substitui o sistema oficial da Seges/MGI previsto no
Decreto nº 12.785/2025.**

---

## Licença

**Ainda não definida.** Sem um arquivo de licença, o padrão legal é *todos os
direitos reservados* — ninguém pode reusar o código legalmente.

Antes de tornar o repositório público, vale decidir com a instituição. Para
software de pesquisa em universidade pública, as escolhas usuais são **MIT** ou
**Apache-2.0** (permissivas) ou **GPL-3.0** (copyleft).

---

## Referências

- [Decreto nº 12.785/2025](https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12785-19-dezembro-2025-798522-publicacaooriginal-177487-pe.html)
- [Doações gov.br](https://www.gov.br/patrimonio/pt-br/doacoes/doacoes-gov.br)
- [Siads — Sistema Integrado de Gestão Patrimonial](https://www.gov.br/patrimonio/pt-br/siads)
- [UNIFAL-MG](https://www.unifal-mg.edu.br/portal/)
