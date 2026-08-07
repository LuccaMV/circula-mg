import React, { useState, useMemo } from "react";
import {
  Search, Bell, LayoutGrid, ClipboardPlus, BarChart3, MapPin,
  Package, CheckCircle2, Clock, X, Stamp, ChevronRight, Building2,
  TrendingUp, Users, Filter
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from "recharts";

/* ============ TOKENS ============
Paper   #F1F1EA   Ink     #17211C   Forest  #2F5D50  (primário / circularidade)
Blue    #2B4570   (institucional federal)   Line    #DBD8CB
Categorias do Decreto 12.785/2025:
  regular        #5C7A99
  ocioso         #C6862B
  recuperavel    #3E8E7E
  antieconomico  #A8623F
  irrecuperavel  #7A4438
================================== */

const CATS = {
  regular:       { label: "Uso regular",   color: "#5C7A99" },
  ocioso:        { label: "Ocioso",        color: "#C6862B" },
  recuperavel:   { label: "Recuperável",   color: "#3E8E7E" },
  antieconomico: { label: "Antieconômico", color: "#A8623F" },
  irrecuperavel: { label: "Irrecuperável", color: "#7A4438" },
};

const CAMPI = ["Alfenas", "Poços de Caldas", "Varginha", "Santa Rita do Sapucaí"];

const STATUS = {
  disponivel: { label: "Disponível", color: "#3E8E7E" },
  reservado:  { label: "Reservado",  color: "#C6862B" },
  transferido:{ label: "Transferido", color: "#5C7A99" },
};

const STEPS = ["Cadastrado", "Classificado", "Publicado", "Interesse", "Aprovado", "Reaproveitado"];

const SEED = [
  { id: "PAT-004821", nome: "Armário de aço 2 portas", campus: "Alfenas", categoria: "ocioso", status: "disponivel", setor: "Almoxarifado Central", dias: 4, step: 2 },
  { id: "PAT-004902", nome: "Cadeira giratória estofada", campus: "Poços de Caldas", categoria: "ocioso", status: "reservado", setor: "Secretaria Acadêmica", dias: 9, step: 3 },
  { id: "PAT-003310", nome: "Mesa de reunião 6 lugares", campus: "Varginha", categoria: "recuperavel", status: "disponivel", setor: "Coordenação de Curso", dias: 2, step: 2 },
  { id: "PAT-005117", nome: "Projetor multimídia", campus: "Alfenas", categoria: "recuperavel", status: "disponivel", setor: "Núcleo de Tecnologia", dias: 12, step: 2 },
  { id: "PAT-002204", nome: "Estante de aço 5 prateleiras", campus: "Santa Rita do Sapucaí", categoria: "regular", status: "disponivel", setor: "Biblioteca", dias: 1, step: 1 },
  { id: "PAT-004450", nome: "Ar-condicionado split 12k", campus: "Poços de Caldas", categoria: "antieconomico", status: "transferido", setor: "Laboratório 3", dias: 21, step: 6 },
  { id: "PAT-001987", nome: "Bebedouro industrial", campus: "Varginha", categoria: "irrecuperavel", status: "disponivel", setor: "Refeitório", dias: 6, step: 3 },
  { id: "PAT-005320", nome: "Computador desktop completo", campus: "Alfenas", categoria: "ocioso", status: "disponivel", setor: "Sala de Informática", dias: 3, step: 2 },
  { id: "PAT-002991", nome: "Balcão de atendimento", campus: "Santa Rita do Sapucaí", categoria: "recuperavel", status: "reservado", setor: "Protocolo", dias: 15, step: 4 },
  { id: "PAT-004603", nome: "Quadro branco 2,00 x 1,20 m", campus: "Alfenas", categoria: "regular", status: "disponivel", setor: "Sala 214", dias: 5, step: 2 },
];

const NOTIFS = [
  { bem: "Cadeira giratória estofada", campus: "Poços de Caldas", cat: "ocioso", setor: "Almoxarifado", t: "há 8 min" },
  { bem: "Projetor multimídia", campus: "Alfenas", cat: "recuperavel", setor: "Núcleo de Tecnologia", t: "há 1 h" },
  { bem: "Balcão de atendimento", campus: "Santa Rita do Sapucaí", cat: "recuperavel", setor: "Protocolo", t: "ontem" },
  { bem: "Bebedouro industrial", campus: "Varginha", cat: "irrecuperavel", setor: "Refeitório", t: "ontem" },
];

function Stamp_({ cat, size = 58 }) {
  const c = CATS[cat];
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        border: `2px solid ${c.color}`, display: "flex", alignItems: "center",
        justifyContent: "center", transform: "rotate(-8deg)", flexShrink: 0,
        position: "relative", background: "#fff",
      }}
    >
      <div style={{
        position: "absolute", inset: 3, borderRadius: "50%",
        border: `1px dashed ${c.color}88`,
      }} />
      <Stamp size={18} color={c.color} strokeWidth={1.6} />
    </div>
  );
}

function Pill({ color, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5,
      fontFamily: "'IBM Plex Mono', monospace", letterSpacing: ".02em",
      color, border: `1px solid ${color}55`, background: `${color}14`,
      borderRadius: 20, padding: "3px 9px", fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {children}
    </span>
  );
}

function Card({ bem, onOpen }) {
  const cat = CATS[bem.categoria];
  const st = STATUS[bem.status];
  return (
    <div onClick={() => onOpen(bem)} style={{
      background: "#fff", border: "1px solid #DBD8CB", borderRadius: 4,
      padding: 18, cursor: "pointer", transition: "box-shadow .15s, transform .15s",
      display: "flex", flexDirection: "column", gap: 12,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 20px -10px rgba(23,33,28,.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#5B5F55", marginBottom: 4 }}>{bem.id}</div>
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 17, color: "#17211C", lineHeight: 1.25 }}>{bem.nome}</div>
        </div>
        <Stamp_ cat={bem.categoria} />
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Pill color={cat.color}>{cat.label}</Pill>
        <Pill color={st.color}>{st.label}</Pill>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#5B5F55" }}>
        <MapPin size={13} /> {bem.campus} · {bem.setor}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4, paddingTop: 12, borderTop: "1px solid #ECE9DE" }}>
        <span style={{ fontSize: 11.5, color: "#8A8D80" }}>publicado há {bem.dias} {bem.dias === 1 ? "dia" : "dias"}</span>
        <span style={{ fontSize: 12.5, color: "#2F5D50", fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
          ver detalhes <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
}

function Stepper({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "18px 0 6px" }}>
      {STEPS.map((s, i) => {
        const done = i + 1 <= step;
        return (
          <React.Fragment key={s}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 64 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? "#2F5D50" : "#fff", border: `2px solid ${done ? "#2F5D50" : "#DBD8CB"}`,
                color: done ? "#fff" : "#9A9D90", fontSize: 11, fontWeight: 700,
              }}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 10.5, color: done ? "#17211C" : "#9A9D90", textAlign: "center", fontWeight: done ? 600 : 400 }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: i + 1 < step ? "#2F5D50" : "#DBD8CB", marginBottom: 18 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Modal({ bem, onClose, onInteresse }) {
  if (!bem) return null;
  const cat = CATS[bem.categoria];
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(23,33,28,.45)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", maxWidth: 560, width: "100%", borderRadius: 4, padding: 28,
        maxHeight: "88vh", overflowY: "auto", border: "1px solid #DBD8CB",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#5B5F55" }}>{bem.id}</div>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 24, margin: "4px 0 8px", color: "#17211C" }}>{bem.nome}</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5B5F55" }}><X size={20} /></button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          <Pill color={cat.color}>{cat.label}</Pill>
          <Pill color={STATUS[bem.status].color}>{STATUS[bem.status].label}</Pill>
        </div>
        <div style={{ fontSize: 13.5, color: "#3C4038", lineHeight: 1.6, marginBottom: 4 }}>
          <MapPin size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{bem.campus} — {bem.setor}
        </div>
        <p style={{ fontSize: 13, color: "#5B5F55", marginTop: 10, lineHeight: 1.6 }}>
          Classificação atribuída pela comissão de avaliação local, conforme art. 3º do Decreto nº 12.785/2025.
          Bem publicado na vitrine institucional para manifestação de interesse por servidores e unidades cadastradas.
        </p>
        <div style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".06em", color: "#8A8D80", marginTop: 22, fontWeight: 600 }}>Fluxo do bem</div>
        <Stepper step={bem.step} />
        <button onClick={() => onInteresse(bem)} style={{
          marginTop: 14, width: "100%", background: "#2F5D50", color: "#fff", border: "none",
          padding: "12px 18px", borderRadius: 3, fontSize: 14, fontWeight: 600, cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
        }}>Manifestar interesse neste bem</button>
      </div>
    </div>
  );
}

function Toast({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
      background: "#17211C", color: "#F1F1EA", padding: "12px 20px", borderRadius: 4,
      fontSize: 13.5, display: "flex", alignItems: "center", gap: 10, zIndex: 60,
      boxShadow: "0 10px 30px -8px rgba(0,0,0,.4)",
    }}>
      <CheckCircle2 size={16} color="#7FC4A8" /> {msg}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#9A9D90", cursor: "pointer", marginLeft: 6 }}><X size={14} /></button>
    </div>
  );
}

function Vitrine({ bens, onOpen }) {
  const [q, setQ] = useState("");
  const [catF, setCatF] = useState("todas");
  const [campusF, setCampusF] = useState("todos");

  const filtered = useMemo(() => bens.filter(b =>
    b.nome.toLowerCase().includes(q.toLowerCase()) &&
    (catF === "todas" || b.categoria === catF) &&
    (campusF === "todos" || b.campus === campusF)
  ), [bens, q, catF, campusF]);

  const selStyle = { border: "1px solid #DBD8CB", borderRadius: 3, padding: "9px 12px", fontSize: 13, background: "#fff", color: "#17211C", fontFamily: "'Inter', sans-serif" };

  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <Search size={15} style={{ position: "absolute", left: 12, top: 11, color: "#8A8D80" }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar bem…"
            style={{ ...selStyle, width: "100%", paddingLeft: 34, boxSizing: "border-box" }} />
        </div>
        <select value={catF} onChange={e => setCatF(e.target.value)} style={selStyle}>
          <option value="todas">Todas as categorias</option>
          {Object.entries(CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select value={campusF} onChange={e => setCampusF(e.target.value)} style={selStyle}>
          <option value="todos">Todos os campi</option>
          {CAMPI.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div style={{ fontSize: 12.5, color: "#8A8D80", marginBottom: 14 }}>{filtered.length} bem(ns) publicados na vitrine</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14 }}>
        {filtered.map(b => <Card key={b.id} bem={b} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

function Cadastro({ onSubmit }) {
  const [form, setForm] = useState({ nome: "", campus: CAMPI[0], setor: "", categoria: "ocioso", descricao: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width: "100%", border: "1px solid #DBD8CB", borderRadius: 3, padding: "10px 12px", fontSize: 13.5, boxSizing: "border-box", fontFamily: "'Inter', sans-serif", color: "#17211C" };
  const labelStyle = { fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".05em", color: "#8A8D80", fontWeight: 600, display: "block", marginBottom: 6 };

  return (
    <div style={{ maxWidth: 620 }}>
      <p style={{ fontSize: 13, color: "#5B5F55", marginBottom: 22, lineHeight: 1.6 }}>
        O cadastro segue para a comissão de avaliação do campus, responsável por confirmar a classificação
        prevista no art. 3º do Decreto nº 12.785/2025 antes da publicação na vitrine.
      </p>
      <div style={{ display: "grid", gap: 16 }}>
        <div>
          <label style={labelStyle}>Nome do bem</label>
          <input style={inputStyle} value={form.nome} onChange={e => set("nome", e.target.value)} placeholder="Ex.: Armário de aço 2 portas" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Campus</label>
            <select style={inputStyle} value={form.campus} onChange={e => set("campus", e.target.value)}>
              {CAMPI.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Setor / unidade</label>
            <input style={inputStyle} value={form.setor} onChange={e => set("setor", e.target.value)} placeholder="Ex.: Biblioteca" />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Classificação proposta (Decreto nº 12.785/2025, art. 3º)</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(CATS).map(([k, v]) => (
              <button key={k} onClick={() => set("categoria", k)} type="button" style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 20,
                border: `1.5px solid ${v.color}`, background: form.categoria === k ? v.color : "#fff",
                color: form.categoria === k ? "#fff" : v.color, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: form.categoria === k ? "#fff" : v.color }} />
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>Descrição e estado de conservação</label>
          <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={form.descricao} onChange={e => set("descricao", e.target.value)} placeholder="Descreva o bem, dimensões e estado de conservação" />
        </div>
        <button onClick={() => { if (form.nome.trim()) { onSubmit(form); setForm({ nome: "", campus: CAMPI[0], setor: "", categoria: "ocioso", descricao: "" }); } }}
          style={{
            background: "#17211C", color: "#F1F1EA", border: "none", padding: "12px 18px",
            borderRadius: 3, fontSize: 14, fontWeight: 600, cursor: "pointer", justifySelf: "start",
            display: "flex", alignItems: "center", gap: 8,
          }}>
          <ClipboardPlus size={16} /> Enviar à comissão de avaliação
        </button>
      </div>
    </div>
  );
}

function KPI({ label, value, icon: Icon, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #DBD8CB", borderRadius: 4, padding: "16px 18px", flex: 1, minWidth: 150 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", color: "#8A8D80", fontWeight: 600 }}>{label}</span>
        <Icon size={15} color="#2F5D50" />
      </div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 30, color: "#17211C", marginTop: 6 }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, color: "#8A8D80", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Painel({ bens }) {
  const total = bens.length;
  const disponiveis = bens.filter(b => b.status === "disponivel").length;
  const reaproveitados = bens.filter(b => b.status === "transferido").length;
  const tempoMedio = Math.round(bens.reduce((a, b) => a + b.dias, 0) / total);

  const donutData = Object.entries(CATS).map(([k, v]) => ({
    name: v.label, value: bens.filter(b => b.categoria === k).length, color: v.color,
  })).filter(d => d.value > 0);

  const barData = CAMPI.map(c => ({
    campus: c.replace(" de ", " "), bens: bens.filter(b => b.campus === c).length,
  }));

  return (
    <div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <KPI label="Bens cadastrados" value={total} icon={Package} sub="rede de 4 campi" />
        <KPI label="Disponíveis na vitrine" value={disponiveis} icon={LayoutGrid} />
        <KPI label="Reaproveitados" value={reaproveitados} icon={CheckCircle2} sub="ciclo concluído" />
        <KPI label="Tempo médio" value={`${tempoMedio}d`} icon={Clock} sub="publicação → interesse" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 16 }}>
        <div style={{ background: "#fff", border: "1px solid #DBD8CB", borderRadius: 4, padding: 18 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#17211C", marginBottom: 4 }}>Distribuição por categoria</div>
          <div style={{ fontSize: 11, color: "#8A8D80", marginBottom: 8 }}>art. 3º, Decreto nº 12.785/2025</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={donutData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {donutData.map(d => (
              <span key={d.name} style={{ fontSize: 11, color: "#5B5F55", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: d.color }} />{d.name}
              </span>
            ))}
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #DBD8CB", borderRadius: 4, padding: 18 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#17211C", marginBottom: 4 }}>Bens publicados por campus</div>
          <div style={{ fontSize: 11, color: "#8A8D80", marginBottom: 8 }}>indicador local — diferencial frente ao sistema nacional</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ECE9DE" vertical={false} />
              <XAxis dataKey="campus" tick={{ fontSize: 10.5, fill: "#5B5F55" }} interval={0} angle={-12} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11, fill: "#5B5F55" }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="bens" fill="#2F5D50" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Notificacoes() {
  return (
    <div style={{ maxWidth: 640 }}>
      <p style={{ fontSize: 13, color: "#5B5F55", marginBottom: 20, lineHeight: 1.6 }}>
        Notificação automática por categoria de bem e campus — enviada a servidores e unidades
        pré-cadastradas com interesse declarado naquela combinação, sem depender de busca manual no catálogo.
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {NOTIFS.map((n, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #DBD8CB", borderRadius: 4, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${CATS[n.cat].color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Bell size={14} color={CATS[n.cat].color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, color: "#17211C" }}>
                Novo bem <strong>{n.bem}</strong> classificado como <strong>{CATS[n.cat].label}</strong> em {n.campus}
              </div>
              <div style={{ fontSize: 11.5, color: "#8A8D80", marginTop: 3 }}>compatível com {n.setor} · {n.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CirculaMG() {
  const [tab, setTab] = useState("vitrine");
  const [bens, setBens] = useState(SEED);
  const [openBem, setOpenBem] = useState(null);
  const [toast, setToast] = useState(null);

  const tabs = [
    { id: "vitrine", label: "Vitrine", icon: LayoutGrid },
    { id: "cadastro", label: "Cadastrar bem", icon: ClipboardPlus },
    { id: "painel", label: "Painel", icon: BarChart3 },
    { id: "notif", label: "Notificações", icon: Bell },
  ];

  const handleCadastro = (form) => {
    const novo = {
      id: `PAT-${Math.floor(100000 + Math.random() * 899999)}`,
      nome: form.nome, campus: form.campus, categoria: form.categoria,
      status: "disponivel", setor: form.setor || "—", dias: 0, step: 1,
    };
    setBens(b => [novo, ...b]);
    setToast(`"${form.nome}" enviado à comissão de avaliação de ${form.campus}.`);
    setTab("vitrine");
    setTimeout(() => setToast(null), 3800);
  };

  const handleInteresse = (bem) => {
    setToast(`Interesse registrado em "${bem.nome}". A unidade solicitante será notificada.`);
    setOpenBem(null);
    setTimeout(() => setToast(null), 3800);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F1F1EA", minHeight: "100%", color: "#17211C" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        select:focus, input:focus, textarea:focus { outline: 2px solid #2F5D5055; }
        button:focus-visible { outline: 2px solid #2F5D50; outline-offset: 2px; }
      `}</style>

      <header style={{ borderBottom: "1px solid #DBD8CB", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid #2F5D50", display: "flex", alignItems: "center", justifyContent: "center", transform: "rotate(-8deg)" }}>
              <Stamp size={16} color="#2F5D50" />
            </div>
            <div>
              <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, lineHeight: 1 }}>Circula·MG</div>
              <div style={{ fontSize: 10.5, color: "#8A8D80", letterSpacing: ".03em" }}>REDE DE REAPROVEITAMENTO — UNIVERSIDADES FEDERAIS DE MG</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#5B5F55" }}>
            <Building2 size={14} /> UNIFAL-MG · Piloto institucional
          </div>
        </div>
        <nav style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px", display: "flex", gap: 4 }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", background: "none",
                border: "none", borderBottom: active ? "2px solid #2F5D50" : "2px solid transparent",
                color: active ? "#17211C" : "#8A8D80", fontWeight: active ? 600 : 500, fontSize: 13,
                cursor: "pointer", marginBottom: -1,
              }}>
                <Icon size={14} /> {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "26px 24px 60px" }}>
        {tab === "vitrine" && <Vitrine bens={bens} onOpen={setOpenBem} />}
        {tab === "cadastro" && <Cadastro onSubmit={handleCadastro} />}
        {tab === "painel" && <Painel bens={bens} />}
        {tab === "notif" && <Notificacoes />}
      </main>

      <Modal bem={openBem} onClose={() => setOpenBem(null)} onInteresse={handleInteresse} />
      <Toast msg={toast} onClose={() => setToast(null)} />
    </div>
  );
}
