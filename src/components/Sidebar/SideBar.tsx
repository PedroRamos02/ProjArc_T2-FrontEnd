import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const validationButtons = [
  <Button component={Link} to="/validajogo" sx={{ justifyContent: 'flex-start' }}>Jogo</Button>,
  <Button component={Link} to="/validacliente" sx={{ justifyContent: 'flex-start' }}>Cliente</Button>,
  <Button component={Link} to="/validaaluguel" sx={{ justifyContent: 'flex-start' }}>Aluguel</Button>,
];

const searchButtons = [
  <Button component={Link} to="/consultajogos" sx={{ justifyContent: 'flex-start' }}>Lista de jogos</Button>,
  <Button component={Link} to="/consultaclientes" sx={{ justifyContent: 'flex-start' }}>Lista de Clientes</Button>,
  <Button component={Link} to="/consultaalugueis" sx={{ justifyContent: 'flex-start' }}>Aluguel</Button>,
  <Button component={Link} to="/alugueisjogo" sx={{ justifyContent: 'flex-start' }}>Alugueis do jogo</Button>,
  <Button component={Link} to="/alugueiscliente" sx={{ justifyContent: 'flex-start' }}>Alugueis do cliente</Button>,
  <Button component={Link} to="/valorjogo" sx={{ justifyContent: 'flex-start' }}>Valor do jogo</Button>,
  <Button component={Link} to="/valoraluguel" sx={{ justifyContent: 'flex-start' }}>Valor do aluguel</Button>,
];

const registerButtons = [
  <Button component={Link} to="/cadastrarjogo" sx={{ justifyContent: 'flex-start' }}>Cadastrar jogo</Button>,
  <Button component={Link} to="/cadastrarcliente" sx={{ justifyContent: 'flex-start' }}>Cadastrar cliente</Button>,
  <Button component={Link} to="/cadastraramuguel" sx={{ justifyContent: 'flex-start' }}>Cadastrar aluguel</Button>,
];

export const SideBar = () => {
  return (
    <div style={{
      width: '200px',
      height: '100vh',
      background: '#222',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <h2>Validar</h2>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {validationButtons}
      </ButtonGroup>
      <h2>Cadastrar</h2>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {registerButtons}
      </ButtonGroup>
      <h2>Consultar</h2>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {searchButtons}
      </ButtonGroup>
    </div>
  )
}