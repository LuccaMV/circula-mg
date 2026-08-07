/* ============================================================
   Filtros de tipo de bem.

   Dimensão distinta das já existentes:

     categoria  — 1 valor, normativa (art. 3º do Decreto nº 12.785/2025)
     campus     — 1 valor
     status     — 1 valor
     FILTROS    — 1 ou mais valores, atribuídos no cadastro

   Um armário de aço é, ao mesmo tempo, "Mobiliário" e "Armazenamento".
   Por isso a atribuição é múltipla: é assim que o servidor procura
   ("preciso de algo de informática"), e não pela categoria normativa.

   Na vitrine, filtros selecionados combinam por OU entre si e por E com
   as demais dimensões.
   ============================================================ */

export const FILTROS = {
  mobiliario: { label: "Mobiliário", descricao: "Mesas, cadeiras, armários, estantes e balcões." },
  armazenamento: { label: "Armazenamento", descricao: "Bens destinados a guardar materiais ou documentos." },
  informatica: { label: "Informática", descricao: "Computadores, periféricos e equipamentos de rede." },
  audiovisual: { label: "Audiovisual", descricao: "Projetores, telas, som e equipamentos de imagem." },
  salaDeAula: { label: "Sala de aula", descricao: "Bens de uso didático direto." },
  laboratorio: { label: "Laboratório", descricao: "Equipamentos e bancadas de laboratório." },
  climatizacao: { label: "Climatização", descricao: "Ar-condicionado, ventilação e aquecimento." },
  eletrodomesticos: { label: "Eletrodomésticos", descricao: "Aparelhos elétricos de uso geral." },
  copaRefeitorio: { label: "Copa e refeitório", descricao: "Bens de copa, cozinha e refeitório." },
  escritorio: { label: "Escritório", descricao: "Apoio administrativo e atendimento." },
};

export const CHAVES_FILTRO = Object.keys(FILTROS);

/** Rótulo de um filtro, tolerante a chave desconhecida. */
export function rotuloFiltro(chave) {
  return FILTROS[chave]?.label || chave;
}

/** Lista de filtros de um bem, ignorando chaves inválidas.
    Bens antigos, sem o campo, retornam lista vazia sem quebrar. */
export function filtrosDoBem(bem) {
  if (!bem || !Array.isArray(bem.filtros)) return [];
  return bem.filtros.filter((f) => FILTROS[f]);
}

/** Um bem casa com a seleção se tiver ao menos um dos filtros marcados.
    Seleção vazia não restringe nada. */
export function casaFiltros(bem, selecionados) {
  if (!selecionados || selecionados.length === 0) return true;
  const doBem = filtrosDoBem(bem);
  return selecionados.some((f) => doBem.includes(f));
}

/** Quantos bens de uma lista pertencem a cada filtro. */
export function contagemPorFiltro(bens) {
  const conta = {};
  for (const chave of CHAVES_FILTRO) conta[chave] = 0;
  for (const bem of bens) {
    for (const f of filtrosDoBem(bem)) conta[f] += 1;
  }
  return conta;
}
