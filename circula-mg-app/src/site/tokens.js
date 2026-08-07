/* ============================================================
   Tokens do Circula·MG — PADRÃO UNIFAL-MG

   Todas as cores foram substituídas pela paleta institucional da
   UNIFAL-MG, medida no portal oficial e documentada em
   docs/08-identidade-visual-unifal.md.

   COMO O CONTRASTE FOI RESOLVIDO
   O portal aplica texto branco sobre as cores de área, o que reprova
   em WCAG AA em 6 das 9 cores (doc 08 §8.3 — #FFC617 chega a 1,57:1).
   Aqui cada cor tem dois valores:

     `color` — a cor de marca da UNIFAL, usada em selo, ponto, borda,
               preenchimento e fundo. É o que se vê como identidade.
     `ink`   — a mesma cor escurecida até ≥4,5:1 sobre fundo claro,
               usada só em texto.

   Assim o padrão visual é o da UNIFAL e a acessibilidade se mantém.
   Valores de `ink` calculados por luminância relativa (WCAG 2.1).
   ============================================================ */

export const T = {
  /* neutros — padrão UNIFAL */
  white: "#FFFFFF",
  paper: "#F7F7F7", // fundo de seção alternada do portal
  govBar: "#F1F1F1", // faixa do governo brasileiro
  govText: "#3A3A3A",
  ink: "#222222", // texto de corpo do portal
  inkStrong: "#202020", // títulos e links
  textMuted: "#626262", // texto secundário — 6,10:1
  textFaint: "#767676", // texto terciário — 4,54:1
  line: "#E8E8E8", // bordas e divisores
  lineSoft: "#F1F1F1",

  /* azul institucional — a cor da marca (11,24:1 com branco) */
  institutionalBlue: "#083780",
  brand: "#083780", // primária: botões, foco, gráficos, stepper
  brandHover: "#07378D", // variante de botão do portal
  brandSoft: "#0D388B",

  /* apoio */
  cyan: "#0091D1",
  cyanInk: "#0074A7",
};

/* Compatibilidade: `forest` era a primária antiga (#2F5D50).
   Mantido como alias do azul institucional para não quebrar imports. */
T.forest = T.brand;

/* ============================================================
   As 5 categorias do art. 3º do Decreto nº 12.785/2025,
   em RAMPA AZUL institucional.

   Em vez das cinco cores de área da UNIFAL (que incluem magenta,
   amarelo e verde), as categorias usam uma escala monocromática de
   azul: quanto mais escuro e denso, mais próximo do fim de vida útil
   do bem. `regular` e `ocioso` são azuis reais medidos no portal; os
   demais são derivados no mesmo matiz institucional.

   Separação perceptual verificada (ΔL* CIELAB entre passos adjacentes,
   alvo ≥ 8): 9,9 · 11,6 · 12,5 · 22,2.

   Como a escala é monocromática, a cor NUNCA é o único portador de
   informação — todo selo e etiqueta traz o rótulo por extenso
   (WCAG 1.4.1).
   ============================================================ */
export const CATS = {
  regular: {
    label: "Uso regular",
    color: "#00AEEE", // UNIFAL — ciano de apoio (medido no portal)
    ink: "#007AA7", // 4,51:1 sobre fundo claro
    criterio:
      "Em condições de uso, manutenção vantajosa e efetivamente aproveitado pela unidade.",
  },
  ocioso: {
    label: "Ocioso",
    color: "#0091D1", // UNIFAL — Ensino (medido no portal)
    ink: "#0078AD", // 4,57:1
    criterio:
      "Em condições de uso, manutenção vantajosa, mas sem aproveitamento pela unidade que o detém.",
  },
  recuperavel: {
    label: "Recuperável",
    color: "#0F6FB5", // derivada
    ink: "#0F6FB5", // 4,95:1
    criterio:
      "Fora de condições de uso, com custo de recuperação de até 50% do valor de mercado.",
  },
  antieconomico: {
    label: "Antieconômico",
    color: "#0B4C97", // derivada
    ink: "#0B4C97", // 7,86:1
    criterio:
      "Em condições de uso, mas cuja manutenção custa mais do que o bem vale.",
  },
  irrecuperavel: {
    label: "Irrecuperável",
    color: "#051B42", // derivada de #083780
    ink: "#051B42", // 15,78:1
    criterio:
      "Não pode ser utilizado e a recuperação custa mais de 50% do valor de mercado.",
  },
};

/* Status reaproveita passos da rampa, como no protótipo original. */
export const STATUS = {
  disponivel: { label: "Disponível", color: "#0091D1", ink: "#0078AD" },
  reservado: { label: "Reservado", color: "#0F6FB5", ink: "#0F6FB5" },
  transferido: { label: "Transferido", color: "#051B42", ink: "#051B42" },
};

export const STEPS = [
  "Cadastrado",
  "Classificado",
  "Publicado",
  "Interesse",
  "Aprovado",
  "Reaproveitado",
];

/* ============================================================
   Tipografia — padrão UNIFAL-MG (doc 08 §8.4)
   Jost no corpo, Poppins nos títulos, Roboto Condensed em rótulos,
   editorias e botões. Carregadas em index.html.
   ============================================================ */
export const F = {
  display: "'Roboto Condensed', 'Arial Narrow', sans-serif", // títulos de seção, rótulos, botões
  serif: "'Poppins', system-ui, sans-serif", // títulos editoriais (alias mantido)
  head: "'Poppins', system-ui, sans-serif",
  sans: "'Jost', system-ui, sans-serif", // corpo
  mono: "'Roboto Condensed', ui-monospace, monospace", // números de patrimônio
};

/* Marca institucional */
export const MARCA_UNIFAL = {
  src: "/marca/unifal-mg.png",
  alt: "Universidade Federal de Alfenas — UNIFAL-MG",
  proporcao: 1100 / 303,
};

/* Escala e ritmo */
export const MAX = 1200;
export const MAX_APP = 1080;
export const READ = 680;

export const sectionPad = "clamp(64px, 9vw, 128px)";
