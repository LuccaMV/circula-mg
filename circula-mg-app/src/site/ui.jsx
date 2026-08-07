/* ============================================================
   Componentes compartilhados do site público.
   Design system: docs/04-especificacoes.md §4.9
   Herança institucional: docs/08-identidade-visual-unifal.md §8.9
   ============================================================ */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Stamp, MapPin, ChevronRight, ExternalLink, Menu, X, CheckCircle2,
} from "lucide-react";
import { T, F, CATS, STATUS, MAX, MARCA_UNIFAL } from "./tokens.js";
import { filtrosDoBem, rotuloFiltro } from "./taxonomia.js";

/* ---------- primitivos ---------- */

export function Wrap({ children, max = MAX, style }) {
  return (
    <div style={{ maxWidth: max, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </div>
  );
}

export function Section({ id, children, bg = T.paper, pad, style }) {
  return (
    <section
      id={id}
      style={{
        background: bg,
        padding: pad || "clamp(56px, 8vw, 112px) 0",
        ...style,
      }}
    >
      <Wrap>{children}</Wrap>
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: F.sans,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: T.textFaint,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

export function H2({ children, style }) {
  return (
    <h2
      style={{
        fontFamily: F.serif,
        fontWeight: 700, letterSpacing: "-1px",
        fontSize: "clamp(28px, 4vw, 44px)",
        lineHeight: 1.15,
        color: T.ink,
        margin: "0 0 16px",
        textWrap: "balance",
        maxWidth: "18ch",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, style }) {
  return (
    <p
      style={{
        fontFamily: F.sans,
        fontSize: 17,
        lineHeight: 1.65,
        color: T.textMuted,
        maxWidth: "62ch",
        margin: "0 0 32px",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export function Btn({ to, href, children, variant = "primary", onClick, type }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: F.sans,
    fontSize: 15,
    fontWeight: 600,
    padding: "13px 22px",
    borderRadius: 3,
    border: "1px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background .15s, border-color .15s, color .15s",
    lineHeight: 1.2,
  };
  const styles = {
    primary: { ...base, background: T.forest, color: "#fff" },
    secondary: {
      ...base,
      background: "transparent",
      color: T.ink,
      borderColor: T.line,
    },
    onDark: { ...base, background: "#fff", color: T.ink },
    ghostDark: {
      ...base,
      background: "transparent",
      color: "#fff",
      borderColor: "rgba(255,255,255,.5)",
    },
  };
  const s = styles[variant] || styles.primary;

  if (to) return <Link to={to} style={s}>{children}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={s}>
        {children} <ExternalLink size={13} aria-hidden="true" />
      </a>
    );
  return (
    <button type={type || "button"} onClick={onClick} style={s}>
      {children}
    </button>
  );
}

/* Botão de destaque, com relevo. Estilo em index.css (.cmg-btn-3d).

   Regra de uso: no máximo UM por tela, na ação que a tela existe para
   provocar. Espalhá-lo pelas ações secundárias transformaria o tom
   institucional do produto em algo de aplicativo de jogo. */
export function BtnDestaque({ to, children, onClick, type, claro, disabled, style, title }) {
  const classe = `cmg-btn-3d${claro ? " cmg-btn-3d--claro" : ""}`;
  if (to && !disabled) {
    return (
      <Link to={to} className={classe} style={style} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type || "button"}
      className={classe}
      onClick={onClick}
      disabled={disabled}
      style={style}
      title={title}
    >
      {children}
    </button>
  );
}

/* ---------- selo circular da classificação ---------- */

export function Selo({ cat, size = 58 }) {
  const c = CATS[cat];
  if (!c) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${c.color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-8deg)",
        flexShrink: 0,
        position: "relative",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          border: `1px dashed ${c.color}88`,
        }}
      />
      <Stamp size={size * 0.31} color={c.color} strokeWidth={1.6} />
    </div>
  );
}

/* `color` é a cor de marca (ponto, borda, fundo). `ink` é a variante
   escurecida usada no texto, para garantir ≥4,5:1 — ver tokens.js. */
export function Pill({ color, ink, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11.5,
        fontFamily: F.mono,
        letterSpacing: ".02em",
        color: ink || color,
        border: `1px solid ${color}55`,
        background: `${color}14`,
        borderRadius: 20,
        padding: "3px 9px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {children}
    </span>
  );
}

/* ---------- cartão de bem (usado na vitrine e na home) ---------- */

export function BemCard({ bem }) {
  const cat = CATS[bem.categoria];
  const st = STATUS[bem.status];
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={`/vitrine/${bem.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#fff",
        border: `1px solid ${T.line}`,
        borderRadius: 4,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        textDecoration: "none",
        color: "inherit",
        transition: "box-shadow .15s, transform .15s",
        boxShadow: hover ? "0 8px 20px -10px rgba(23,33,28,.35)" : "none",
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: T.textMuted, marginBottom: 4 }}>
            {bem.id}
          </div>
          <div style={{ fontFamily: F.serif, fontSize: 17, color: T.ink, lineHeight: 1.25 }}>
            {bem.nome}
          </div>
        </div>
        <Selo cat={bem.categoria} />
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Pill color={cat.color} ink={cat.ink}>{cat.label}</Pill>
        <Pill color={st.color} ink={st.ink}>{st.label}</Pill>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: T.textMuted }}>
        <MapPin size={13} aria-hidden="true" /> {bem.campus} · {bem.setor}
      </div>
      {filtrosDoBem(bem).length > 0 && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {filtrosDoBem(bem).map((f) => (
            <span
              key={f}
              style={{
                fontFamily: F.sans, fontSize: 11.5, color: T.textMuted,
                background: T.lineSoft, borderRadius: 3, padding: "2px 8px",
              }}
            >
              {rotuloFiltro(f)}
            </span>
          ))}
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          paddingTop: 12,
          borderTop: `1px solid ${T.lineSoft}`,
        }}
      >
        <span style={{ fontSize: 11.5, color: T.textFaint }}>
          publicado há {bem.dias} {bem.dias === 1 ? "dia" : "dias"}
        </span>
        <span style={{ fontSize: 12.5, color: T.forest, fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
          ver detalhes <ChevronRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/* ---------- stepper das 6 etapas ---------- */

export function Stepper({ step = 6, compact = false }) {
  const nomes = ["Cadastrado", "Classificado", "Publicado", "Interesse", "Aprovado", "Reaproveitado"];
  return (
    <ol
      style={{
        display: "flex",
        alignItems: "flex-start",
        listStyle: "none",
        margin: 0,
        padding: 0,
        flexWrap: "nowrap",
      }}
    >
      {nomes.map((s, i) => {
        const done = i + 1 <= step;
        return (
          <React.Fragment key={s}>
            <li
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                minWidth: compact ? 58 : 74,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: compact ? 26 : 34,
                  height: compact ? 26 : 34,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done ? T.forest : "#fff",
                  border: `2px solid ${done ? T.forest : T.line}`,
                  color: done ? "#fff" : "#767676",
                  fontSize: compact ? 11 : 13,
                  fontWeight: 700,
                  fontFamily: F.sans,
                }}
              >
                {done ? <CheckCircle2 size={compact ? 14 : 17} aria-hidden="true" /> : i + 1}
              </div>
              <span
                style={{
                  fontSize: compact ? 10.5 : 12,
                  color: done ? T.ink : "#767676",
                  textAlign: "center",
                  fontWeight: done ? 600 : 400,
                  fontFamily: F.sans,
                  lineHeight: 1.3,
                }}
              >
                {s}
              </span>
            </li>
            {i < nomes.length - 1 && (
              <li
                aria-hidden="true"
                style={{
                  flex: 1,
                  minWidth: 12,
                  height: 2,
                  background: i + 1 < step ? T.forest : T.line,
                  marginTop: compact ? 12 : 16,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}

/* ---------- indicador numérico ---------- */

export function Num({ valor, rotulo, nota }) {
  return (
    <div style={{ flex: "1 1 180px", minWidth: 160 }}>
      <div
        style={{
          fontFamily: F.serif,
          fontSize: "clamp(40px, 6vw, 64px)",
          lineHeight: 1,
          color: T.ink,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {valor}
      </div>
      <div style={{ fontFamily: F.sans, fontSize: 14.5, color: T.ink, marginTop: 10, fontWeight: 500 }}>
        {rotulo}
      </div>
      {nota && (
        <div style={{ fontFamily: F.sans, fontSize: 12.5, color: T.textFaint, marginTop: 3 }}>
          {nota}
        </div>
      )}
    </div>
  );
}

/* ---------- tarja de protótipo ----------

   O site exibe indicadores rotulados como "Piloto institucional —
   UNIFAL-MG" que são, hoje, derivados de dados simulados. Numa URL
   pública isso pode ser lido como número oficial da universidade.
   A tarja existe para que nunca seja.

   Controlada por VITE_AVISO_PROTOTIPO. Só desligue quando houver dados
   reais — o padrão é ligado, inclusive se a variável não existir. */

export function AvisoPrototipo() {
  const ligado = import.meta.env.VITE_AVISO_PROTOTIPO !== "off";
  const [fechado, setFechado] = useState(false);
  if (!ligado || fechado) return null;

  return (
    <div
      role="note"
      style={{
        background: "#051B42",
        color: "#C7D6EE",
        fontFamily: F.sans,
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      <Wrap style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 24px", flexWrap: "wrap" }}>
        <strong style={{ color: "#fff", fontWeight: 600 }}>Protótipo de pesquisa.</strong>
        <span style={{ flex: "1 1 320px", minWidth: 0 }}>
          Os bens e indicadores exibidos são <strong style={{ color: "#fff", fontWeight: 600 }}>dados
          simulados</strong>, para demonstração. Não representam o patrimônio nem os
          números oficiais da UNIFAL-MG.
        </span>
        <button
          type="button"
          onClick={() => setFechado(true)}
          aria-label="Fechar aviso"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,.3)",
            borderRadius: 3,
            color: "#C7D6EE",
            cursor: "pointer",
            display: "inline-flex",
            padding: 4,
            flexShrink: 0,
          }}
        >
          <X size={14} aria-hidden="true" />
        </button>
      </Wrap>
    </div>
  );
}

/* ---------- marca institucional ---------- */

export function MarcaUnifal({ altura = 30, comLink = true }) {
  const img = (
    <img
      src={MARCA_UNIFAL.src}
      alt={MARCA_UNIFAL.alt}
      width={Math.round(altura * MARCA_UNIFAL.proporcao)}
      height={altura}
      style={{ display: "block", height: altura, width: "auto", maxWidth: "100%" }}
    />
  );
  if (!comLink) return img;
  return (
    <a
      href="https://www.unifal-mg.edu.br/portal/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}
    >
      {img}
    </a>
  );
}

/* ---------- cabeçalho ---------- */

const NAV = [
  { to: "/vitrine", label: "Vitrine" },
  { to: "/como-funciona", label: "Como funciona" },
  { to: "/transparencia", label: "Transparência" },
  { to: "/para-sua-universidade", label: "Para sua universidade" },
];

export function Header() {
  const { pathname } = useLocation();
  const [aberto, setAberto] = useState(false);

  useEffect(() => setAberto(false), [pathname]);

  return (
    <header style={{ background: "#fff", borderBottom: `1px solid ${T.line}`, position: "relative", zIndex: 20 }}>
      <Wrap style={{ display: "flex", alignItems: "center", gap: 14, minHeight: 76 }}>
        {/* Assinatura conjunta: a instituição vem primeiro, o sistema depois. */}
        <MarcaUnifal altura={30} />
        <span
          aria-hidden="true"
          style={{ width: 1, height: 34, background: T.line, flexShrink: 0 }}
        />
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginRight: "auto" }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 34, height: 34, borderRadius: "50%", border: `2px solid ${T.brand}`,
              display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-8deg)",
              flexShrink: 0,
            }}
          >
            <Stamp size={16} color={T.brand} />
          </div>
          <span>
            <span style={{ fontFamily: F.head, fontWeight: 700, letterSpacing: "-.5px", fontSize: 19, lineHeight: 1.1, color: T.ink, display: "block" }}>
              Circula·MG
            </span>
            <span style={{ fontSize: 9.5, color: T.textFaint, letterSpacing: ".05em", fontFamily: F.sans }}>
              REDE DE REAPROVEITAMENTO — UNIVERSIDADES FEDERAIS DE MG
            </span>
          </span>
        </Link>

        <nav className="cmg-nav-desk" aria-label="Navegação principal" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {NAV.map((n) => {
            const ativo = pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                style={{
                  fontFamily: F.sans, fontSize: 14, fontWeight: ativo ? 600 : 500,
                  color: ativo ? T.ink : T.textMuted, textDecoration: "none",
                  padding: "8px 12px", borderRadius: 3, whiteSpace: "nowrap",
                  borderBottom: `2px solid ${ativo ? T.forest : "transparent"}`,
                }}
              >
                {n.label}
              </Link>
            );
          })}
          <Link to="/entrar"
            style={{
              fontFamily: F.sans, fontSize: 14, fontWeight: 600, color: "#fff",
              background: T.forest, textDecoration: "none", padding: "10px 18px",
              borderRadius: 3, marginLeft: 8,
            }}
          >
            Entrar
          </Link>
        </nav>

        <button
          className="cmg-nav-toggle"
          type="button"
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
          style={{
            display: "none", background: "none", border: `1px solid ${T.line}`,
            borderRadius: 3, padding: 8, cursor: "pointer", color: T.ink,
          }}
        >
          {aberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Wrap>

      {aberto && (
        <nav className="cmg-nav-mob" aria-label="Navegação principal" style={{ borderTop: `1px solid ${T.line}`, background: "#fff" }}>
          <Wrap style={{ display: "flex", flexDirection: "column", padding: "10px 24px 18px" }}>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                style={{
                  fontFamily: F.sans, fontSize: 16, color: T.ink, textDecoration: "none",
                  padding: "13px 0", borderBottom: `1px solid ${T.lineSoft}`,
                }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/entrar"
              style={{
                fontFamily: F.sans, fontSize: 15, fontWeight: 600, color: "#fff",
                background: T.forest, textDecoration: "none", padding: "13px 18px",
                borderRadius: 3, marginTop: 14, textAlign: "center",
              }}
            >
            Entrar
          </Link>
          </Wrap>
        </nav>
      )}
    </header>
  );
}

/* ---------- rodapé ---------- */

export function Footer() {
  const col = { display: "flex", flexDirection: "column", gap: 9 };
  const tit = {
    fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".1em",
    textTransform: "uppercase", color: T.textFaint, marginBottom: 4,
  };
  const lk = { fontFamily: F.sans, fontSize: 14, color: T.textMuted, textDecoration: "none" };

  return (
    <footer style={{ background: "#fff", borderTop: `1px solid ${T.line}` }}>
      <Wrap style={{ padding: "56px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 36,
          }}
        >
          <div style={col}>
            <div style={tit}>Produto</div>
            <Link to="/vitrine" style={lk}>Vitrine</Link>
            <Link to="/como-funciona" style={lk}>Como funciona</Link>
            <Link to="/transparencia" style={lk}>Transparência</Link>
            <Link to="/casos" style={lk}>Casos de reaproveitamento</Link>
          </div>
          <div style={col}>
            <div style={tit}>Institucional</div>
            <Link to="/base-normativa" style={lk}>Base normativa</Link>
            <Link to="/para-sua-universidade" style={lk}>Para sua universidade</Link>
            <Link to="/ajuda" style={lk}>Perguntas frequentes</Link>
            <Link to="/para-sua-universidade#contato" style={lk}>Contato</Link>
          </div>
          <div style={col}>
            <div style={tit}>Obrigatórios</div>
            <Link to="/acessibilidade" style={lk}>Acessibilidade</Link>
            <a href="https://www.unifal-mg.edu.br/portal/transparencia/" style={lk} target="_blank" rel="noopener noreferrer">Transparência e Prestação de Contas</a>
            <a href="https://www.gov.br/acessoainformacao/pt-br" style={lk} target="_blank" rel="noopener noreferrer">Acesso à Informação</a>
            <Link to="/privacidade" style={lk}>Política de Privacidade</Link>
          </div>
          <div style={col}>
            <div style={tit}>Contato</div>
            <a href="https://www.unifal-mg.edu.br/portal/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginBottom: 6 }}>
              <img
                src={MARCA_UNIFAL.src}
                alt={MARCA_UNIFAL.alt}
                style={{ display: "block", height: 46, width: "auto", maxWidth: "100%" }}
              />
            </a>
            <div style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, lineHeight: 1.7 }}>
              <strong style={{ color: T.ink, fontWeight: 600 }}>Circula·MG</strong>
              <br />
              Rua Gabriel Monteiro da Silva, 700 — Centro
              <br />
              Alfenas/MG — CEP 37130-001
              <br />
              Alfenas · Poços de Caldas · Varginha
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            paddingTop: 24,
            borderTop: `1px solid ${T.lineSoft}`,
            fontFamily: F.sans,
            fontSize: 12.5,
            color: T.textFaint,
            lineHeight: 1.7,
            maxWidth: "84ch",
          }}
        >
          Circula·MG é uma ferramenta desenvolvida no âmbito do Programa de
          Pós-Graduação em Ciências Ambientais da UNIFAL-MG. Não substitui o
          sistema oficial da Seges/MGI previsto no Decreto nº 12.785/2025.
        </div>
      </Wrap>
    </footer>
  );
}

/* ---------- utilitário: rolar ao topo a cada navegação ---------- */

export function ScrollTop() {
  const { pathname } = useLocation();
  const primeira = useRef(true);
  useEffect(() => {
    if (primeira.current) { primeira.current = false; return; }
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
