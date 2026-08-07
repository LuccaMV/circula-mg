/* ============================================================
   Casca do site + rotas — docs/06-estrutura-do-site.md §6.5
   ============================================================ */

import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { T, F } from "./tokens.js";
import { Header, Footer, ScrollTop, Wrap, AvisoPrototipo } from "./ui.jsx";
import Entrar from "./Entrar.jsx";
import { lerSessao, encerrarSessao } from "./sessao.js";
import Home from "./Home.jsx";
import {
  Vitrine, BemDetalhe, ComoFunciona, Transparencia, ParaSuaUniversidade,
  BaseNormativa, Ajuda, Casos, Acessibilidade, Privacidade, NaoEncontrada,
} from "./pages.jsx";
import CirculaMG from "../App.jsx";

/* Títulos por rota — docs/07 §7.5 */
const TITULOS = {
  "/": "Circula·MG — Rede de reaproveitamento de bens das universidades federais de MG",
  "/vitrine": "Vitrine de bens — Circula·MG",
  "/como-funciona": "Como funciona — Circula·MG",
  "/transparencia": "Transparência — Circula·MG",
  "/para-sua-universidade": "Para sua universidade — Circula·MG",
  "/base-normativa": "Base normativa — Circula·MG",
  "/ajuda": "Perguntas frequentes — Circula·MG",
  "/casos": "Casos de reaproveitamento — Circula·MG",
  "/acessibilidade": "Acessibilidade — Circula·MG",
  "/privacidade": "Política de Privacidade — Circula·MG",
  "/entrar": "Entrar — Circula·MG",
  "/app": "Aplicação — Circula·MG",
};

function Titulo() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    document.title =
      TITULOS[pathname] ||
      (pathname.startsWith("/vitrine/") ? "Detalhe do bem — Circula·MG" : "Circula·MG");
  }, [pathname]);
  return null;
}

/* A aplicação roda em /app, atrás da tela de entrada.
   O CirculaMG original é reaproveitado sem alteração. */
function Aplicacao() {
  const sessao = lerSessao();

  // Sem sessão, volta para a tela de entrada.
  if (!sessao) return <Navigate to="/entrar" replace />;

  const sair = () => {
    encerrarSessao();
    window.location.assign("/");
  };

  return (
    <>
      <div style={{ background: T.brand, color: "#fff" }}>
        <Wrap style={{ display: "flex", alignItems: "center", gap: 14, minHeight: 46, flexWrap: "wrap" }}>
          <Link
            to="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#fff", textDecoration: "none", fontFamily: F.sans, fontSize: 13.5 }}
          >
            <ArrowLeft size={15} aria-hidden="true" /> Voltar ao site
          </Link>
          <span style={{ fontFamily: F.sans, fontSize: 13, color: "#C7D6EE", marginLeft: "auto" }}>
            {sessao.nome} · {sessao.campus}
            {sessao.email ? ` · ${sessao.email}` : ""}
          </span>
          <button
            type="button"
            onClick={sair}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, background: "transparent",
              border: "1px solid rgba(255,255,255,.45)", borderRadius: 3, color: "#fff",
              padding: "5px 11px", fontFamily: F.sans, fontSize: 13, cursor: "pointer",
            }}
          >
            <LogOut size={14} aria-hidden="true" /> Sair
          </button>
        </Wrap>
      </div>
      <CirculaMG />
    </>
  );
}

function LayoutSite({ children }) {
  return (
    <>
      <a href="#conteudo" className="cmg-skip">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}

export default function Site() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Titulo />
      {/* Vale para todas as telas, inclusive /entrar e /app */}
      <AvisoPrototipo />
      <Routes>
        <Route path="/app/*" element={<Aplicacao />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route
          path="*"
          element={
            <LayoutSite>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vitrine" element={<Vitrine />} />
                <Route path="/vitrine/:id" element={<BemDetalhe />} />
                <Route path="/como-funciona" element={<ComoFunciona />} />
                <Route path="/transparencia" element={<Transparencia />} />
                <Route path="/para-sua-universidade" element={<ParaSuaUniversidade />} />
                <Route path="/base-normativa" element={<BaseNormativa />} />
                <Route path="/ajuda" element={<Ajuda />} />
                <Route path="/casos" element={<Casos />} />
                <Route path="/acessibilidade" element={<Acessibilidade />} />
                <Route path="/privacidade" element={<Privacidade />} />
                <Route path="*" element={<NaoEncontrada />} />
              </Routes>
            </LayoutSite>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
