/* ============================================================
   Sessão do protótipo.

   NÃO É AUTENTICAÇÃO. Guarda apenas o perfil escolhido na tela de
   entrada, em sessionStorage, para que a aplicação saiba o que exibir.
   Nenhuma credencial é verificada, transmitida ou armazenada.

   No piloto, isto é substituído por OIDC/SAML contra a identidade
   institucional — docs/04-especificacoes.md §4.8. Nessa arquitetura o
   Circula·MG nunca vê a senha do servidor.
   ============================================================ */

const CHAVE = "circulamg.sessao";

export const PERFIS = [
  {
    id: "patrimonio",
    nome: "Setor de Patrimônio",
    descricao: "Cadastra bens, acompanha o fluxo e opera o painel do campus.",
  },
  {
    id: "comissao",
    nome: "Comissão de Avaliação",
    descricao: "Confirma ou altera a classificação do art. 3º e libera a publicação.",
  },
  {
    id: "solicitante",
    nome: "Servidor Solicitante",
    descricao: "Busca bens, cria regras de interesse e manifesta interesse.",
  },
];

export function lerSessao() {
  try {
    const bruto = sessionStorage.getItem(CHAVE);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

export function abrirSessao({ perfil, email, campus }) {
  const dados = {
    perfil,
    nome: PERFIS.find((p) => p.id === perfil)?.nome || perfil,
    email: email || "",
    campus: campus || "Alfenas",
    em: new Date().toISOString(),
  };
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    /* modo privado sem storage — a sessão simplesmente não persiste */
  }
  return dados;
}

export function encerrarSessao() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {
    /* nada a fazer */
  }
}
