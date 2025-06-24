import React, { useEffect, useState } from 'react';
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

const ConsultaAlugueis: React.FC = () => {
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const fetchAlugueis = async () => {
    setLoading(true);
    setErro(null);

    try {
      const response = await axios.get<Aluguel[]>('api/acmegames/cadastro/listaalugueis');
      setAlugueis(response.data);
    } catch (error) {
      setErro('Erro ao buscar os aluguéis cadastrados.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlugueis();
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 1000, margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Lista de Aluguéis Cadastrados
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        {loading && <CircularProgress />}
      </Box>

      {erro && (
        <Typography variant="body2" color="error" mb={2}>
          {erro}
        </Typography>
      )}

      {!loading && !erro && alugueis.length === 0 && (
        <Typography variant="body1">Nenhum aluguel cadastrado.</Typography>
      )}

      {alugueis.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Identificador</strong></TableCell>
                <TableCell><strong>Data Inicial</strong></TableCell>
                <TableCell><strong>Período (dias)</strong></TableCell>
                <TableCell><strong>Cliente</strong></TableCell>
                <TableCell><strong>Jogo</strong></TableCell>
                <TableCell><strong>Valor Base</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alugueis.map((aluguel) => (
                <TableRow key={aluguel.identificador}>
                  <TableCell>{aluguel.identificador}</TableCell>
                  <TableCell>{formatarData(aluguel.dataInicial)}</TableCell>
                  <TableCell>{aluguel.periodo}</TableCell>
                  <TableCell>{aluguel.cliente.nomeFantasia || aluguel.cliente.nome}</TableCell>
                  <TableCell>{aluguel.jogo.nome}</TableCell>
                  <TableCell>R$ {aluguel.jogo.valorBase.toFixed(2)}</TableCell>
                </TableRow>
              ))}
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

export default ConsultaAlugueis;
