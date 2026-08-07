/* ============================================================
   Dados do site público.

   REGRA DE OURO — docs/07-conteudo-do-site.md §7.2, seções 5, 10 e 12:
   nenhum número exibido no site pode ser inventado. Todo indicador é
   derivado dos registros reais e carrega data de apuração e rótulo de
   piloto. Se não houver dado, a seção não é renderizada.
   ============================================================ */

import { SEED } from "../App.jsx";

export const bens = SEED;

/* Origem dos dados exibidos. Enquanto o piloto não gerar volume, os
   indicadores vêm da UNIFAL-MG e são rotulados como tal. */
export const origem = {
  rotulo: "Piloto institucional — UNIFAL-MG",
  apuracao: "6 de agosto de 2026",
  periodo: "desde o início do piloto",
};

/* Indicadores — mesmos cálculos do Painel da aplicação (docs/04 §4.5,
   RF-15). Corrige a divisão por zero apontada em docs/04 §4.13, item 5. */
export function indicadores(lista = bens) {
  const total = lista.length;
  if (total === 0) return null; // sem dado → a seção não entra no ar

  const disponiveis = lista.filter((b) => b.status === "disponivel").length;
  const reaproveitados = lista.filter((b) => b.status === "transferido").length;
  const tempoMedio = Math.round(
    lista.reduce((acc, b) => acc + b.dias, 0) / total
  );
  const campi = new Set(lista.map((b) => b.campus)).size;

  return { total, disponiveis, reaproveitados, tempoMedio, campi };
}

/* Casos de reaproveitamento — docs/07 §7.2, seção 12.
   Só entram com caso real e autorização de quem for citado.
   Enquanto vazio, a seção não é renderizada. NÃO preencher com exemplo
   fictício. */
export const casos = [];

/* As 11 universidades federais de Minas Gerais — docs/05 §5.3.
   `aderiu` marca quem já está na rede. */
export const universidades = [
  { sigla: "UFMG", nome: "Universidade Federal de Minas Gerais", sede: "Belo Horizonte", aderiu: false },
  { sigla: "UFOP", nome: "Universidade Federal de Ouro Preto", sede: "Ouro Preto", aderiu: false },
  { sigla: "UFU", nome: "Universidade Federal de Uberlândia", sede: "Uberlândia", aderiu: false },
  { sigla: "UFVJM", nome: "Universidade Federal dos Vales do Jequitinhonha e Mucuri", sede: "Diamantina", aderiu: false },
  { sigla: "UFTM", nome: "Universidade Federal do Triângulo Mineiro", sede: "Uberaba", aderiu: false },
  { sigla: "UFSJ", nome: "Universidade Federal de São João del-Rei", sede: "São João del-Rei", aderiu: false },
  { sigla: "UFV", nome: "Universidade Federal de Viçosa", sede: "Viçosa", aderiu: false },
  { sigla: "UFLA", nome: "Universidade Federal de Lavras", sede: "Lavras", aderiu: false },
  { sigla: "UFJF", nome: "Universidade Federal de Juiz de Fora", sede: "Juiz de Fora", aderiu: false },
  { sigla: "UNIFAL-MG", nome: "Universidade Federal de Alfenas", sede: "Alfenas", aderiu: true },
  { sigla: "UNIFEI", nome: "Universidade Federal de Itajubá", sede: "Itajubá", aderiu: false },
];

/* Etapas do fluxo com responsável — docs/07 §7.2, seção 7 */
export const etapas = [
  { n: 1, nome: "Cadastrado", frase: "O setor de patrimônio registra o bem e propõe uma classificação.", quem: "Setor de Patrimônio" },
  { n: 2, nome: "Classificado", frase: "A comissão confirma ou altera a classificação, com justificativa.", quem: "Comissão de Avaliação" },
  { n: 3, nome: "Publicado", frase: "O bem entra na vitrine e os interessados são avisados.", quem: "Sistema" },
  { n: 4, nome: "Interesse", frase: "Uma unidade manifesta interesse e o bem fica reservado.", quem: "Servidor Solicitante" },
  { n: 5, nome: "Aprovado", frase: "A transferência é autorizada.", quem: "Comissão / autoridade" },
  { n: 6, nome: "Reaproveitado", frase: "O bem é entregue e volta a ser usado.", quem: "Setor de Patrimônio" },
];

/* Comparação com o sistema nacional — docs/07 §7.2, seção 9 */
export const comparacao = [
  { criterio: "Alcance", nacional: "Nacional, obrigatório", local: "Universidades federais de MG" },
  { criterio: "Descoberta", nacional: "Busca ativa no catálogo", local: "Notificação por interesse declarado" },
  { criterio: "Comissão de avaliação", nacional: "Fora do sistema", local: "Etapa do próprio fluxo" },
  { criterio: "Indicadores", nacional: "Agregados nacionais", local: "Por campus e por instituição" },
  { criterio: "Publicação legal", nacional: "Continua obrigatória", local: "Camada complementar" },
];

/* Dispositivos do decreto — docs/07 §7.2, seção 11 */
export const dispositivos = [
  { art: "Art. 3º", exige: "Classificação em cinco categorias", onde: "Cadastro, filtros da vitrine e painel" },
  { art: "Art. 19", exige: "Comissão de avaliação com no mínimo três membros", onde: "Etapa 2 do fluxo, com justificativa registrada" },
  { art: "Art. 20", exige: "Divulgação em sistema gerenciado pela Seges/MGI", onde: "Camada de interoperabilidade" },
  { art: "Arts. 11 e 13", exige: "Doação e ordem de preferência", onde: "Identificação das categorias com destinação preferencial" },
];

/* Acesso por perfil — docs/07 §7.2, seção 14 */
export const perfis = [
  { nome: "Setor de Patrimônio", links: ["Cadastrar bem", "Meus bens publicados", "Painel do campus", "Manual do patrimônio"] },
  { nome: "Comissão de Avaliação", links: ["Fila de classificação", "Critérios do art. 3º", "Histórico de decisões", "Manual da comissão"] },
  { nome: "Servidor Solicitante", links: ["Buscar na vitrine", "Minhas regras de interesse", "Meus interesses", "Como manifestar interesse"] },
  { nome: "Sociedade", links: ["Vitrine pública", "Indicadores da rede", "Base normativa", "Perguntas frequentes"] },
];

/* Sistemas vizinhos — docs/07 §7.2, seção 15 */
export const sistemas = [
  { nome: "Siads", url: "https://www.gov.br/patrimonio/pt-br/siads" },
  { nome: "Doações gov.br", url: "https://www.gov.br/patrimonio/pt-br/doacoes/doacoes-gov.br" },
  { nome: "Portal de Compras", url: "https://www.gov.br/compras/pt-br" },
  { nome: "SEI", url: "https://www.gov.br/economia/pt-br/acesso-a-informacao/sei" },
  {
    nome: "Decreto nº 12.785/2025",
    url: "https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12785-19-dezembro-2025-798522-publicacaooriginal-177487-pe.html",
  },
];

/* Perguntas frequentes — docs/07 §7.3 (/ajuda) */
export const faq = [
  {
    grupo: "Sobre o produto",
    itens: [
      {
        p: "O Circula·MG substitui o Doações gov.br?",
        r: "Não. A divulgação prevista no art. 20 do decreto continua sendo feita no sistema gerenciado pela Seges/MGI. O Circula·MG é uma camada local que trata da descoberta ativa, do rito da comissão e dos indicadores por campus.",
      },
      {
        p: "E o Siads?",
        r: "O Siads continua sendo o sistema obrigatório de registro e controle patrimonial. O Circula·MG não registra patrimônio: ele conecta oferta e demanda entre unidades e conversa com o Siads pelo número de patrimônio.",
      },
      {
        p: "O sistema faz a baixa patrimonial?",
        r: "Não. Ele registra a publicação, a manifestação de interesse e a conclusão do reaproveitamento. Os atos formais continuam no rito administrativo da instituição.",
      },
      {
        p: "Quanto custa para a universidade?",
        r: "O modelo de custeio está em definição e será acordado com a instituição durante a adesão. O piloto na UNIFAL-MG corre no âmbito do projeto de pesquisa.",
      },
    ],
  },
  {
    grupo: "Classificação",
    itens: [
      {
        p: "Quem classifica o bem?",
        r: "A comissão de avaliação do campus, instituída pela autoridade competente com no mínimo três membros, conforme o art. 19 do Decreto nº 12.785/2025. O setor de patrimônio propõe; a comissão decide.",
      },
      {
        p: "Posso publicar um bem sem passar pela comissão?",
        r: "Não. A publicação na vitrine só acontece depois da confirmação da classificação.",
      },
      {
        p: "E se a comissão discordar da classificação proposta?",
        r: "Ela altera a categoria e registra a justificativa. As duas informações — o que foi proposto e o que foi decidido — ficam no histórico do bem.",
      },
    ],
  },
  {
    grupo: "Uso",
    itens: [
      {
        p: "Como recebo aviso de bens que me interessam?",
        r: "Cadastre uma regra de interesse indicando categoria e campus. Toda vez que um bem compatível for publicado, você é notificado.",
      },
      {
        p: "Quem pode ver os bens publicados?",
        r: "Qualquer pessoa pode consultar a vitrine e os indicadores. Cadastrar bens, classificar e manifestar interesse exige login institucional.",
      },
      {
        p: "E os bens antieconômicos e irrecuperáveis?",
        r: "Ficam identificados na vitrine com a categoria própria. Não havendo interesse na rede, seguem para doação com preferência a cooperativas de catadores de materiais recicláveis, conforme o art. 13, IV.",
      },
    ],
  },
];

/* Passos de adesão — docs/07 §7.2, seção 13 */
export const passosAdesao = [
  { n: 1, titulo: "Contato inicial", texto: "A pró-reitoria de administração ou o setor de patrimônio manifesta interesse." },
  { n: 2, titulo: "Configuração", texto: "Cadastro da instituição, dos campi, dos setores e da comissão de avaliação." },
  { n: 3, titulo: "Acesso institucional", texto: "Integração com a identidade única da universidade — os servidores entram com a conta que já usam." },
  { n: 4, titulo: "Operação assistida", texto: "Capacitação do setor de patrimônio e acompanhamento nos primeiros ciclos." },
];
