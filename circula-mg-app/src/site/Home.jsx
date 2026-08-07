/* ============================================================
   Home — 16 seções, na ordem definida em
   docs/06-estrutura-do-site.md §6.6 e docs/07-conteudo-do-site.md §7.2
   ============================================================ */

import React from "react";
import { Link } from "react-router-dom";
import { Bell, CheckCircle2, BarChart3, Recycle, TrendingDown, Users, ArrowRight } from "lucide-react";
import { T, F, CATS, MAX } from "./tokens.js";
import {
  Section, Wrap, Eyebrow, H2, Lead, Btn, BtnDestaque, Selo, BemCard, Stepper, Num,
} from "./ui.jsx";
import {
  bens, origem, indicadores, casos, universidades, etapas, comparacao,
  dispositivos, perfis, sistemas,
} from "./data.js";

export default function Home() {
  const ind = indicadores();
  const vitrinePreview = bens.filter((b) => b.status !== "transferido").slice(0, 8);

  return (
    <>
      {/* ---------- 2 · HERO ---------- */}
      <section style={{ background: "#fff", borderBottom: `1px solid ${T.line}` }}>
        <Wrap style={{ padding: "clamp(56px, 8vw, 104px) 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, .85fr)",
              gap: "clamp(32px, 5vw, 64px)",
              alignItems: "center",
            }}
            className="cmg-hero-grid"
          >
            <div>
              <h1
                style={{
                  fontFamily: F.serif,
                  fontWeight: 700, letterSpacing: "-1px",
                  fontSize: "clamp(36px, 6vw, 62px)",
                  lineHeight: 1.08,
                  color: T.ink,
                  margin: "0 0 22px",
                  textWrap: "balance",
                  maxWidth: "15ch",
                }}
              >
                O que sobra em um campus falta no outro.
              </h1>
              <p
                style={{
                  fontFamily: F.sans,
                  fontSize: "clamp(16px, 1.6vw, 19px)",
                  lineHeight: 1.6,
                  color: T.textMuted,
                  maxWidth: "50ch",
                  margin: "0 0 32px",
                }}
              >
                Rede de reaproveitamento de bens móveis das universidades
                federais de Minas Gerais. Um bem ocioso em Alfenas pode ser
                exatamente o que Varginha precisa — e agora os dois ficam
                sabendo.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
                <BtnDestaque to="/vitrine">Ver a vitrine</BtnDestaque>
                <Btn to="/como-funciona" variant="secondary">Como funciona</Btn>
              </div>
              <p
                style={{
                  fontFamily: F.sans,
                  fontSize: 13,
                  color: T.textFaint,
                  marginTop: 28,
                  paddingTop: 20,
                  borderTop: `1px solid ${T.lineSoft}`,
                  maxWidth: "50ch",
                }}
              >
                Alinhado ao Decreto nº 12.785/2025 · Piloto institucional na UNIFAL-MG
              </p>
            </div>

            {/* Mídia do hero — composição gráfica dos 5 selos (docs/07 §7.2,
                opção 2). Não usamos foto de banco de imagens (docs/07 §7.6). */}
            <div
              aria-hidden="true"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(12px, 2vw, 24px)",
                placeItems: "center",
                background: T.paper,
                borderRadius: 6,
                padding: "clamp(24px, 4vw, 44px)",
                border: `1px solid ${T.line}`,
              }}
            >
              {Object.keys(CATS).map((k, i) => (
                <div
                  key={k}
                  style={{
                    transform: `rotate(${[-12, 6, -4, 8, -9][i]}deg)`,
                    gridColumn: i === 3 ? "1 / span 1" : undefined,
                  }}
                >
                  <Selo cat={k} size={72} />
                </div>
              ))}
              <div
                style={{
                  fontFamily: F.mono,
                  fontSize: 10.5,
                  color: T.textFaint,
                  letterSpacing: ".04em",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                ART. 3º
                <br />
                DEC. 12.785
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------- 3 · O PROBLEMA ---------- */}
      <Section bg={T.paper}>
        <Eyebrow>O problema</Eyebrow>
        <H2 style={{ maxWidth: "16ch" }}>Ninguém sabe o que o outro tem.</H2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(22px, 3vw, 36px)",
            maxWidth: "56ch",
            margin: "36px 0 0",
          }}
        >
          {[
            "Um armário de aço em condições de uso, parado há oito meses no almoxarifado de Alfenas.",
            "Um processo de compra aberto em Varginha para adquirir um armário de aço.",
            "Nenhum dos dois setores sabe da existência do outro.",
          ].map((frase, i) => (
            <p
              key={i}
              style={{
                fontFamily: F.serif,
                fontSize: "clamp(19px, 2.3vw, 25px)",
                lineHeight: 1.45,
                color: T.ink,
                margin: 0,
                paddingLeft: 20,
                borderLeft: `2px solid ${i === 2 ? T.forest : T.line}`,
              }}
            >
              {frase}
            </p>
          ))}
        </div>
        <p
          style={{
            fontFamily: F.sans,
            fontSize: 16,
            lineHeight: 1.7,
            color: T.textMuted,
            maxWidth: "58ch",
            marginTop: 40,
          }}
        >
          O catálogo nacional existe e funciona. Mas depende de alguém suspeitar
          que o bem está lá e ir procurar — e é aí que a circulação para.
        </p>
      </Section>

      {/* ---------- 4 · OS TRÊS DIFERENCIAIS ---------- */}
      <Section bg="#fff">
        <Eyebrow>O que muda</Eyebrow>
        <H2>Três coisas que a busca manual não resolve.</H2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
            marginTop: 44,
          }}
        >
          {[
            {
              Icon: Bell,
              titulo: "Você é avisado",
              texto:
                "Declare uma vez a categoria e o campus que interessam ao seu setor. Quando um bem compatível for publicado, o aviso chega até você — sem depender de consultar catálogo.",
            },
            {
              Icon: CheckCircle2,
              titulo: "A comissão dentro do fluxo",
              texto:
                "A classificação exigida pelo art. 19 acontece dentro do sistema, com justificativa registrada. O rito deixa de correr em paralelo ao processo.",
            },
            {
              Icon: BarChart3,
              titulo: "Indicadores do seu campus",
              texto:
                "Quanto tempo um bem leva para circular e onde a ociosidade está concentrada — recortes que a visão nacional agregada não entrega.",
            },
          ].map(({ Icon, titulo, texto }) => (
            <div key={titulo} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Icon size={26} color={T.forest} strokeWidth={1.6} aria-hidden="true" />
              <h3
                style={{
                  fontFamily: F.serif,
                  fontSize: 22,
                  fontWeight: 700, letterSpacing: "-1px",
                  color: T.ink,
                  margin: 0,
                  lineHeight: 1.25,
                }}
              >
                {titulo}
              </h3>
              <p style={{ fontFamily: F.sans, fontSize: 15.5, lineHeight: 1.65, color: T.textMuted, margin: 0 }}>
                {texto}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 5 · A REDE EM NÚMEROS ----------
          Renderiza apenas se houver dado apurado (docs/07 §7.2, seção 5). */}
      {ind && (
        <Section bg={T.paper}>
          <Eyebrow>A rede hoje</Eyebrow>
          <H2>Números da rede</H2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: F.mono,
              fontSize: 11.5,
              letterSpacing: ".04em",
              color: T.institutionalBlue,
              background: `${T.institutionalBlue}12`,
              border: `1px solid ${T.institutionalBlue}33`,
              borderRadius: 20,
              padding: "5px 12px",
              marginBottom: 36,
            }}
          >
            {origem.rotulo}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(28px, 5vw, 64px)",
              background: "#fff",
              border: `1px solid ${T.line}`,
              borderRadius: 6,
              padding: "clamp(28px, 4vw, 44px)",
            }}
          >
            <Num valor={ind.total} rotulo="bens cadastrados" />
            <Num valor={ind.reaproveitados} rotulo="reaproveitados" nota="ciclo concluído" />
            <Num valor={`${ind.tempoMedio} dias`} rotulo="tempo médio" nota="publicação → interesse" />
            <Num valor={ind.campi} rotulo="campi na rede" />
          </div>
          <p style={{ fontFamily: F.sans, fontSize: 12.5, color: T.textFaint, marginTop: 18 }}>
            Dados apurados em {origem.apuracao}. Período: {origem.periodo}.{" "}
            <Link to="/transparencia" style={{ color: T.forest, fontWeight: 600 }}>
              Ver todos os indicadores →
            </Link>
          </p>
        </Section>
      )}

      {/* ---------- 6 · VITRINE AO VIVO ---------- */}
      <Section bg="#fff">
        <Eyebrow>Veja funcionando</Eyebrow>
        <H2>A vitrine, agora, com bens reais.</H2>
        <Lead>
          Filtre por categoria e por campus. É a mesma vitrine que os setores de
          patrimônio usam todos os dias.
        </Lead>
        {vitrinePreview.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 16,
              }}
            >
              {vitrinePreview.map((b) => (
                <BemCard key={b.id} bem={b} />
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <Btn to="/vitrine">
                Ver a vitrine completa <ArrowRight size={15} aria-hidden="true" />
              </Btn>
            </div>
          </>
        ) : (
          <p style={{ fontFamily: F.sans, color: T.textMuted }}>
            Nenhum bem publicado no momento. A vitrine é alimentada pelos setores
            de patrimônio da rede.
          </p>
        )}
      </Section>

      {/* ---------- 7 · COMO FUNCIONA ---------- */}
      <Section bg={T.paper}>
        <Eyebrow>O fluxo</Eyebrow>
        <H2>Do almoxarifado à sala que precisa dele.</H2>
        <Lead>
          Todo bem percorre seis etapas. Cada uma tem um responsável definido, e
          o estado do bem é visível a qualquer momento.
        </Lead>
        <div
          style={{
            background: "#fff",
            border: `1px solid ${T.line}`,
            borderRadius: 6,
            padding: "clamp(24px, 4vw, 40px)",
            overflowX: "auto",
          }}
        >
          <div style={{ minWidth: 620 }}>
            <Stepper step={6} />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            marginTop: 32,
          }}
        >
          {etapas.map((e) => (
            <div key={e.n}>
              <div
                style={{
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: T.forest,
                  fontWeight: 600,
                  letterSpacing: ".06em",
                  marginBottom: 6,
                }}
              >
                {String(e.n).padStart(2, "0")} · {e.nome.toUpperCase()}
              </div>
              <p style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.6, color: T.textMuted, margin: "0 0 5px" }}>
                {e.frase}
              </p>
              <div style={{ fontFamily: F.sans, fontSize: 12.5, color: T.textFaint }}>{e.quem}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Btn to="/como-funciona" variant="secondary">Ver o fluxo completo</Btn>
        </div>
      </Section>

      {/* ---------- 8 · AS CINCO CATEGORIAS ---------- */}
      <Section bg="#fff">
        <Eyebrow>Art. 3º do Decreto nº 12.785/2025</Eyebrow>
        <H2>Cinco categorias. Cada bem em uma delas.</H2>
        <Lead>
          A classificação não é etiqueta: ela define o que pode acontecer com o
          bem. Quem atribui é a comissão de avaliação do campus.
        </Lead>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
          }}
        >
          {Object.entries(CATS).map(([k, v]) => (
            <div key={k} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Selo cat={k} size={64} />
              <h3
                style={{
                  fontFamily: F.serif,
                  fontSize: 20,
                  fontWeight: 700, letterSpacing: "-1px",
                  color: v.color,
                  margin: 0,
                }}
              >
                {v.label}
              </h3>
              <p style={{ fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.6, color: T.textMuted, margin: 0 }}>
                {v.criterio}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: F.sans,
            fontSize: 14.5,
            lineHeight: 1.7,
            color: T.textMuted,
            marginTop: 40,
            paddingTop: 24,
            borderTop: `1px solid ${T.lineSoft}`,
            maxWidth: "68ch",
          }}
        >
          Bens antieconômicos e irrecuperáveis têm destinação preferencial a
          cooperativas de catadores de materiais recicláveis, conforme o
          art. 13, IV.
        </p>
      </Section>

      {/* ---------- 9 · CIRCULA·MG E O DOAÇÕES GOV.BR ---------- */}
      <Section bg={T.paper}>
        <Eyebrow>A pergunta mais frequente</Eyebrow>
        <H2 style={{ maxWidth: "22ch" }}>Isso não é o que o Doações gov.br já faz?</H2>
        <Lead>
          Não. O sistema nacional resolve a publicidade legal, com alcance que
          nenhuma rede estadual alcança. O Circula·MG opera na camada que sobra:
          descoberta ativa, rito da comissão e indicadores por campus.
        </Lead>

        <div style={{ overflowX: "auto", border: `1px solid ${T.line}`, borderRadius: 6, background: "#fff" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640, fontFamily: F.sans }}>
            <thead>
              <tr>
                {["", "Doações gov.br (Seges/MGI)", "Circula·MG"].map((h, i) => (
                  <th
                    key={i}
                    style={{
                      textAlign: "left",
                      padding: "14px 18px",
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: T.textFaint,
                      borderBottom: `1px solid ${T.line}`,
                      background: i === 2 ? `${T.forest}14` : "transparent",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparacao.map((c) => (
                <tr key={c.criterio}>
                  <td style={{ padding: "14px 18px", fontSize: 14.5, fontWeight: 600, color: T.ink, borderBottom: `1px solid ${T.lineSoft}` }}>
                    {c.criterio}
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: 14.5, color: T.textMuted, borderBottom: `1px solid ${T.lineSoft}` }}>
                    {c.nacional}
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontSize: 14.5,
                      color: T.ink,
                      borderBottom: `1px solid ${T.lineSoft}`,
                      background: `${T.forest}14`,
                    }}
                  >
                    {c.local}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            fontFamily: F.sans,
            fontSize: 16,
            lineHeight: 1.7,
            color: T.ink,
            marginTop: 28,
            padding: "20px 24px",
            background: "#fff",
            borderLeft: `3px solid ${T.forest}`,
            borderRadius: 3,
            maxWidth: "70ch",
          }}
        >
          <strong>O Circula·MG não substitui o sistema nacional.</strong> A
          divulgação prevista no art. 20 continua sendo feita lá — e o Siads
          continua sendo o sistema de registro patrimonial da instituição.
        </p>
      </Section>

      {/* ---------- 10 · IMPACTO ---------- */}
      <Section bg="#fff">
        <Eyebrow>Por que isso importa</Eyebrow>
        <H2 style={{ maxWidth: "24ch" }}>
          Reaproveitar é mais barato que comprar — e que descartar.
        </H2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 32,
            marginTop: 44,
          }}
        >
          {[
            {
              Icon: Recycle,
              titulo: "Economia circular",
              texto:
                "Cada bem que volta a ser usado é um bem que não vira resíduo e uma compra que não precisa acontecer. É o que o Decreto nº 12.785/2025 chama de circularidade, e é o objetivo declarado da norma.",
            },
            {
              Icon: TrendingDown,
              titulo: "Orçamento",
              texto:
                "Um armário transferido entre campi resolve em dias o que um processo de aquisição resolveria em meses — quando há orçamento para isso.",
            },
            {
              Icon: Users,
              titulo: "Destinação social",
              texto:
                "Bens antieconômicos e irrecuperáveis que não encontram destino na rede seguem para cooperativas de catadores de materiais recicláveis, com a preferência que o art. 13, IV estabelece.",
            },
          ].map(({ Icon, titulo, texto }) => (
            <div key={titulo} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Icon size={26} color={T.forest} strokeWidth={1.6} aria-hidden="true" />
              <h3 style={{ fontFamily: F.serif, fontSize: 21, fontWeight: 700, letterSpacing: "-1px", color: T.ink, margin: 0 }}>
                {titulo}
              </h3>
              <p style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.65, color: T.textMuted, margin: 0 }}>
                {texto}
              </p>
            </div>
          ))}
        </div>
        {/* Os números de impacto (resíduo evitado, compras evitadas) só entram
            quando houver apuração — docs/07 §7.2, seção 10. */}
      </Section>

      {/* ---------- 11 · BASE NORMATIVA ---------- */}
      <Section bg={T.paper}>
        <Eyebrow>Fundamento</Eyebrow>
        <H2>O que a norma exige, o sistema faz.</H2>
        <Lead>
          O <strong style={{ color: T.ink }}>Decreto nº 12.785/2025</strong>,
          publicado em 19 de dezembro de 2025, instituiu o marco de circularidade
          de bens móveis na administração pública federal e revogou os Decretos
          nº 9.373/2018 e nº 10.340/2020. O Circula·MG foi desenhado a partir
          dele.
        </Lead>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#fff", border: `1px solid ${T.line}`, borderRadius: 6, overflow: "hidden" }}>
          {dispositivos.map((d, i) => (
            <div
              key={d.art}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(96px, 128px) minmax(0, 1.1fr) minmax(0, 1fr)",
                gap: 20,
                padding: "18px 22px",
                borderTop: i === 0 ? "none" : `1px solid ${T.lineSoft}`,
                alignItems: "start",
              }}
              className="cmg-disp-row"
            >
              <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: T.institutionalBlue }}>
                {d.art}
              </div>
              <div style={{ fontFamily: F.sans, fontSize: 14.5, color: T.ink, lineHeight: 1.55 }}>{d.exige}</div>
              <div style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, lineHeight: 1.55 }}>{d.onde}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          <Btn to="/base-normativa" variant="secondary">Ler a base normativa completa</Btn>
          <Btn href="https://www2.camara.leg.br/legin/fed/decret/2025/decreto-12785-19-dezembro-2025-798522-publicacaooriginal-177487-pe.html" variant="secondary">
            Texto oficial do decreto
          </Btn>
        </div>
      </Section>

      {/* ---------- 12 · CASOS ----------
          Só entra com caso real e autorização (docs/07 §7.2, seção 12). */}
      {casos.length > 0 && (
        <Section bg="#fff">
          <Eyebrow>Na prática</Eyebrow>
          <H2>Bens que voltaram a ser usados.</H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {casos.map((c) => (
              <article key={c.slug} style={{ border: `1px solid ${T.line}`, borderRadius: 6, padding: 22 }}>
                <h3 style={{ fontFamily: F.serif, fontSize: 20, margin: "0 0 8px", fontWeight: 400 }}>{c.bem}</h3>
                <p style={{ fontFamily: F.sans, fontSize: 14, color: T.textMuted, margin: 0 }}>
                  {c.origem} → {c.destino}
                </p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* ---------- 13 · PARA SUA UNIVERSIDADE ---------- */}
      <Section bg={T.institutionalBlue} style={{ color: "#fff" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, .8fr)",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "start",
          }}
          className="cmg-hero-grid"
        >
          <div>
            <div
              style={{
                fontFamily: F.sans, fontSize: 11.5, fontWeight: 600,
                letterSpacing: ".14em", textTransform: "uppercase",
                color: "#9DB6E0", marginBottom: 14,
              }}
            >
              Adesão
            </div>
            <h2
              style={{
                fontFamily: F.serif, fontWeight: 700, letterSpacing: "-1px",
                fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15,
                color: "#fff", margin: "0 0 16px", textWrap: "balance", maxWidth: "18ch",
              }}
            >
              Sua universidade pode entrar na rede.
            </h2>
            <p
              style={{
                fontFamily: F.sans, fontSize: 16.5, lineHeight: 1.65,
                color: "#C7D6EE", maxWidth: "52ch", margin: "0 0 32px",
              }}
            >
              O Circula·MG foi desenhado para as onze universidades federais de
              Minas Gerais. A adesão não exige troca do sistema de patrimônio nem
              alteração do rito da comissão de avaliação.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-start" }}>
              <BtnDestaque to="/para-sua-universidade" claro>Falar com a equipe</BtnDestaque>
              <Btn to="/para-sua-universidade" variant="ghostDark">Ver requisitos técnicos</Btn>
            </div>
          </div>

          {/* Mídia — as 11 federais, com as aderentes destacadas (docs/07 §7.2, seção 13) */}
          <div
            style={{
              display: "flex", flexWrap: "wrap", gap: 8,
              border: "1px solid rgba(255,255,255,.22)", borderRadius: 6,
              padding: "clamp(18px, 3vw, 28px)",
            }}
          >
            <div
              style={{
                width: "100%", fontFamily: F.sans, fontSize: 11.5, fontWeight: 600,
                letterSpacing: ".1em", textTransform: "uppercase", color: "#9DB6E0",
                marginBottom: 6,
              }}
            >
              As 11 federais de Minas Gerais
            </div>
            {universidades.map((u) => (
              <span
                key={u.sigla}
                title={`${u.nome} — ${u.sede}`}
                style={{
                  fontFamily: F.mono, fontSize: 12, fontWeight: 600, padding: "6px 11px",
                  borderRadius: 20,
                  background: u.aderiu ? "#fff" : "transparent",
                  color: u.aderiu ? T.institutionalBlue : "#C7D6EE",
                  border: `1px solid ${u.aderiu ? "#fff" : "rgba(255,255,255,.32)"}`,
                }}
              >
                {u.sigla}
              </span>
            ))}
            <p style={{ width: "100%", fontFamily: F.sans, fontSize: 12.5, color: "#9DB6E0", margin: "10px 0 0", lineHeight: 1.6 }}>
              Em destaque, as instituições já na rede.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- 14 · ACESSO POR PERFIL ---------- */}
      <Section bg="#fff">
        <Eyebrow>Acesso rápido</Eyebrow>
        <H2>Vá direto ao que você faz.</H2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 0,
            marginTop: 36,
            borderTop: `1px solid ${T.line}`,
          }}
        >
          {perfis.map((p, i) => (
            <div
              key={p.nome}
              style={{
                padding: "26px 22px 26px 0",
                borderLeft: i === 0 ? "none" : `1px solid ${T.lineSoft}`,
                paddingLeft: i === 0 ? 0 : 22,
              }}
            >
              <div
                style={{
                  fontFamily: F.sans, fontSize: 11.5, fontWeight: 600,
                  letterSpacing: ".1em", textTransform: "uppercase",
                  color: T.textFaint, marginBottom: 16,
                }}
              >
                {p.nome}
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {p.links.map((l) => (
                  <li key={l}>
                    <Link
                      to="/app"
                      style={{ fontFamily: F.sans, fontSize: 14.5, color: T.textMuted, textDecoration: "none" }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- 15 · SISTEMAS RELACIONADOS ---------- */}
      <Section bg={T.paper} pad="48px 0">
        <h2
          style={{
            fontFamily: F.sans, fontSize: 12.5, fontWeight: 600,
            letterSpacing: ".1em", textTransform: "uppercase",
            color: T.textFaint, margin: "0 0 18px",
          }}
        >
          Sistemas relacionados
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", alignItems: "center" }}>
          {sistemas.map((s) => (
            <a
              key={s.nome}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: F.sans, fontSize: 14.5, color: T.ink,
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
                borderBottom: `1px solid ${T.line}`, paddingBottom: 2,
              }}
            >
              {s.nome}
              <span aria-hidden="true" style={{ fontSize: 11, color: T.textFaint }}>↗</span>
            </a>
          ))}
        </div>
        <p style={{ fontFamily: F.sans, fontSize: 13.5, color: T.textMuted, marginTop: 20, marginBottom: 0 }}>
          O Circula·MG opera ao lado desses sistemas, não no lugar deles.
        </p>
      </Section>
    </>
  );
}
