import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from '@mui/material';

interface Cliente {
  id: number;
  nome: string;
  endereco: string;
  cpf?: string;
  cnpj?: string;
  nomeFantasia?: string;
}

interface Jogo {
  codigo: number;
  nome: string;
  valorBase: number;
  tipoEletronico?: string;
  plataforma?: string;
  tipoMesa?: string;
  numeroPecas?: number;
}

interface Aluguel {
  identificador: number;
  dataInicial: string;
  periodo: number;
  cliente: Cliente;
  jogo: Jogo;
}

const ConsultaAluguelCliente: React.FC = () => {
  const [numero, setNumero] = useState('');
  const [aluguel, setAluguel] = useState<Aluguel | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

const handleBuscar = async () => {
  if (!numero) return;

  setLoading(true);
  setErro(null);
  setAluguel(null);

  try {
    const url = `api/acmegames/cliente/aluguel/${numero}`;
    const response = await axios.get<Aluguel[]>(url); // array de alugueis
    const alugueisArray = response.data;

    if (alugueisArray.length > 0) {
      setAluguel(alugueisArray[0]); // pega o primeiro objeto do array
    } else {
      setErro('Nenhum aluguel encontrado para esse número.');
    }
  } catch (error) {
    setErro('Erro ao buscar o aluguel.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 900, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Consulta de Aluguel por Número
      </Typography>

      <Box display="flex" gap={2} mb={3} alignItems="center">
        <TextField
          label="Número do Aluguel"
          variant="outlined"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          type="number"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuscar}
          disabled={!numero || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
        </Button>
      </Box>

      {erro && (
        <Typography color="error" mb={2}>
          {erro}
        </Typography>
      )}

      {aluguel && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID Aluguel</strong></TableCell>
                <TableCell><strong>Data Inicial</strong></TableCell>
                <TableCell><strong>Período (dias)</strong></TableCell>
                <TableCell><strong>Cliente</strong></TableCell>
                <TableCell><strong>CPF</strong></TableCell>
                <TableCell><strong>Jogo</strong></TableCell>
                <TableCell><strong>Plataforma</strong></TableCell>
                <TableCell><strong>Valor Base (R$)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={aluguel.identificador}>
                <TableCell>{aluguel.identificador}</TableCell>
                <TableCell>{formatarData(aluguel.dataInicial)}</TableCell>
                <TableCell>{aluguel.periodo}</TableCell>
                <TableCell>{aluguel.cliente.nome}</TableCell>
                <TableCell>{aluguel.cliente.cpf || '-'}</TableCell>
                <TableCell>{aluguel.jogo.nome}</TableCell>
                <TableCell>{aluguel.jogo.plataforma || aluguel.jogo.tipoMesa || '-'}</TableCell>
                <TableCell>{aluguel.jogo.valorBase.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

const formatarData = (data: string) => {
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
};

export default ConsultaAluguelCliente;
