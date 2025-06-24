import { Route, Routes } from "react-router-dom";
import { BasePage } from "./pages/BasePage/BasePage";
import { HomePage } from "./pages/HomePage/HomePage";
import ValidaJogo from "./pages/Validar/ValidaJogo";
import ValidaCliente from "./pages/Validar/ValidaCliente";
import ValidaAluguel from "./pages/Validar/ValidaAluguel";
import ConsultaJogos from "./pages/Consultar/ConsultaJogos";
import ConsultaClientes from "./pages/Consultar/ConsultaClientes";
import ConsultaAlugueis from "./pages/Consultar/ConsultaAlugueis";
import ConsultaAluguelCliente from "./pages/Consultar/ConsultaAluguelCliente";
import ConsultaAluguelJogo from "./pages/Consultar/ConsultaAluguelJogo";
import ConsultaValorJogo from "./pages/Consultar/ConsultaValorJogo";
import ConsultaValorFinal from "./pages/Consultar/ConsultaValorFInal";
import CadastraJogo from "./pages/Cadastrar/CadastraJogo";
import CadastraCliente from "./pages/Cadastrar/CadastraCliente";
import CadastraAluguel from "./pages/Cadastrar/CadastraAluguel";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BasePage />}>
        <Route index element={<HomePage />} />
        <Route path="validajogo" element={<ValidaJogo />} />
        <Route path="validaCliente" element={<ValidaCliente />} />
        <Route path="validaaluguel" element={<ValidaAluguel />} />
        <Route path="consultajogos" element={<ConsultaJogos />} />
        <Route path="consultaclientes" element={<ConsultaClientes />} />
        <Route path="consultaalugueis" element={<ConsultaAlugueis />} />
        <Route path="alugueiscliente" element={<ConsultaAluguelCliente />} />
        <Route path="alugueisjogo" element={<ConsultaAluguelJogo />} />
        <Route path="valorjogo" element={<ConsultaValorJogo />} />
        <Route path="valoraluguel" element={<ConsultaValorFinal />} />
        <Route path="cadastrarjogo" element={<CadastraJogo />} />
        <Route path="cadastrarcliente" element={<CadastraCliente />} />
        <Route path="cadastraramuguel" element={<CadastraAluguel />} />
      </Route>
    </Routes>
  );
};
