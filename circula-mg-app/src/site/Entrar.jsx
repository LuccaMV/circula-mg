/* ============================================================
   /entrar — tela de acesso.

   Arquitetura de autenticação: docs/04-especificacoes.md §4.8.
   O caminho real é OIDC/SAML contra a identidade institucional da
   UNIFAL-MG (federação CAFe na expansão). Nessa arquitetura o
   Circula·MG nunca manipula a senha do servidor — por isso não há
   campo de senha aqui.

   O acesso de demonstração existe só para o protótipo, para permitir
   percorrer a aplicação em cada um dos perfis.
   ============================================================ */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Stamp } from "lucide-react";
import { T, F, CATS } from "./tokens.js";
import { MarcaUnifal, Selo, BtnDestaque } from "./ui.jsx";
import { PERFIS, abrirSessao } from "./sessao.js";

const CAMPI = ["Alfenas", "Poços de Caldas", "Varginha"];

export default function Entrar() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(PERFIS[0].id);
  const [email, setEmail] = useState("");
  const [campus, setCampus] = useState(CAMPI[0]);
  const [erro, setErro] = useState("");

  const entrar = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErro("Informe seu e-mail institucional.");
      return;
    }
    if (!/@/.test(email)) {
      setErro("O e-mail informado não parece válido.");
      return;
    }
    setErro("");
    abrirSessao({ perfil, email: email.trim(), campus });
    navigate("/app");
  };

  const entrarPorSSO = () => {
    abrirSessao({ perfil, email: "", campus });
    navigate("/app");
  };

  const rotulo = {
    fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".06em",
    textTransform: "uppercase", color: T.textFaint, display: "block", marginBottom: 7,
  };
  const campo = {
    width: "100%", border: `1px solid ${T.line}`, borderRadius: 3,
    padding: "12px 14px", fontSize: 15, fontFamily: F.sans, color: T.ink,
    background: "#fff",
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)" }} className="cmg-entrar-grid">
      {/* ---------- painel institucional ---------- */}
      <aside
        style={{
          background: T.brand,
          color: "#fff",
          padding: "clamp(32px, 5vw, 64px)",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
        className="cmg-entrar-aside"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "#fff", padding: "8px 12px", borderRadius: 4, display: "inline-flex" }}>
            <MarcaUnifal altura={26} comLink={false} />
          </div>
        </div>

        <div style={{ marginTop: "auto" }}>
          <h1
            style={{
              fontFamily: F.head, fontWeight: 700, letterSpacing: "-1px",
              fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.15,
              margin: "0 0 18px", color: "#fff", textWrap: "balance", maxWidth: "16ch",
            }}
          >
            O que sobra em um campus falta no outro.
          </h1>
          <p style={{ fontFamily: F.sans, fontSize: 16.5, lineHeight: 1.65, color: "#C7D6EE", maxWidth: "42ch", margin: 0 }}>
            Rede de reaproveitamento de bens móveis das universidades federais de
            Minas Gerais, conforme o Decreto nº 12.785/2025.
          </p>
        </div>

        {/* As cinco categorias como assinatura visual */}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              fontFamily: F.sans, fontSize: 11, fontWeight: 600, letterSpacing: ".12em",
              textTransform: "uppercase", color: "#9DB6E0", marginBottom: 16,
            }}
          >
            Classificação do art. 3º
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.entries(CATS).map(([k, v]) => (
              <span
                key={k}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontFamily: F.mono, fontSize: 12, fontWeight: 600,
                  color: "#C7D6EE", border: "1px solid rgba(255,255,255,.25)",
                  borderRadius: 20, padding: "5px 11px",
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: v.color }} />
                {v.label}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* ---------- painel de acesso ---------- */}
      <main
        style={{
          background: "#fff",
          padding: "clamp(32px, 5vw, 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none",
              fontFamily: F.sans, fontSize: 14, color: T.textMuted, marginBottom: 36,
            }}
          >
            <ArrowLeft size={15} aria-hidden="true" /> Voltar ao site
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div
              aria-hidden="true"
              style={{
                width: 34, height: 34, borderRadius: "50%", border: `2px solid ${T.brand}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: "rotate(-8deg)", flexShrink: 0,
              }}
            >
              <Stamp size={16} color={T.brand} />
            </div>
            <span style={{ fontFamily: F.head, fontWeight: 700, letterSpacing: "-.5px", fontSize: 20, color: T.ink }}>
              Circula·MG
            </span>
          </div>

          <h2
            style={{
              fontFamily: F.head, fontWeight: 700, letterSpacing: "-1px",
              fontSize: 30, lineHeight: 1.2, color: T.ink, margin: "0 0 10px",
            }}
          >
            Entrar
          </h2>
          <p style={{ fontFamily: F.sans, fontSize: 15.5, lineHeight: 1.6, color: T.textMuted, margin: "0 0 32px" }}>
            O acesso usa a identidade única da UNIFAL-MG. Você entra com a mesma
            conta dos demais sistemas da universidade.
          </p>

          {/* caminho real — SSO institucional */}
          <BtnDestaque
            onClick={entrarPorSSO}
            style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, whiteSpace: "normal" }}
          >
            <ShieldCheck size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
            <span>
              Entrar com a identidade{" "}
              <span style={{ whiteSpace: "nowrap" }}>UNIFAL-MG</span>
            </span>
          </BtnDestaque>
          <p style={{ fontFamily: F.sans, fontSize: 12.5, color: T.textFaint, margin: "10px 0 0", lineHeight: 1.6 }}>
            Você é levado ao provedor de identidade da universidade. O Circula·MG
            não recebe nem armazena a sua senha.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "30px 0" }}>
            <span style={{ flex: 1, height: 1, background: T.line }} />
            <span style={{ fontFamily: F.sans, fontSize: 12, color: T.textFaint, textTransform: "uppercase", letterSpacing: ".08em" }}>
              ou
            </span>
            <span style={{ flex: 1, height: 1, background: T.line }} />
          </div>

          {/* acesso de demonstração do protótipo */}
          <form onSubmit={entrar} noValidate>
            <div
              style={{
                fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em",
                textTransform: "uppercase", color: T.textFaint, marginBottom: 18,
              }}
            >
              Acesso de demonstração
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={rotulo} htmlFor="e-email">E-mail institucional</label>
              <input
                id="e-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="nome.sobrenome@unifal-mg.edu.br"
                style={campo}
                aria-describedby={erro ? "e-erro" : undefined}
              />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={rotulo} htmlFor="e-campus">Campus</label>
              <select id="e-campus" value={campus} onChange={(ev) => setCampus(ev.target.value)} style={campo}>
                {CAMPI.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <fieldset style={{ border: "none", padding: 0, margin: "0 0 22px" }}>
              <legend style={{ ...rotulo, padding: 0 }}>Perfil</legend>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PERFIS.map((p) => {
                  const ativo = perfil === p.id;
                  return (
                    <label
                      key={p.id}
                      style={{
                        display: "flex", gap: 11, alignItems: "flex-start", cursor: "pointer",
                        border: `1px solid ${ativo ? T.brand : T.line}`,
                        background: ativo ? `${T.brand}0D` : "#fff",
                        borderRadius: 4, padding: "12px 14px",
                      }}
                    >
                      <input
                        type="radio"
                        name="perfil"
                        value={p.id}
                        checked={ativo}
                        onChange={() => setPerfil(p.id)}
                        style={{ marginTop: 3, accentColor: T.brand }}
                      />
                      <span>
                        <span style={{ display: "block", fontFamily: F.sans, fontSize: 14.5, fontWeight: 600, color: T.ink }}>
                          {p.nome}
                        </span>
                        <span style={{ display: "block", fontFamily: F.sans, fontSize: 13, color: T.textMuted, lineHeight: 1.5, marginTop: 2 }}>
                          {p.descricao}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {erro && (
              <p id="e-erro" role="alert" style={{ fontFamily: F.sans, fontSize: 13.5, color: CATS.irrecuperavel.ink, margin: "0 0 16px" }}>
                {erro}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 8, background: "transparent", color: T.ink, border: `1px solid ${T.line}`,
                padding: "14px 20px", borderRadius: 3, fontSize: 15, fontWeight: 600,
                fontFamily: F.sans, cursor: "pointer",
              }}
            >
              Entrar na demonstração <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>

          <div
            style={{
              marginTop: 28, padding: "14px 16px", background: T.paper,
              border: `1px solid ${T.line}`, borderRadius: 4,
              fontFamily: F.sans, fontSize: 12.5, lineHeight: 1.65, color: T.textMuted,
            }}
          >
            <strong style={{ color: T.ink }}>Protótipo.</strong> Nenhuma credencial
            é verificada, transmitida ou armazenada. O perfil escolhido fica
            apenas nesta aba do navegador, para percorrer a aplicação.
          </div>

          <p style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, marginTop: 22 }}>
            Só quer consultar?{" "}
            <Link to="/vitrine" style={{ color: T.brand, fontWeight: 600 }}>
              A vitrine é pública
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
