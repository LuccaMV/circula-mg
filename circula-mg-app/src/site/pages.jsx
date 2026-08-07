/* ============================================================
   Páginas internas — docs/06-estrutura-do-site.md §6.7
                      docs/07-conteudo-do-site.md §7.3
   ============================================================ */

import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Search, MapPin, ChevronRight, ChevronDown, ArrowLeft, PieChart as PieIcon,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";
import { T, F, CATS, STATUS, READ } from "./tokens.js";
import {
  FILTROS, filtrosDoBem, casaFiltros, rotuloFiltro, contagemPorFiltro,
} from "./taxonomia.js";
import { Section, Wrap, Eyebrow, H2, Lead, Btn, BtnDestaque, Selo, Pill, BemCard, Stepper, Num } from "./ui.jsx";
import {
  bens, origem, indicadores, casos, etapas, faq, passosAdesao, universidades,
} from "./data.js";

/* ---------- cabeçalho padrão de página interna ---------- */

function PageHead({ eyebrow, titulo, lead, children }) {
  return (
    <div style={{ background: "#fff", borderBottom: `1px solid ${T.line}` }}>
      <Wrap style={{ padding: "clamp(40px, 6vw, 72px) 24px" }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1
          style={{
            fontFamily: F.serif,
            fontWeight: 700, letterSpacing: "-1px",
            fontSize: "clamp(30px, 4.6vw, 48px)",
            lineHeight: 1.12,
            color: T.ink,
            margin: "0 0 16px",
            textWrap: "balance",
            maxWidth: "20ch",
          }}
        >
          {titulo}
        </h1>
        {lead && (
          <p style={{ fontFamily: F.sans, fontSize: 17, lineHeight: 1.65, color: T.textMuted, maxWidth: "62ch", margin: 0 }}>
            {lead}
          </p>
        )}
        {children}
      </Wrap>
    </div>
  );
}

const inputStyle = {
  border: `1px solid ${T.line}`,
  borderRadius: 3,
  padding: "10px 13px",
  fontSize: 14,
  background: "#fff",
  color: T.ink,
  fontFamily: F.sans,
};

/* ============================================================
   /vitrine
   ============================================================ */

export function Vitrine() {
  /* O estado dos filtros vive na URL: uma vitrine filtrada é um link
     que o servidor pode mandar para o colega. */
  const [params, setParams] = useSearchParams();

  const q = params.get("q") || "";
  const cat = params.get("categoria") || "todas";
  const campus = params.get("campus") || "todos";
  const status = params.get("status") || "todos";
  const filtros = (params.get("filtros") || "").split(",").filter((f) => FILTROS[f]);

  const aplicar = (mudancas) => {
    const novo = new URLSearchParams(params);
    for (const [k, v] of Object.entries(mudancas)) {
      if (!v || v === "todas" || v === "todos") novo.delete(k);
      else novo.set(k, v);
    }
    setParams(novo, { replace: true });
  };

  const alternarFiltro = (k) => {
    const proximos = filtros.includes(k) ? filtros.filter((x) => x !== k) : [...filtros, k];
    aplicar({ filtros: proximos.join(",") });
  };

  const campi = useMemo(() => [...new Set(bens.map((b) => b.campus))].sort(), []);
  const contagem = useMemo(() => contagemPorFiltro(bens), []);

  /* Busca ampliada para nome, número de patrimônio e setor —
     corrige docs/04 §4.13, item 8. Filtros combinam por OU entre si
     e por E com as demais dimensões. */
  const filtrados = useMemo(() => {
    const termo = q.trim().toLowerCase();
    return bens.filter((b) => {
      const casaTermo =
        !termo ||
        b.nome.toLowerCase().includes(termo) ||
        b.id.toLowerCase().includes(termo) ||
        b.setor.toLowerCase().includes(termo);
      return (
        casaTermo &&
        (cat === "todas" || b.categoria === cat) &&
        (campus === "todos" || b.campus === campus) &&
        (status === "todos" || b.status === status) &&
        casaFiltros(b, filtros)
      );
    });
  }, [q, cat, campus, status, filtros.join(",")]);

  const limpar = () => setParams(new URLSearchParams(), { replace: true });
  const comFiltro =
    q || cat !== "todas" || campus !== "todos" || status !== "todos" || filtros.length > 0;

  return (
    <>
      <PageHead
        titulo="Vitrine"
        lead="Bens publicados pelas universidades federais de Minas Gerais e disponíveis para manifestação de interesse."
      />
      <Section bg={T.paper}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: 12, color: T.textFaint }} aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => aplicar({ q: e.target.value })}
              placeholder="Buscar por nome, número de patrimônio ou setor…"
              aria-label="Buscar bem"
              style={{ ...inputStyle, width: "100%", paddingLeft: 34 }}
            />
          </div>
          <select value={cat} onChange={(e) => aplicar({ categoria: e.target.value })} style={inputStyle} aria-label="Filtrar por categoria">
            <option value="todas">Todas as categorias</option>
            {Object.entries(CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={campus} onChange={(e) => aplicar({ campus: e.target.value })} style={inputStyle} aria-label="Filtrar por campus">
            <option value="todos">Todos os campi</option>
            {campi.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e) => aplicar({ status: e.target.value })} style={inputStyle} aria-label="Filtrar por status">
            <option value="todos">Todos os status</option>
            {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        {/* Filtros de tipo de bem — atribuídos no cadastro, múltiplos por bem */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textFaint, marginRight: 4 }}>
            Filtros
          </span>
          {Object.entries(FILTROS).map(([k, v]) => {
            const ativo = filtros.includes(k);
            if (contagem[k] === 0 && !ativo) return null;
            return (
              <button
                key={k}
                type="button"
                onClick={() => alternarFiltro(k)}
                aria-pressed={ativo}
                title={v.descricao}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px",
                  borderRadius: 20, cursor: "pointer", fontFamily: F.sans, fontSize: 13, fontWeight: 600,
                  border: `1px solid ${ativo ? T.brand : T.line}`,
                  background: ativo ? T.brand : "#fff",
                  color: ativo ? "#fff" : T.ink,
                }}
              >
                {v.label}
                <span style={{ fontSize: 11.5, opacity: 0.72, fontVariantNumeric: "tabular-nums" }}>
                  {contagem[k]}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap", marginBottom: 18 }} aria-live="polite">
          <span style={{ fontFamily: F.sans, fontSize: 13, color: T.textFaint }}>
            {filtrados.length} {filtrados.length === 1 ? "bem publicado" : "bens publicados"} na vitrine
            {filtros.length > 0 && ` · ${filtros.map(rotuloFiltro).join(" ou ")}`}
          </span>
          {comFiltro && (
            <button
              type="button"
              onClick={limpar}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: T.brand, textDecoration: "underline" }}
            >
              limpar tudo
            </button>
          )}
        </div>

        {filtrados.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {filtrados.map((b) => <BemCard key={b.id} bem={b} />)}
          </div>
        ) : (
          <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: 40, textAlign: "center" }}>
            <p style={{ fontFamily: F.sans, fontSize: 16, color: T.ink, margin: "0 0 18px" }}>
              {comFiltro
                ? "Nenhum bem corresponde a esses filtros."
                : "Ainda não há bens publicados. A vitrine é alimentada pelos setores de patrimônio da rede."}
            </p>
            {comFiltro && <Btn onClick={limpar} variant="secondary">Limpar filtros</Btn>}
          </div>
        )}
      </Section>
    </>
  );
}

/* ============================================================
   /vitrine/:id — detalhe do bem
   ============================================================ */

export function BemDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bem = bens.find((b) => b.id === id);

  if (!bem) {
    return (
      <Section bg={T.paper}>
        <H2>Bem não encontrado</H2>
        <Lead>O bem <code style={{ fontFamily: F.mono }}>{id}</code> não está publicado na vitrine.</Lead>
        <Btn to="/vitrine">Voltar à vitrine</Btn>
      </Section>
    );
  }

  const cat = CATS[bem.categoria];
  const st = STATUS[bem.status];
  const acao = {
    disponivel: { rotulo: "Entrar para manifestar interesse", ativo: true, nota: null },
    reservado: { rotulo: "Bem reservado", ativo: false, nota: "Já há manifestação de interesse em andamento para este bem." },
    transferido: { rotulo: "Ciclo concluído", ativo: false, nota: "Este bem já foi reaproveitado." },
  }[bem.status];

  return (
    <>
      <Section bg={T.paper} pad="28px 0 0">
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, background: "none",
            border: "none", cursor: "pointer", fontFamily: F.sans, fontSize: 14,
            color: T.textMuted, padding: 0,
          }}
        >
          <ArrowLeft size={15} aria-hidden="true" /> Voltar
        </button>
      </Section>

      <Section bg={T.paper} pad="24px 0 clamp(56px, 8vw, 96px)">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: "clamp(28px, 4vw, 52px)", alignItems: "start" }} className="cmg-hero-grid">
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 13, color: T.textMuted, marginBottom: 6 }}>{bem.id}</div>
            <h1 style={{ fontFamily: F.serif, fontWeight: 700, letterSpacing: "-1px", fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15, color: T.ink, margin: "0 0 16px" }}>
              {bem.nome}
            </h1>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
              <Pill color={cat.color} ink={cat.ink}>{cat.label}</Pill>
              <Pill color={st.color} ink={st.ink}>{st.label}</Pill>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: F.sans, fontSize: 15, color: T.ink, marginBottom: 24 }}>
              <MapPin size={15} aria-hidden="true" /> {bem.campus} — {bem.setor}
            </div>

            {filtrosDoBem(bem).length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textFaint, marginBottom: 10 }}>
                  Filtros
                </div>
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                  {filtrosDoBem(bem).map((f) => (
                    <Link
                      key={f}
                      to={`/vitrine?filtros=${f}`}
                      title={`Ver todos os bens em ${rotuloFiltro(f)}`}
                      style={{
                        fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: T.brand,
                        background: `${T.brand}0D`, border: `1px solid ${T.brand}33`,
                        borderRadius: 20, padding: "5px 12px", textDecoration: "none",
                      }}
                    >
                      {rotuloFiltro(f)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {bem.descricao && (
              <p style={{ fontFamily: F.sans, fontSize: 15.5, lineHeight: 1.7, color: T.ink, maxWidth: "62ch", margin: "0 0 18px" }}>
                {bem.descricao}
              </p>
            )}

            <p style={{ fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.7, color: T.textMuted, maxWidth: "62ch", margin: "0 0 12px" }}>
              Classificação atribuída pela comissão de avaliação local, conforme
              art. 3º do Decreto nº 12.785/2025. Bem publicado na vitrine
              institucional para manifestação de interesse por servidores e
              unidades cadastradas.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 13.5, lineHeight: 1.7, color: T.textFaint, maxWidth: "62ch" }}>
              <strong style={{ color: T.textMuted }}>{cat.label}:</strong> {cat.criterio}
            </p>

            <div style={{ marginTop: 34 }}>
              <div style={{ fontFamily: F.sans, fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".08em", color: T.textFaint, fontWeight: 600, marginBottom: 18 }}>
                Fluxo do bem
              </div>
              <div style={{ overflowX: "auto", background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: "24px 20px" }}>
                <div style={{ minWidth: 560 }}>
                  <Stepper step={bem.step} compact />
                </div>
              </div>
            </div>
          </div>

          <aside style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: 26, position: "sticky", top: 24 }}>
            {/* Sem foto do bem, exibe o selo da categoria ampliado — docs/07 §7.3 */}
            <div style={{ display: "flex", justifyContent: "center", padding: "18px 0 26px" }}>
              <Selo cat={bem.categoria} size={104} />
            </div>
            <div style={{ fontFamily: F.sans, fontSize: 13, color: T.textFaint, textAlign: "center", marginBottom: 22 }}>
              publicado há {bem.dias} {bem.dias === 1 ? "dia" : "dias"}
            </div>
            <BtnDestaque
              disabled={!acao.ativo}
              onClick={() => acao.ativo && navigate("/entrar")}
              style={{ width: "100%", whiteSpace: "normal" }}
            >
              {acao.rotulo}
            </BtnDestaque>
            {acao.nota && (
              <p style={{ fontFamily: F.sans, fontSize: 12.5, color: T.textFaint, margin: "12px 0 0", lineHeight: 1.55, textAlign: "center" }}>
                {acao.nota}
              </p>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   /como-funciona
   ============================================================ */

export function ComoFunciona() {
  const papeis = [
    { acao: "Ver a vitrine", p: [1, 1, 1, 1] },
    { acao: "Cadastrar bem", p: [1, 0, 0, 0] },
    { acao: "Confirmar/alterar classificação", p: [0, 1, 0, 0] },
    { acao: "Publicar na vitrine", p: [0, 1, 0, 0] },
    { acao: "Manifestar interesse", p: [1, 0, 1, 0] },
    { acao: "Aprovar transferência", p: [0, 1, 0, 0] },
    { acao: "Registrar reaproveitamento", p: [1, 0, 0, 0] },
    { acao: "Configurar regras de notificação", p: [1, 0, 1, 0] },
    { acao: "Ver painel consolidado", p: [1, 1, 0, 1] },
  ];
  const cols = ["Patrimônio", "Comissão", "Solicitante", "Consulta Pública"];

  return (
    <>
      <PageHead
        eyebrow="O fluxo"
        titulo="Como funciona"
        lead="Do cadastro do bem ao reaproveitamento: quem faz o quê, em que ordem e com qual fundamento."
      />

      <Section bg={T.paper}>
        <H2>As seis etapas</H2>
        <div style={{ overflowX: "auto", background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: "clamp(24px, 4vw, 40px)", marginBottom: 36 }}>
          <div style={{ minWidth: 620 }}><Stepper step={6} /></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, overflow: "hidden" }}>
          {etapas.map((e, i) => (
            <div
              key={e.n}
              style={{
                display: "grid",
                gridTemplateColumns: "48px minmax(0, 1fr) minmax(0, 220px)",
                gap: 20, padding: "20px 24px", alignItems: "start",
                borderTop: i === 0 ? "none" : `1px solid ${T.lineSoft}`,
              }}
              className="cmg-disp-row"
            >
              <div style={{
                width: 34, height: 34, borderRadius: "50%", background: T.forest, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: F.sans, fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>{e.n}</div>
              <div>
                <div style={{ fontFamily: F.serif, fontSize: 19, color: T.ink, marginBottom: 5 }}>{e.nome}</div>
                <p style={{ fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.6, color: T.textMuted, margin: 0 }}>{e.frase}</p>
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 13, color: T.textFaint, paddingTop: 3 }}>{e.quem}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="#fff">
        <H2>Regras de classificação</H2>
        <Lead>
          A classificação é a decisão mais importante do fluxo, porque determina
          o destino possível do bem. Os critérios são os do art. 3º do
          Decreto nº 12.785/2025.
        </Lead>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
          {Object.entries(CATS).map(([k, v]) => (
            <div key={k} style={{ border: `1px solid ${T.line}`, borderRadius: 6, padding: 22, display: "flex", flexDirection: "column", gap: 13 }}>
              <Selo cat={k} size={54} />
              <h3 style={{ fontFamily: F.serif, fontSize: 19, fontWeight: 700, letterSpacing: "-1px", color: v.color, margin: 0 }}>{v.label}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 14, lineHeight: 1.6, color: T.textMuted, margin: 0 }}>{v.criterio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg={T.paper}>
        <H2>Papéis e permissões</H2>
        <Lead>
          Quatro perfis, definidos a partir do rito que o decreto já estabelece.
        </Lead>
        <div style={{ overflowX: "auto", background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620, fontFamily: F.sans }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "13px 18px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textFaint, borderBottom: `1px solid ${T.line}` }}>Ação</th>
                {cols.map((c) => (
                  <th key={c} style={{ textAlign: "center", padding: "13px 12px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: T.textFaint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {papeis.map((r) => (
                <tr key={r.acao}>
                  <td style={{ padding: "12px 18px", fontSize: 14.5, color: T.ink, borderBottom: `1px solid ${T.lineSoft}` }}>{r.acao}</td>
                  {r.p.map((v, i) => (
                    <td key={i} style={{ textAlign: "center", padding: "12px", borderBottom: `1px solid ${T.lineSoft}`, color: v ? T.forest : T.line, fontWeight: 700 }}>
                      {v ? "✓" : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   /transparencia
   ============================================================ */

export function Transparencia() {
  const [campus, setCampus] = useState("todos");
  const campi = useMemo(() => [...new Set(bens.map((b) => b.campus))].sort(), []);
  const lista = campus === "todos" ? bens : bens.filter((b) => b.campus === campus);
  const ind = indicadores(lista);

  const donut = Object.entries(CATS)
    .map(([k, v]) => ({ name: v.label, value: lista.filter((b) => b.categoria === k).length, color: v.color }))
    .filter((d) => d.value > 0);

  const barras = campi.map((c) => ({
    campus: c.replace(" de ", " "),
    bens: lista.filter((b) => b.campus === c).length,
  }));

  const painel = { background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: 22 };

  return (
    <>
      <PageHead
        eyebrow="Dados abertos"
        titulo="Transparência"
        lead="Indicadores abertos da rede. Sem cadastro."
      />
      <Section bg={T.paper}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 28 }}>
          <label style={{ fontFamily: F.sans, fontSize: 13.5, color: T.textMuted }} htmlFor="f-campus">Campus</label>
          <select id="f-campus" value={campus} onChange={(e) => setCampus(e.target.value)} style={inputStyle}>
            <option value="todos">Todos os campi</option>
            {campi.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span style={{
            fontFamily: F.mono, fontSize: 11.5, color: T.institutionalBlue,
            background: `${T.institutionalBlue}12`, border: `1px solid ${T.institutionalBlue}33`,
            borderRadius: 20, padding: "5px 12px",
          }}>{origem.rotulo}</span>
        </div>

        {ind ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px, 5vw, 56px)", ...painel, padding: "clamp(24px, 4vw, 38px)", marginBottom: 20 }}>
              <Num valor={ind.total} rotulo="Bens cadastrados" />
              <Num valor={ind.disponiveis} rotulo="Disponíveis na vitrine" />
              <Num valor={ind.reaproveitados} rotulo="Reaproveitados" nota="ciclo concluído" />
              <Num valor={`${ind.tempoMedio}d`} rotulo="Tempo médio" nota="publicação → interesse" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 18 }} className="cmg-graf-grid">
              <div style={painel}>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 3 }}>Distribuição por categoria</div>
                <div style={{ fontFamily: F.sans, fontSize: 11.5, color: T.textFaint, marginBottom: 10 }}>art. 3º, Decreto nº 12.785/2025</div>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    <Pie data={donut} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
                      {donut.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 6 }}>
                  {donut.map((d) => (
                    <span key={d.name} style={{ fontFamily: F.sans, fontSize: 11.5, color: T.textMuted, display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />{d.name}
                    </span>
                  ))}
                </div>
              </div>

              <div style={painel}>
                <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 600, color: T.ink, marginBottom: 3 }}>Bens publicados por campus</div>
                <div style={{ fontFamily: F.sans, fontSize: 11.5, color: T.textFaint, marginBottom: 10 }}>indicador local — diferencial frente ao sistema nacional</div>
                <ResponsiveContainer width="100%" height={232}>
                  <BarChart data={barras} margin={{ left: -18 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.lineSoft} vertical={false} />
                    <XAxis dataKey="campus" tick={{ fontSize: 10.5, fill: T.textMuted }} interval={0} angle={-12} textAnchor="end" height={54} />
                    <YAxis tick={{ fontSize: 11, fill: T.textMuted }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="bens" fill={T.forest} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ ...painel, marginTop: 20, maxWidth: "78ch" }}>
              <div style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textFaint, marginBottom: 10 }}>
                Metodologia
              </div>
              <p style={{ fontFamily: F.sans, fontSize: 14, lineHeight: 1.7, color: T.textMuted, margin: 0 }}>
                <em>Tempo médio</em> considera os dias entre a publicação do bem na
                vitrine e a primeira manifestação de interesse.{" "}
                <em>Reaproveitados</em> contabiliza bens com transferência
                concluída. Dados apurados em {origem.apuracao}.
              </p>
            </div>
          </>
        ) : (
          <div style={{ ...painel, padding: 40, textAlign: "center" }}>
            <p style={{ fontFamily: F.sans, fontSize: 16, color: T.ink, margin: 0 }}>
              Ainda não há dados suficientes para calcular os indicadores.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}

/* ============================================================
   /para-sua-universidade
   ============================================================ */

export function ParaSuaUniversidade() {
  const [form, setForm] = useState({ nome: "", email: "", instituicao: "", cargo: "", mensagem: "" });
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const enviar = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.email.trim()) {
      setErro("Informe ao menos o nome e o e-mail institucional.");
      return;
    }
    setErro("");
    setEnviado(true);
  };

  const label = { fontFamily: F.sans, fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".06em", color: T.textFaint, fontWeight: 600, display: "block", marginBottom: 6 };
  const field = { ...inputStyle, width: "100%", fontSize: 14.5 };

  return (
    <>
      <PageHead
        eyebrow="Adesão"
        titulo="Entrar na rede não exige trocar de sistema."
        lead="O Circula·MG funciona ao lado do Siads e do rito que a sua comissão de avaliação já segue."
      />

      <Section bg={T.paper}>
        <H2>Os quatro passos</H2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 22, marginTop: 32 }}>
          {passosAdesao.map((p) => (
            <div key={p.n} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: 24 }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 600, color: T.forest, letterSpacing: ".06em", marginBottom: 12 }}>
                PASSO {p.n}
              </div>
              <h3 style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 700, letterSpacing: "-1px", color: T.ink, margin: "0 0 8px" }}>{p.titulo}</h3>
              <p style={{ fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.6, color: T.textMuted, margin: 0 }}>{p.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="#fff" id="contato">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(32px, 5vw, 64px)", alignItems: "start" }} className="cmg-hero-grid">
          <div>
            <H2>Falar com a equipe</H2>
            <Lead style={{ marginBottom: 20 }}>
              Conte em que ponto está a sua instituição. Retornamos pelo e-mail
              institucional informado.
            </Lead>
            <div style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, lineHeight: 1.8 }}>
              <strong style={{ color: T.ink }}>Requisitos para aderir</strong>
              <ul style={{ margin: "10px 0 0", paddingLeft: 20 }}>
                <li>Comissão de avaliação instituída, conforme o art. 19</li>
                <li>Setor de patrimônio com responsável designado</li>
                <li>Identidade institucional única (SSO) ou federação CAFe</li>
                <li>Uso do Siads como sistema de registro patrimonial</li>
              </ul>
            </div>
          </div>

          {enviado ? (
            <div style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 6, padding: 32 }}>
              <h3 style={{ fontFamily: F.serif, fontSize: 22, fontWeight: 700, letterSpacing: "-1px", color: T.ink, margin: "0 0 10px" }}>
                Mensagem enviada
              </h3>
              <p style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.65, color: T.textMuted, margin: 0 }}>
                Retornamos pelo e-mail institucional informado.
              </p>
            </div>
          ) : (
            <form onSubmit={enviar} style={{ display: "grid", gap: 16 }} noValidate>
              <div>
                <label style={label} htmlFor="c-nome">Nome completo</label>
                <input id="c-nome" style={field} value={form.nome} onChange={(e) => set("nome", e.target.value)} />
              </div>
              <div>
                <label style={label} htmlFor="c-email">E-mail institucional</label>
                <input id="c-email" type="email" style={field} value={form.email} onChange={(e) => set("email", e.target.value)} aria-describedby="c-email-ajuda" />
                <div id="c-email-ajuda" style={{ fontFamily: F.sans, fontSize: 12, color: T.textFaint, marginTop: 5 }}>
                  Use o e-mail da sua universidade
                </div>
              </div>
              <div>
                <label style={label} htmlFor="c-inst">Universidade</label>
                <select id="c-inst" style={field} value={form.instituicao} onChange={(e) => set("instituicao", e.target.value)}>
                  <option value="">Selecione</option>
                  {universidades.map((u) => <option key={u.sigla} value={u.sigla}>{u.sigla} — {u.nome}</option>)}
                </select>
              </div>
              <div>
                <label style={label} htmlFor="c-cargo">Cargo ou função</label>
                <input id="c-cargo" style={field} placeholder="Ex.: Chefe do Setor de Patrimônio" value={form.cargo} onChange={(e) => set("cargo", e.target.value)} />
              </div>
              <div>
                <label style={label} htmlFor="c-msg">Como podemos ajudar?</label>
                <textarea id="c-msg" style={{ ...field, minHeight: 96, resize: "vertical" }} placeholder="Conte em que ponto está a sua instituição" value={form.mensagem} onChange={(e) => set("mensagem", e.target.value)} />
              </div>
              {erro && (
                <p role="alert" style={{ fontFamily: F.sans, fontSize: 13.5, color: "#0B4C97", margin: 0 }}>{erro}</p>
              )}
              <Btn type="submit">Enviar mensagem</Btn>
              <p style={{ fontFamily: F.sans, fontSize: 12, color: T.textFaint, lineHeight: 1.6, margin: 0 }}>
                Os dados informados são usados apenas para responder a este
                contato, conforme a Lei nº 13.709/2018.
              </p>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   /base-normativa
   ============================================================ */

export function BaseNormativa() {
  const secoes = [
    {
      id: "mudou",
      titulo: "O que mudou em dezembro de 2025",
      corpo: [
        "Em 19 de dezembro de 2025 foi publicado o Decreto nº 12.785/2025, que dispõe sobre mecanismos de promoção da circularidade de bens móveis na administração pública federal direta, autárquica e fundacional.",
        "Ele revogou os Decretos nº 9.373/2018 e nº 10.340/2020 e alinhou o desfazimento de bens à Lei nº 14.133/2021 e à agenda de economia circular.",
      ],
    },
    {
      id: "categorias",
      titulo: "As cinco categorias (art. 3º)",
      corpo: [
        "Todo bem móvel deve ser enquadrado em uma das cinco categorias. A classificação determina o destino possível do bem e é a espinha dorsal do Circula·MG: organiza o cadastro, os filtros da vitrine, o painel e as regras de notificação.",
      ],
      lista: Object.entries(CATS).map(([k, v]) => `${v.label} — ${v.criterio}`),
    },
    {
      id: "comissao",
      titulo: "A comissão de avaliação (art. 19)",
      corpo: [
        "A classificação não é atribuição livre do setor de patrimônio. Deve ser atribuída por comissão instituída pela autoridade competente, com no mínimo três membros — servidores efetivos ou profissionais com conhecimento técnico certificado, na forma da Lei nº 14.133/2021.",
        "No Circula·MG, a comissão é um perfil de usuário com etapa própria no fluxo, e não uma formalidade externa ao sistema.",
      ],
    },
    {
      id: "divulgacao",
      titulo: "Divulgação e o sistema nacional (art. 20)",
      corpo: [
        "A divulgação dos bens se dá por sistema gerenciado pela Secretaria de Gestão e Inovação (Seges/MGI). O decreto prevê expressamente que, enquanto o sistema evolui, os procedimentos podem correr em processo administrativo.",
        "O Circula·MG não substitui essa divulgação: é uma camada local e complementar.",
      ],
    },
    {
      id: "doacao",
      titulo: "Doação e ordem de preferência (arts. 11 e 13)",
      corpo: [
        "A doação para fins de interesse social pode ter como destinatários Estados e Municípios, organizações da sociedade civil, organizações sociais, OSCIPs, fundações e empreendimentos de economia solidária.",
        "O art. 13, IV estabelece preferência para cooperativas de catadores de materiais recicláveis nos casos de bens antieconômicos ou irrecuperáveis.",
      ],
    },
    {
      id: "siads",
      titulo: "Relação com o Siads",
      corpo: [
        "O Siads — Sistema Integrado de Gestão Patrimonial — é obrigatório para o gerenciamento e controle do patrimônio da administração pública federal direta, autárquica e fundacional.",
        "Ele permanece como fonte de verdade patrimonial. O Circula·MG conversa com ele pelo número de patrimônio, para evitar dupla digitação.",
      ],
    },
  ];

  return (
    <>
      <PageHead
        eyebrow="Fundamento"
        titulo="Base normativa"
        lead="O Decreto nº 12.785/2025 e o que ele determina sobre classificação, comissão de avaliação, divulgação e doação de bens móveis."
      />
      <Section bg={T.paper}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 210px) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "start" }} className="cmg-doc-grid">
          <nav aria-label="Sumário" style={{ position: "sticky", top: 24 }}>
            <div style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.textFaint, marginBottom: 14 }}>
              Sumário
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {secoes.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, textDecoration: "none", lineHeight: 1.4, display: "block" }}>
                    {s.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article style={{ maxWidth: READ }}>
            {secoes.map((s) => (
              <section key={s.id} id={s.id} style={{ marginBottom: 44, scrollMarginTop: 24 }}>
                <h2 style={{ fontFamily: F.serif, fontWeight: 700, letterSpacing: "-1px", fontSize: 26, color: T.ink, margin: "0 0 14px", lineHeight: 1.25 }}>
                  {s.titulo}
                </h2>
                {s.corpo.map((p, i) => (
                  <p key={i} style={{ fontFamily: F.serif, fontSize: 17, lineHeight: 1.72, color: T.ink, margin: "0 0 16px" }}>{p}</p>
                ))}
                {s.lista && (
                  <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
                    {s.lista.map((l, i) => (
                      <li key={i} style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.65, color: T.textMuted, marginBottom: 8 }}>{l}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <Btn href="https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12785-19-dezembro-2025-798522-publicacaooriginal-177487-pe.html" variant="secondary">
              Texto oficial do decreto
            </Btn>
          </article>
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   /ajuda
   ============================================================ */

function FaqItem({ p, r }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, background: "none", border: "none", cursor: "pointer", padding: "18px 0",
          textAlign: "left", fontFamily: F.sans, fontSize: 16, fontWeight: 500, color: T.ink,
        }}
      >
        {p}
        <ChevronDown
          size={18}
          aria-hidden="true"
          style={{ flexShrink: 0, color: T.textFaint, transform: aberto ? "rotate(180deg)" : "none", transition: "transform .18s" }}
        />
      </button>
      {aberto && (
        <p style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.7, color: T.textMuted, margin: "0 0 20px", maxWidth: "68ch" }}>
          {r}
        </p>
      )}
    </div>
  );
}

export function Ajuda() {
  return (
    <>
      <PageHead
        eyebrow="Ajuda"
        titulo="Perguntas frequentes"
        lead="Dúvidas sobre classificação, relação com o Siads e o Doações gov.br, e como manifestar interesse em um bem."
      />
      <Section bg={T.paper}>
        <div style={{ maxWidth: 800 }}>
          {faq.map((g) => (
            <div key={g.grupo} style={{ marginBottom: 44 }}>
              <h2 style={{ fontFamily: F.sans, fontSize: 11.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: T.textFaint, margin: "0 0 8px" }}>
                {g.grupo}
              </h2>
              <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: "0 22px" }}>
                {g.itens.map((it) => <FaqItem key={it.p} {...it} />)}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ============================================================
   /casos
   ============================================================ */

export function Casos() {
  return (
    <>
      <PageHead
        eyebrow="Na prática"
        titulo="Casos de reaproveitamento"
        lead="Bens que saíram de um almoxarifado e voltaram a ser usados em outra unidade da rede."
      />
      <Section bg={T.paper}>
        {casos.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {casos.map((c) => (
              <article key={c.slug} style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: 24 }}>
                <h2 style={{ fontFamily: F.serif, fontSize: 21, fontWeight: 700, letterSpacing: "-1px", margin: "0 0 8px" }}>{c.bem}</h2>
                <p style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, margin: 0 }}>{c.origem} → {c.destino}</p>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, padding: 40, maxWidth: "68ch" }}>
            <p style={{ fontFamily: F.sans, fontSize: 16, lineHeight: 1.7, color: T.ink, margin: "0 0 12px" }}>
              Ainda não há casos publicados.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.7, color: T.textMuted, margin: 0 }}>
              Esta seção é alimentada com casos reais do piloto, com foto do bem
              feita pelo próprio setor de patrimônio e autorização de quem for
              citado. Não usamos exemplos fictícios.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}

/* ============================================================
   páginas obrigatórias
   ============================================================ */

export function Acessibilidade() {
  return (
    <>
      <PageHead
        eyebrow="Compromisso"
        titulo="Acessibilidade"
        lead="O Circula·MG busca conformidade com a WCAG 2.1 nível AA e com o eMAG."
      />
      <Section bg={T.paper}>
        <article style={{ maxWidth: READ }}>
          {[
            ["Medidas adotadas", "Navegação completa por teclado, foco visível em todos os controles interativos, hierarquia de títulos sem saltos, textos alternativos em imagens informativas, contraste mínimo de 4,5:1 em texto e respeito à preferência de movimento reduzido do sistema."],
            ["Contraste de cor", "As cinco cores de categoria do art. 3º são usadas em selos e etiquetas com borda e texto na própria cor sobre fundo claro, e não como fundo com texto branco — arranjo que garante o contraste exigido."],
            ["Limitações conhecidas", "Os gráficos do painel de transparência dependem de leitura visual; os mesmos dados estão disponíveis em formato tabular. Estamos ampliando a cobertura de descrição textual."],
            ["Contato", "Encontrou uma barreira de acesso? Escreva para a equipe pelo formulário em “Para sua universidade”. Retornamos com prazo de correção."],
          ].map(([t, p]) => (
            <section key={t} style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: F.serif, fontWeight: 700, letterSpacing: "-1px", fontSize: 24, color: T.ink, margin: "0 0 12px" }}>{t}</h2>
              <p style={{ fontFamily: F.serif, fontSize: 17, lineHeight: 1.72, color: T.ink, margin: 0 }}>{p}</p>
            </section>
          ))}
        </article>
      </Section>
    </>
  );
}

export function Privacidade() {
  return (
    <>
      <PageHead
        eyebrow="LGPD"
        titulo="Política de Privacidade"
        lead="Como o Circula·MG trata dados pessoais, conforme a Lei nº 13.709/2018."
      />
      <Section bg={T.paper}>
        <article style={{ maxWidth: READ }}>
          {[
            ["Dados tratados", "Nome institucional, e-mail funcional e lotação (campus e setor) dos servidores que usam o sistema. A vitrine pública e os indicadores não expõem dados pessoais."],
            ["Base legal", "Execução de política pública pela administração pública, nos termos do art. 7º, III da Lei nº 13.709/2018."],
            ["Finalidade", "Identificar o responsável por cada ato no fluxo do bem — cadastro, classificação, manifestação de interesse e aprovação — e enviar notificações de bens compatíveis com o interesse declarado."],
            ["Compartilhamento", "Os dados não são compartilhados com terceiros. A integração com sistemas oficiais (Siads e Doações gov.br) transmite dados do bem, não do usuário."],
            ["Direitos do titular", "Confirmação de tratamento, acesso, correção e informação sobre compartilhamento podem ser solicitados pelo canal de contato institucional."],
          ].map(([t, p]) => (
            <section key={t} style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: F.serif, fontWeight: 700, letterSpacing: "-1px", fontSize: 24, color: T.ink, margin: "0 0 12px" }}>{t}</h2>
              <p style={{ fontFamily: F.serif, fontSize: 17, lineHeight: 1.72, color: T.ink, margin: 0 }}>{p}</p>
            </section>
          ))}
        </article>
      </Section>
    </>
  );
}

export function NaoEncontrada() {
  return (
    <Section bg={T.paper} pad="clamp(72px, 12vw, 140px) 0">
      <div style={{ fontFamily: F.mono, fontSize: 13, color: T.textFaint, marginBottom: 12 }}>ERRO 404</div>
      <h1
        style={{
          fontFamily: F.serif, fontWeight: 700, letterSpacing: "-1px", fontSize: "clamp(28px, 4vw, 44px)",
          lineHeight: 1.15, color: T.ink, margin: "0 0 16px", textWrap: "balance", maxWidth: "18ch",
        }}
      >
        Esta página não existe.
      </h1>
      <Lead>O endereço pode ter mudado ou o bem já saiu da vitrine.</Lead>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Btn to="/">Ir para a página inicial</Btn>
        <Btn to="/vitrine" variant="secondary">Ver a vitrine</Btn>
      </div>
    </Section>
  );
}
