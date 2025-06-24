import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Box,
  CircularProgress,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface AluguelValorFinal {
  identificador: number;
  dataInicial: string;
  periodo: number;
  cliente_id: number;
  jogo_id: number;
  valorFinal: number;
}

const ConsultaValorFinal: React.FC = () => {
  const [identificador, setIdentificador] = useState('');
  const [dados, setDados] = useState<AluguelValorFinal | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleBuscar = async () => {
    if (!identificador) return;

    setLoading(true);
    setErro(null);
    setDados(null);

    try {
      const url = `api/acmegames/aluguel/valorfinal/${identificador}`;
      const response = await axios.get<AluguelValorFinal>(url);
      setDados(response.data);
    } catch (error) {
      setErro('Erro ao buscar o valor final do aluguel.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 700, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Consulta Valor Final do Aluguel
      </Typography>

      <Box display="flex" gap={2} mb={3} alignItems="center">
        <TextField
          label="Identificador do Aluguel"
          variant="outlined"
          value={identificador}
          onChange={(e) => setIdentificador(e.target.value)}
          type="number"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBuscar}
          disabled={!identificador || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
        </Button>
      </Box>

      {erro && (
        <Typography color="error" mb={2}>
          {erro}
        </Typography>
      )}

      {dados && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Identificador</strong></TableCell>
                <TableCell><strong>Data Inicial</strong></TableCell>
                <TableCell><strong>Período (dias)</strong></TableCell>
                <TableCell><strong>Cliente ID</strong></TableCell>
                <TableCell><strong>Jogo ID</strong></TableCell>
                <TableCell><strong>Valor Final (R$)</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{dados.identificador}</TableCell>
                <TableCell>{formatarData(dados.dataInicial)}</TableCell>
                <TableCell>{dados.periodo}</TableCell>
                <TableCell>{dados.cliente_id}</TableCell>
                <TableCell>{dados.jogo_id}</TableCell>
                <TableCell>R$ {dados.valorFinal.toFixed(2)}</TableCell>
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

export default ConsultaValorFinal;
